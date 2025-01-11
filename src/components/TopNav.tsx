'use client';

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import GreyHoverButton from '@/components/button/greyHoverButton';
import { Passion_One } from 'next/font/google';

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

interface TopNavProps {
  left?: 'back' | 'logo' | null;
  title?: string;
  right?: React.ReactNode;
}

export default function TopNav({ left = null, title, right }: TopNavProps) {
  const router = useRouter();

  return (
    <nav className="sticky top-0 bg-white">
      <div className="relative h-14 flex justify-between items-center px-4">
        <div className="w-10 h-10 flex items-center">
          {left === 'back' ? (
            <GreyHoverButton onClick={() => router.back()}>
              <IoIosArrowBack className="w-6 h-6" />
            </GreyHoverButton>
          ) : left === 'logo' ? (
            <h1 className={`text-2xl text-[#15357A] ${passionOne.className}`}>
              CrediX
            </h1>
          ) : null}
        </div>
        
        {title && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold whitespace-nowrap">
              {title}
            </h1>
          </div>
        )}
        
        <div className="w-10 h-10 flex items-center justify-end">
          {right}
        </div>
      </div>
    </nav>
  );
}