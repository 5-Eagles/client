'use client';

import TopNav from '@/components/TopNav';
import LoanSummaryCard from '@/components/loan_summary_card';
import BoxButton from '@/components/button/boxButton';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function LendDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [insuranceOption, setInsuranceOption] = useState<'apply' | 'none'>(
    'none'
  );
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleInvest = () => {
    router.push(`/lend/${id}/result`);
  };

  return (
    <div className='flex flex-col h-screen'>
      <TopNav left='back' title='투자하기' />

      <div className='flex-1 overflow-y-auto px-4 pb-4'>
        <div className='mt-4'>
          <LoanSummaryCard
            title='Sample Loan'
            amount={1000000}
            stats={[
              { label: '연 수익률', value: '12.5%', color: 'text-primary' },
              { label: '기간', value: '12개월' },
              { label: '상환방식', value: '원리금균등' },
            ]}
            progressAmount={500000}
            targetAmount={1000000}
            href=''
            badge='모집중'
          />
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <h2 className='text-lg font-bold mb-4'>투자 수익 정보</h2>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-base-content/60'>순 수익률</span>
              <span className='font-bold'>9.38%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base-content/60'>예상 수익률</span>
              <span className='font-bold'>9.32%</span>
            </div>
          </div>
          <p className='text-sm text-base-content/60 mt-2'>
            * 플랫폼 이용료(1.2%)와 세금(15.4%)을 제외한 순 수익금
          </p>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <h2 className='text-lg font-bold mb-4'>차입자 정보</h2>
          <div className='grid grid-cols-2 gap-4'>
            {[
              { label: 'NICE 신용점수', value: '740점' },
              { label: 'PF 스코어', value: '1000점' },
              { label: '상환재원', value: '차주상환' },
              { label: '크레딕스 대출잔액', value: '57,000,000원' },
              { label: '크레딕스 대출 횟수', value: '13회' },
              { label: '크레딕스 연체 횟수', value: '1회' },
            ].map((item, index) => (
              <div key={index}>
                <span className='text-base-content/60 block'>{item.label}</span>
                <span className='font-bold'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <p className='text-sm text-base-content/60'>
            위에 기재된 바와 같이, 대출 심사 시점의 차입자의 소득과 신용점수,
            담보가치 등을 종합하여 차입자의 연계대출 채무의 변제 능력이 있음을
            확인하였습니다. (단, 차입자의 변제능력은 시간의 경과에 따라 변동될
            수 있습니다.)
          </p>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg space-y-4'>
          <div className='flex justify-between items-center'>
            <span>보유 머니</span>
            <span className='font-bold'>2000 USDT</span>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>구매 수량</span>
            </label>
            <input
              type='text'
              className='input input-bordered'
              placeholder='USDT'
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>구매 금액</span>
            </label>
            <input
              type='text'
              className='input input-bordered'
              placeholder='원'
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>보험 적용</span>
            </label>
            <div className='flex gap-4'>
              <label className='label cursor-pointer'>
                <input
                  type='radio'
                  name='insurance'
                  className='radio radio-primary'
                  checked={insuranceOption === 'apply'}
                  onChange={() => setInsuranceOption('apply')}
                />
                <span className='label-text ml-2'>적용</span>
              </label>
              <label className='label cursor-pointer'>
                <input
                  type='radio'
                  name='insurance'
                  className='radio radio-primary'
                  checked={insuranceOption === 'none'}
                  onChange={() => setInsuranceOption('none')}
                />
                <span className='label-text ml-2'>미적용</span>
              </label>
            </div>
          </div>

          <div className='bg-base-200 p-4 rounded-lg'>
            <div className='flex justify-between mb-2'>
              <span>매달 상환 금액</span>
              <span className='font-bold'>89,000원</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span>수익률</span>
              <span className='font-bold'>연 12.5%</span>
            </div>
            <div className='flex justify-between'>
              <span>투자 기간</span>
              <span className='font-bold'>12개월</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 bg-white border-t'>
        <BoxButton className='w-full' onClick={handleInvest}>
          투자하기
        </BoxButton>
      </div>
    </div>
  );
}
