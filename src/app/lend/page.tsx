'use client'

import LoanSummaryCard from '@/components/loan_summary_card';
import AuthNavButton from '@/components/AuthNavButton';
import BottomNav from '@/components/BottomNav';
import BadgeButton from '@/components/button/badgeButton';
import { RiCloseLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import BoxButton from '@/components/button/boxButton';
import { TbDiamond } from "react-icons/tb";
import { useState } from 'react';
import LoanFilter from './LoanFilter';

export default function Lend() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setIsFilterOpen(true);
  };

  return (
    <>
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
            <h1 className="text-xl font-bold text-center">빌려주기</h1>

            <div className="flex flex-wrap gap-2 justify-center">
                <BadgeButton 
                    backgroundColor="bg-black" 
                    textColor="text-white"
                    onClick={() => handleFilterClick('정렬')}
                >
                    정렬: 추천순 <RiCloseLine className="w-4 h-4" />
                </BadgeButton>
                <BadgeButton onClick={() => handleFilterClick('수익률')}>
                    수익률 <MdExpandMore className="w-4 h-4" />
                </BadgeButton>
                <BadgeButton onClick={() => handleFilterClick('모집률')}>
                    모집률 <MdExpandMore className="w-4 h-4" />
                </BadgeButton>
                <BadgeButton onClick={() => handleFilterClick('투자기간')}>
                    투자기간 <MdExpandMore className="w-4 h-4" />
                </BadgeButton>
                <BoxButton className="px-16">
                    <TbDiamond className="w-4 h-4" /> AI 추천
                </BoxButton>
            </div>

            <LoanSummaryCard
                title="위험등급C"
                status="모집중"
                amount={2000000}
                badge="달성"
                stats={[
                { label: "수익률", value: "10.9%", color: "text-primary" },
                { label: "투자 기간", value: "12개월" },
                { label: "모집률", value: "45.50%" }
                ]}
                progressAmount={1400600}
                targetAmount={2000000}
                href="/loan-details"
            />
        
        </div>
        <LoanFilter 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)} 
        />
        <BottomNav />
    </>
    
  );
}
