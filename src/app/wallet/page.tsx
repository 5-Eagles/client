'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TokenBalance, WalletOperation } from '@/types/wallet';

export default function WalletManager() {
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/wallet/balance');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      setBalance(data);
    } catch (err) {
      setError('Failed to fetch balance');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    if (!amount) return;
    setLoading(true);
    setError(null);

    try {
      const amountInWei = ethers.parseUnits(amount, 6);
      const response = await fetch('/api/wallet/sendTokensToUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInWei.toString() }),
      });

      const data: WalletOperation = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'sendTokensToUser failed');

      await fetchBalance();
      setAmount('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to sendTokensToUser'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount) return;
    setLoading(true);
    setError(null);

    try {
      const amountInWei = ethers.parseUnits(amount, 6);
      const response = await fetch('/api/wallet/sendTokensToProvider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInWei.toString() }),
      });

      const data: WalletOperation = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'sendTokensToProvider failed');

      await fetchBalance();
      setAmount('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to sendTokensToProvider'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Wallet Management</h2>

      {balance && (
        <div className='mb-4'>
          <p className='text-gray-600'>Current Balance:</p>
          <p className='text-2xl font-bold'>{balance.formattedBalance} USDT</p>
        </div>
      )}

      <div className='space-y-4'>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount in USDT'
          className='w-full p-2 border rounded'
          min='0'
          step='0.000001'
        />

        <div className='flex space-x-2'>
          <button
            onClick={handleDeposit}
            disabled={loading}
            className='flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50'
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className='flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50'
          >
            Withdraw
          </button>
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    </div>
  );
}
