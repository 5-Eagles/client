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
import { LOAN_DATA } from '@/data/loans';

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
  const [activeTab, setActiveTab] = useState('ongoing');
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
      <h1 className='text-xl font-bold text-center'>대출받기</h1>
      <div className='w-full max-w-screen-sm mx-auto px-4 pb-16'>
        <div className='flex justify-between'>
          <div role="tablist" className="tabs tabs-bordered">
            <button
              role="tab"
              className={`tab ${activeTab === 'ongoing' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ongoing')}
            >
              모집 중인 내 대출
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              갚고 있는 내 대출
            </button>
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

        <div className="relative w-full overflow-x-hidden">
          <div className={`w-full transform transition-all duration-300 ease-in-out ${
            activeTab === 'ongoing' 
              ? 'translate-x-0 opacity-100 relative' 
              : '-translate-x-full opacity-0 absolute top-0 left-0'
          }`}>
            <Link href='/borrow/new'>
              <CardButton bgColor='bg-gray-100'>
                <div className='flex flex-col items-center gap-1'>
                  <GoPlus className='w-6 h-6' />
                  <span className='text-sm'>대출 신청하기</span>
                </div>
              </CardButton>
            </Link>

            {loans.map((loan) => {
              const randomProgress = Math.floor(Math.random() * 40) + 1;
              const progressAmount = Math.floor(
                loan.loan_amount * (randomProgress / 100)
              );
              return (
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
                    {
                      label: '모집률',
                      value: `${randomProgress.toFixed(2)}%`,
                    },
                  ]}
                  progressAmount={progressAmount}
                  targetAmount={loan.loan_amount}
                  href={`/borrow/${loan.id}`}
                />
              );
            })}

            {loans.length === 0 && (
              <LoanSummaryCard
                {...LOAN_DATA[10]}
                href={`/borrow/${LOAN_DATA[10].id}`}
              />
            )}
          </div>

          <div className={`w-full transform transition-all duration-300 ease-in-out ${
            activeTab === 'completed' 
              ? 'translate-x-0 opacity-100 relative' 
              : 'translate-x-full opacity-0 absolute top-0 left-0'
          }`}>
            <LoanSummaryCard
              {...LOAN_DATA[11]}
              href={`/borrow/${LOAN_DATA[11].id}`}
            />
            <LoanSummaryCard
              {...LOAN_DATA[12]}
              href={`/borrow/${LOAN_DATA[12].id}`}
            />
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
