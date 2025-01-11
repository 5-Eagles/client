import LoanSummaryCard from '@/components/loan_summary_card';
import AuthNavButton from '@/components/AuthNavButton';
import BottomNav from '@/components/BottomNav';

export default function MyPage() {
  return (
    <>
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
        <h1 className="text-xl font-bold">내 계좌</h1>

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
        <BottomNav />
    </>
    
  );
}
