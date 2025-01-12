// app/api/token-transfers/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://web3.nodit.io/v1/ethereum/sepolia/token/getTokenTransfersByAccount',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': process.env.NODIT_API_KEY,
      },
      data: {
        accountAddress: address,
        toBlock: 'latest',
        withCount: true,
        withZeroValue: true,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token transfers' },
      { status: 500 }
    );
  }
}
