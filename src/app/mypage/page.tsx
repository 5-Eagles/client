import LoanSummaryCard from '@/components/loan_summary_card';
import BottomNav from '@/components/BottomNav';
import BadgeButton from '@/components/button/badgeButton';
import CardButton from '@/components/button/cardButton';
import Link from 'next/link';

export default function MyPage() {
  return (
    <>
    <h1 className="text-xl text-center font-bold">내 계좌</h1>
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
    
      
    <div className="bg-gray-100 rounded-2xl mx-4">
     
          <div className="pl-4 pt-4">
            <p className="text-sm text-gray-600">총 평가 금액</p>
            <p className="text-3xl font-bold">43,539,446원</p>
          </div>
          <Link href="/mypage/transfer">
          <CardButton className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">보유 머니</p>
                <p className="text-xl font-semibold">2,350,000원</p>
              </div>
             
                <BadgeButton
                  backgroundColor="bg-primary"
                  textColor="text-white"
                >
                  입출금하기
                </BadgeButton>
             
            </div>
          </CardButton>
          </Link>
       
      </div>
      
    
      
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
        title="빌려준 돈"
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
