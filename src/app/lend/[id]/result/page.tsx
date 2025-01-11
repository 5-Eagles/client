'use client';

import TopNav from '@/components/TopNav';
import BoxButton from '@/components/button/boxButton';
import { GoShieldCheck } from "react-icons/go";
import { useRouter } from 'next/navigation';

export default function LendResultPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <TopNav title="빌려주기" />
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <GoShieldCheck className="text-primary w-32 h-32 mb-6" />
          <h1 className="text-2xl font-bold text-center mb-2">
            거래가 안전하게 성사되었어요!
          </h1>
          
          <div className="mt-8 w-full max-w-md">
            <BoxButton 
              className="w-full"
              onClick={() => router.push('/lend/1/detail')}
            >
              자세히 보기
            </BoxButton>
          </div>
        </div>
      </div>
    </div>
  );
}