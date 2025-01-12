'use client';

import { useState } from 'react';

const TokenTransfers = () => {
  const [address, setAddress] = useState('');
  const [transfers, setTransfers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransfers = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/token-transfers?address=${address}`);
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value, decimals) => {
    return (Number(value) / 10 ** decimals).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const shortenAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-2xl font-bold mb-4'>Token Transfers Explorer</h2>
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Enter wallet address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={fetchTransfers}
            disabled={loading}
            className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

      {transfers && (
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-bold mb-4'>
            Found {transfers.count} transfers
          </h2>
          <div className='space-y-4'>
            {transfers.items.map((transfer, index) => (
              <div
                key={`${transfer.transactionHash}-${transfer.logIndex}`}
                className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Transaction</p>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${transfer.transactionHash}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                    >
                      {shortenAddress(transfer.transactionHash)}
                    </a>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Time</p>
                    <p>{formatTime(transfer.timestamp)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>From</p>
                    <p className='font-mono'>{shortenAddress(transfer.from)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>To</p>
                    <p className='font-mono'>{shortenAddress(transfer.to)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Value</p>
                    <p className='font-semibold'>
                      {formatValue(transfer.value, transfer.contract.decimals)}{' '}
                      {transfer.contract.symbol}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Token</p>
                    <p>
                      {transfer.contract.name} ({transfer.contract.symbol})
                    </p>
                  </div>
                  <div className='md:col-span-2'>
                    <p className='text-sm text-gray-500'>Contract Address</p>
                    <a
                      href={`https://sepolia.etherscan.io/address/${transfer.contract.address}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline font-mono'
                    >
                      {transfer.contract.address}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenTransfers;
