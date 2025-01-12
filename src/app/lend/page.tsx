'use client';

import LoanSummaryCard from '@/components/loan_summary_card';
import AuthNavButton from '@/components/AuthNavButton';
import BottomNav from '@/components/BottomNav';
import BadgeButton from '@/components/button/badgeButton';
import { RiCloseLine } from 'react-icons/ri';
import { MdExpandMore } from 'react-icons/md';
import BoxButton from '@/components/button/boxButton';
import { TbDiamond } from 'react-icons/tb';
import { useState } from 'react';
import LoanFilter from './LoanFilter';
import { IoSparklesOutline } from 'react-icons/io5';
import AiLoanModal from './aiLoan';
import { LOAN_DATA } from '@/data/loans';

export default function Lend() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setIsFilterOpen(true);
  };

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bg-white z-10'>
        <div className='w-full max-w-md mx-auto p-4 space-y-4'>
          <h1 className='text-xl font-bold text-center'>투자하기</h1>

          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
              <BadgeButton
                backgroundColor='bg-black'
                textColor='text-white'
                onClick={() => handleFilterClick('정렬')}
              >
                정렬: 추천순 <RiCloseLine className='w-4 h-4' />
              </BadgeButton>
              <BadgeButton onClick={() => handleFilterClick('수익률')}>
                수익률 <MdExpandMore className='w-4 h-4' />
              </BadgeButton>
              <BadgeButton onClick={() => handleFilterClick('모집률')}>
                모집률 <MdExpandMore className='w-4 h-4' />
              </BadgeButton>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className='flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors'
            >
              <IoSparklesOutline className='w-4 h-4' />
              <span className='font-medium'>AI 추천</span>
            </button>
          </div>
        </div>
      </div>

      <div className='w-full max-w-md mx-auto p-4 space-y-4 mt-32 mb-24'>
        {LOAN_DATA.map((loan) => (
          <LoanSummaryCard
            key={loan.id}
            {...loan}
            href={`/lend/${loan.id}`}
          />
        ))}
      </div>

      <LoanFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <AiLoanModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <BottomNav />
    </>
  );
}
