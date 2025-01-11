import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getProvider, getServiceContract } from '@/lib/contracts';
import { ethers } from 'ethers';

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

    // Get user's wallet address
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('wallet_address')
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

    if (!userData?.wallet_address) {
      return NextResponse.json(
        { error: 'Wallet address not found for this user' },
        { status: 404 }
      );
    }

    // Service owner's private key should be securely stored in env
    const ownerPrivateKey = process.env.SERVICE_OWNER_PRIVATE_KEY;
    if (!ownerPrivateKey) {
      throw new Error(
        'SERVICE_OWNER_PRIVATE_KEY is not defined in environment variables'
      );
    }

    const provider = getProvider();
    const ownerSigner = new ethers.Wallet(ownerPrivateKey, provider);
    const serviceContract = getServiceContract(ownerSigner);

    // Convert amount to BigInt
    const amountBigInt = BigInt(amount);

    const sendTokensToUser = await serviceContract.sendTokensToUser(
      userData.wallet_address,
      amountBigInt
    );

    const receipt = await sendTokensToUser.wait();

    return NextResponse.json({
      success: true,
      message: 'sendTokensToUser successful',
      txHash: receipt.hash,
    });
  } catch (error) {
    console.error('sendTokensToUser error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'Failed to process sendTokensToUser: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}
