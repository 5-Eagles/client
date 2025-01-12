import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getProvider, getTokenContract } from '@/lib/contracts';
import { ethers } from 'ethers';

export async function GET(req: NextRequest) {
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

    // 이메일로 사용자의 지갑 주소 조회
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('wallet_address')
      .eq('email', user.email)
      .single();

    console.log('Query result:', { userData, dbError });

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

    const provider = getProvider();
    const tokenContract = getTokenContract(provider);

    const balance = await tokenContract.balanceOf(userData.wallet_address);
    const formattedBalance = ethers.formatUnits(balance, 6); // USDT uses 6 decimals

    return NextResponse.json({
      balance: balance.toString(),
      formattedBalance,
      wallet_address: userData.wallet_address,
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
