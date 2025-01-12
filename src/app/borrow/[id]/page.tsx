'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TopNav from '@/components/TopNav';
import LoanSummaryCard from '@/components/loan_summary_card';
import { getLoanById } from '@/data/loans';

export default function LoanDetail() {
  const params = useParams();
  const loan = getLoanById(params.id as string);

  if (!loan) {
    return <div>대출 정보를 찾을 수 없습니다.</div>;
  }

  const remainingAmount = loan.targetAmount - loan.progressAmount;
  const isOngoing = loan.status === '모집중';
  const statusMessage = isOngoing
    ? `거래 성사까지 ${(remainingAmount / 10000).toFixed(0)}만원 남았어요!`
    : `전액 상환까지 ${(remainingAmount / 10000).toFixed(0)}만원 남았어요!`;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav left="back" title="대출 상세 보기" />
      
      <div className="p-4 max-w-screen-sm mx-auto">
        <LoanSummaryCard
          title={loan.title}
          status={loan.status}
          amount={loan.amount}
          badge={loan.badge}
          stats={loan.stats}
          progressAmount={loan.progressAmount}
          targetAmount={loan.targetAmount}
          href={`/borrow/${loan.id}`}
        />

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">
            {statusMessage}
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">대출 진행률</span>
              <span className="font-bold">
                {((loan.progressAmount / loan.targetAmount) * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">모집된 금액</span>
              <span className="font-bold">
                {loan.progressAmount.toLocaleString()}원
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">목표 금액</span>
              <span className="font-bold">
                {loan.targetAmount.toLocaleString()}원
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">남은 금액</span>
              <span className="font-bold text-primary">
                {remainingAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">대출 정보</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">상환 방식</span>
              <span className="font-bold">원리금 균등</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">대출 기간</span>
              <span className="font-bold">
                {loan.stats[1].value}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">예상 수익률</span>
              <span className="font-bold text-primary">
                {loan.stats[0].value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}