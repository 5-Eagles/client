import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
import BoxButton from '@/components/button/boxButton';
import GreyHoverButton from '@/components/button/greyHoverButton';
import CardButton from '@/components/button/cardButton';
export default function Borrow() {
  return (
    <>
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">빌리기</h1>

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

        <div className="flex gap-4 justify-center">
          <BoxButton backgroundColor="bg-primary" textColor="text-white">
            신청하기
          </BoxButton>
          <GreyHoverButton>
            더 알아보기
          </GreyHoverButton>
          <CardButton>
            <div className="flex flex-col items-center"></div>
          </CardButton>
        </div>
        </div>
        <BottomNav />
    </>
    
  );
}
