import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
export default function MyPage() {
  return (
    <>
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">내 계좌</h1>
      
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
      
      <LoanSummaryCard
        title="빌린 돈"
        status="더보기"
        amount={43539446}
        badge="달성"
        stats={[
          { label: "상시런 상품", value: "10개", color: "text-primary" },
          { label: "모집중인 상품", value: "12개", color: "text-error" },
          { label: "이번 달 납부 돈", value: "300만원" }
        ]}
        progressAmount={8252000}
        targetAmount={43539446}
        href="/borrowed"
      />

      <LoanSummaryCard
        title="받아준 돈"
        status="더보기"
        amount={43539446}
        badge="달성"
        stats={[
          { label: "평균 수익률", value: "11.2%", color: "text-primary" },
          { label: "투자 기간", value: "12개월" },
          { label: "누적투자비율", value: "41.80%" }
        ]}
        progressAmount={1669000}
        targetAmount={3000000}
        href="/lent"
      />
       </div>
      <BottomNav />
    </>

      
   
  );
}
