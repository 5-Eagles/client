'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import BoxButton from '@/components/button/boxButton';

export default function Deposit() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const conversionRate = 1700;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const convertedAmount = amount ? parseInt(amount) * conversionRate : 0;

  return (
    <div className='w-full max-w-md mx-auto'>
      <TopNav left='back' title='입금하기' />

      <div className='p-4 space-y-6'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text font-medium'>가져올 계좌</span>
          </label>
          <select className='select select-bordered w-full'>
            <option>신한은행 110-123-456789</option>
            {/* 추가 계좌 옵션들 */}
          </select>
        </div>

        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text font-medium'>가져올 금액</span>
          </label>
          <div className='relative'>
            <input
              type='text'
              value={amount ? parseInt(amount).toLocaleString() : ''}
              onChange={handleAmountChange}
              placeholder='0'
              className='input input-bordered w-full pr-12'
            />
            <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500'>
              원
            </span>
          </div>
        </div>

        <div className='form-control w-full bg-gray-50 p-4 rounded-lg'>
          <label className='label'>
            <span className='label-text font-medium'>충전될 머니</span>
          </label>
          <div className='text-2xl font-bold text-primary'>
            {convertedAmount.toLocaleString()} 원
          </div>
          <p className='text-sm text-gray-500 mt-2'>
            전환 비율 1USDT = {conversionRate}원
          </p>
        </div>

        <div className='flex gap-4 mt-8'>
          <BoxButton
            className='flex-1'
            backgroundColor='bg-gray-100'
            textColor='text-black'
            onClick={() => router.back()}
          >
            취소하기
          </BoxButton>
          <BoxButton
            className='flex-1'
            onClick={() => {
              // 입금 처리 로직
              alert('입금이 완료되었습니다.');
              router.push('/mypage/transfer');
            }}
          >
            입금하기
          </BoxButton>
        </div>
      </div>
    </div>
  );
}
