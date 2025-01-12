'use client';

import BoxButton from '@/components/button/boxButton';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewLoan() {
  const [dueDate, setDueDate] = useState(new Date('2025-02-10'));
  const router = useRouter();

  return (
    <div className='w-full max-w-md mx-auto p-4 space-y-6'>
      <h1 className='text-xl font-bold text-center mb-8'>대출 신청</h1>

      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>위험등급</span>
          <span>C</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>목표 금액</span>
          <span className='text-primary font-semibold'>500만원</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>최대 한도</span>
          <span>1000만원</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>상환 기간</span>
          <span className='text-primary font-semibold'>12개월</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>가능 기간</span>
          <span>6~36개월</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>모집 기간</span>
          <div className='flex items-center'>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date) => setDueDate(date)}
              dateFormat='yyyy년 MM월 dd일'
              locale={ko}
              className='text-primary font-semibold text-right bg-transparent'
            />
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>예상 이자율</span>
          <span className='text-primary font-semibold'>21.2%</span>
        </div>
      </div>

      <div className='flex gap-4 mt-8'>
        <BoxButton
          backgroundColor='bg-gray-200'
          textColor='text-gray-700'
          onClick={() => router.back()}
          className='flex-1'
        >
          취소
        </BoxButton>
        <BoxButton className='flex-1'>대출받기</BoxButton>
      </div>
    </div>
  );
}
