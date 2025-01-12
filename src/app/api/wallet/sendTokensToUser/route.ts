import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import {
  getProvider,
  getTokenContract,
  getServiceContract,
} from '@/lib/contracts';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user?.email) {
      console.error('Auth error:', userError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount } = await req.json();

    // Get user's wallet info
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('wallet_address, wallet_private_key_encrypted')
      .eq('email', user.email)
      .single();

    console.log('Query result:', {
      userEmail: user.email,
      hasData: !!userData,
      hasError: !!dbError,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to fetch wallet data' },
        { status: 500 }
      );
    }

    if (!userData?.wallet_address || !userData?.wallet_private_key_encrypted) {
      return NextResponse.json(
        { error: 'Wallet information not found for this user' },
        { status: 404 }
      );
    }

    const encryptionKey = process.env.AES_ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error(
        'AES_ENCRYPTION_KEY is not defined in environment variables'
      );
    }

    // Decrypt private key
    const decryptedPrivateKey = CryptoJS.AES.decrypt(
      userData.wallet_private_key_encrypted,
      encryptionKey
    ).toString(CryptoJS.enc.Utf8);

    const provider = getProvider();
    const signer = new ethers.Wallet(decryptedPrivateKey, provider);
    const tokenContract = getTokenContract(signer);
    const serviceContract = getServiceContract(signer);
    const serviceAddress = await serviceContract.getAddress();

    // Convert amount to BigInt
    const amountBigInt = BigInt(amount);

    // First approve the service contract to spend tokens
    const approveTx = await tokenContract.approve(serviceAddress, amountBigInt);
    await approveTx.wait();

    // Then send tokens to the service contract
    const sendTokensToProvider =
      await serviceContract.sendTokensToProvider(amountBigInt);
    const receipt = await sendTokensToProvider.wait();

    return NextResponse.json({
      success: true,
      message: 'sendTokensToProvider successful',
      txHash: receipt.hash,
    });
  } catch (error) {
    console.error('sendTokensToProvider error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'Failed to process sendTokensToProvider: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}
