import LoanSummaryCard from '@/components/loan_summary_card';
import AuthNavButton from '@/components/AuthNavButton';
import BottomNav from '@/components/BottomNav';
import { GoSearch, GoBell } from "react-icons/go";
import GreyHoverButton from '@/components/button/greyHoverButton';

export default function Borrow() {
  return (
    <>
        <h1 className="text-xl font-bold text-center">빌리기</h1>
        <div className="w-full max-w-md mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <GreyHoverButton className="text-sm">
              모집 중
            </GreyHoverButton>
            <GreyHoverButton className="text-sm">
              모집 완료
            </GreyHoverButton>
          </div>
          <div className="flex gap-2">
            <GreyHoverButton>
              <GoSearch className="w-5 h-5" />
            </GreyHoverButton>
            <GreyHoverButton>
              <GoBell className="w-5 h-5" />
            </GreyHoverButton>
          </div>
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
        <BottomNav />
    </>
    
  );
}
