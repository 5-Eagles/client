'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { getLoanById } from '@/data/loans';
import TopNav from '@/components/TopNav';
import LoanSummaryCard from '@/components/loan_summary_card';
import BoxButton from '@/components/button/boxButton';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function LendResultPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const loanData = getLoanById(params.id);
  
  const investmentAmount = searchParams.get('amount') || '0';
  
  const formatAmount = (amount: string) => {
    return Number(amount).toLocaleString() + '원';
  };

  // 세전/세후 수익금 계산
  const calculateProfit = () => {
    const amount = Number(investmentAmount);
    const rate = parseFloat(loanData?.stats[0].value || '0') / 100;
    const months = parseInt(loanData?.stats[1].value || '0');
    const yearlyProfit = amount * rate;
    const periodProfit = yearlyProfit * (months / 12);
    
    return {
      beforeTax: Math.round(periodProfit),
      afterTax: Math.round(periodProfit * (1 - 0.154 - 0.012)) // 세금 15.4%, 수수료 1.2% 차감
    };
  };

  const profits = calculateProfit();

  // 데이터가 없는 경우 처리
  if (!loanData) {
    return <div>존재하지 않는 대출 상품입니다.</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
  

      <div className='flex-1 px-4'>
        <div className='flex flex-col items-center justify-center py-8'>
          <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
            <IoCheckmarkCircleOutline className='w-12 h-12 text-primary' />
          </div>
          <h1 className='text-2xl font-bold mb-2'>투자 완료</h1>
          <p className='text-base-content/60 text-center'>
            투자가 성공적으로 완료되었습니다.
            <br />
            투자 내역은 마이페이지에서 확인하실 수 있습니다.
          </p>
        </div>

        <div className='space-y-6'>
          <div>
            <h2 className='font-bold mb-2'>투자 상품</h2>
            <LoanSummaryCard {...loanData} href='' />
          </div>

          <div className='bg-base-100 p-4 rounded-lg'>
            <h2 className='font-bold mb-4'>투자 정보</h2>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-base-content/60'>투자 금액</span>
                <span className='font-bold'>{formatAmount(investmentAmount)}</span>
              </div>
            </div>
          </div>

          <div className='bg-base-100 p-4 rounded-lg'>
            <h2 className='font-bold mb-4'>예상 수익금</h2>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-base-content/60'>세전 수익금</span>
                <span className='font-bold'>{formatAmount(profits.beforeTax.toString())}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-base-content/60'>세후 수익금</span>
                <span className='font-bold'>{formatAmount(profits.afterTax.toString())}</span>
              </div>
            </div>
            <p className='text-sm text-base-content/60 mt-2'>
              * 세금(15.4%)과 수수료(1.2%)가 차감된 금액입니다.
            </p>
          </div>
        </div>
      </div>

      <div className='p-4 bg-white border-t'>
        <BoxButton className='w-full' onClick={() => router.push('/mypage')}>
          내 투자 내역 확인하기
        </BoxButton>
      </div>
    </div>
  );
}
