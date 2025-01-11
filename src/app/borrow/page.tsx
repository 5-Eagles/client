'use client';
import { useState } from 'react';
import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
import { GoSearch, GoBell, GoPlus } from 'react-icons/go';
import GreyHoverButton from '@/components/button/greyHoverButton';
import CardButton from '@/components/button/cardButton';
import Link from 'next/link';

export default function Borrow() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const ongoingLoans = [
    {
      title: '위험등급C',
      status: '모집중',
      amount: 2000000,
      badge: '달성',
      stats: [
        { label: '수익률', value: '10.9%', color: 'text-primary' },
        { label: '투자 기간', value: '12개월' },
        { label: '모집률', value: '45.50%' },
      ],
      progressAmount: 1400600,
      targetAmount: 2000000,
    },
    // Second ongoing loan with different values
    {
      title: '위험등급B',
      status: '모집중',
      amount: 3000000,
      badge: '진행중',
      stats: [
        { label: '수익률', value: '8.5%', color: 'text-primary' },
        { label: '투자 기간', value: '6개월' },
        { label: '모집률', value: '65.20%' },
      ],
      progressAmount: 1956000,
      targetAmount: 3000000,
    },
  ];

  const completedLoans = [
    // Two completed loans with different values
    {
      title: '위험등급A',
      status: '모집완료',
      amount: 1500000,
      badge: '완료',
      stats: [
        { label: '수익률', value: '9.2%', color: 'text-primary' },
        { label: '투자 기간', value: '9개월' },
        { label: '모집률', value: '100%' },
      ],
      progressAmount: 1500000,
      targetAmount: 1500000,
    },
    {
      title: '위험등급B',
      status: '모집완료',
      amount: 2500000,
      badge: '완료',
      stats: [
        { label: '수익률', value: '11.2%', color: 'text-primary' },
        { label: '투자 기간', value: '12개월' },
        { label: '모집률', value: '100%' },
      ],
      progressAmount: 2500000,
      targetAmount: 2500000,
    },
  ];

  return (
    <>
      <h1 className='text-xl font-bold text-center'>빌리기</h1>
      <div className='w-full max-w-md mx-auto p-4 space-y-4'>
        <div className='flex justify-between'>
          <div role="tablist" className="tabs tabs-bordered">
            <a 
              role="tab" 
              className={`tab ${activeTab === 'ongoing' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ongoing')}
            >
              모집 중
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              모집 완료
            </a>
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

        <div className="w-full">
          {activeTab === 'ongoing' && (
            <div className='space-y-4'>
              <Link href='/borrow/new'>
                <CardButton bgColor='bg-gray-100'>
                  <div className='flex flex-col items-center gap-1'>
                    <GoPlus className='w-6 h-6' />
                    <span className='text-sm'>대출 신청하기</span>
                  </div>
                </CardButton>
              </Link>
              {ongoingLoans.map((loan, index) => (
                <LoanSummaryCard
                  key={index}
                  {...loan}
                  href='/loan-details'
                />
              ))}
            </div>
          )}
          
          {activeTab === 'completed' && (
            <div className='space-y-4'>
              {completedLoans.map((loan, index) => (
                <LoanSummaryCard
                  key={index}
                  {...loan}
                  href='/loan-details'
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
