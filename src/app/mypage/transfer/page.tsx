'use client';

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import GreyHoverButton from '@/components/button/greyHoverButton';
import BoxButton from '@/components/button/boxButton';
import Link from 'next/link';

export default function Transfer() {
  const router = useRouter();

  const transactions = [
    { type: '입금', date: '2024.03.20 14:30', amount: 500000 },
    { type: '첫 가입 충전', date: '2024.03.15 09:20', amount: 1000000 },
    { type: '출금', date: '2024.03.10 16:45', amount: -300000 },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <GreyHoverButton onClick={() => router.back()}>
          <IoIosArrowBack className="w-6 h-6" />
        </GreyHoverButton>
        <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">입출금</h1>
        <GreyHoverButton>
          한도 안내
        </GreyHoverButton>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600">보유 머니</p>
          <p className="text-3xl font-bold">2,350,000원</p>
        </div>

        <div className="flex gap-4">
          <Link href="/mypage/transfer/deposit" className="flex-[2]">
            <BoxButton className="w-full">입금하기</BoxButton>
          </Link>
          <Link href="/mypage/transfer/withdraw" className="flex-1">
            <BoxButton 
              className="w-full"
              backgroundColor="bg-gray-100"
              textColor="text-black"
            >
              출금하기
            </BoxButton>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">입출금 내역</h2>
          {transactions.map((transaction, index) => (
            <div key={index}>
              <div className="flex justify-between items-center py-4">
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-primary' : 'text-error'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}
                  {transaction.amount.toLocaleString()}원
                </p>
              </div>
              <div className="divider m-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}