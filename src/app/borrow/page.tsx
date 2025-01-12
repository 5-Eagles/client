'use client';

import { useEffect, useState } from 'react';
import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
import { GoSearch, GoBell, GoPlus } from 'react-icons/go';
import GreyHoverButton from '@/components/button/greyHoverButton';
import CardButton from '@/components/button/cardButton';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

interface LoanEvaluation {
  id: number;
  user_id: string;
  loan_amount: number;
  term: number;
  interest_rate: number;
  credit_grade: string;
  approval_status: string;
  created_at: string;
}

export default function Borrow() {
  const [loans, setLoans] = useState<LoanEvaluation[]>([]);
  const supabase: SupabaseClient = createClient();

  useEffect(() => {
    async function fetchLoans() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('loan_evaluations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data && !error) {
          setLoans(data);
        }
      }
    }

    fetchLoans();
  }, []);

  return (
    <>
      <h1 className='text-xl font-bold text-center'>빌리기</h1>
      <div className='w-full max-w-md mx-auto p-4 space-y-4'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <GreyHoverButton className='text-sm'>모집 중</GreyHoverButton>
            <GreyHoverButton className='text-sm'>모집 완료</GreyHoverButton>
          </div>
          <div className='flex gap-2'>
            <GreyHoverButton>
              <GoSearch className='w-5 h-5' />
            </GreyHoverButton>
            <GreyHoverButton>
              <GoBell className='w-5 h-5' />
            </GreyHoverButton>
          </div>
        </div>

        {loans.map((loan) => (
          <LoanSummaryCard
            key={loan.id}
            title={`위험등급 ${loan.credit_grade}`}
            status={loan.approval_status === 'Approved' ? '모집중' : '심사중'}
            amount={loan.loan_amount}
            badge='달성'
            stats={[
              {
                label: '수익률',
                value: `${loan.interest_rate.toFixed(2)}%`,
                color: 'text-primary',
              },
              {
                label: '투자 기간',
                value: `${loan.term}개월`,
              },
              { label: '모집률', value: '45.50%' },
            ]}
            progressAmount={Math.floor(loan.loan_amount * 0.4)}
            targetAmount={loan.loan_amount}
            href={`/loan-details/${loan.id}`}
          />
        ))}

        <Link href='/borrow/new'>
          <CardButton bgColor='bg-gray-100'>
            <div className='flex flex-col items-center gap-1'>
              <GoPlus className='w-6 h-6' />
              <span className='text-sm'>대출 신청하기</span>
            </div>
          </CardButton>
        </Link>
      </div>
      <BottomNav />
    </>
  );
}
