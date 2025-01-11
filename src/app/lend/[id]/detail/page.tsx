'use client';

import TopNav from '@/components/TopNav';
import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
export default function LendResultDetailPage() {
  return (
    <>
    <div className="flex flex-col h-screen max-w-screen-sm mx-auto">
      <TopNav left="back" title="자세히 보기" />
      
      <div className="flex-1 overflow-y-auto w-full">
        <div className="px-4">
          <div className="mt-4">
            <LoanSummaryCard
              title="Sample Loan"
              amount={1000000}
              stats={[
                { label: "연 수익률", value: "12.5%", color: "text-primary" },
                { label: "기간", value: "12개월" },
                { label: "상환방식", value: "원리금균등" }
              ]}
              progressAmount={500000}
              targetAmount={1000000}
              href=""
              badge="모집중"
            />
          </div>

          <div className="mt-6 bg-base-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-center text-primary mb-6">
              거래가 안전하게 성사되었습니다
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">투자 정보</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">투자금</span>
                    <span className="font-bold">1,000,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">예상 이자율</span>
                    <span className="font-bold text-primary">19.32%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">상환 예정</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">받을 수 있는 금액</span>
                    <span className="font-bold">1,930,000원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">매달 받는 금액</span>
                    <span className="font-bold">90,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <BottomNav />

    </>
  );
} 