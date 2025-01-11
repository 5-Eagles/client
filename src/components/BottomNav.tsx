'use client';

import Link from 'next/link';
import AuthNavButton from './AuthNavButton';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  console.log('Current pathname:', pathname);

  const getTextColor = (path: string) => {
    if (path === '/my') {
      return pathname.startsWith('/my') ? 'text-primary' : 'text-gray-400';
    }
    return pathname === path ? 'text-primary' : 'text-gray-400';
  };

  const getLinkClasses = (path: string) => {
    return `flex flex-col items-center h-full px-2 rounded-full hover:bg-base-200 transition-all duration-200 active:scale-95 ${getTextColor(
      path
    )}`;
  };

  return (
    <nav className='fixed bottom-0 w-full bg-base-100 border-t'>
      <div className='grid grid-cols-4 w-full max-w-md mx-auto py-3'>
        <Link href='/' className={getLinkClasses('/')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            />
          </svg>
          <span className='text-sm mt-1'>홈</span>
        </Link>
        <Link href='/borrow' className={getLinkClasses('/borrow')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='text-sm mt-1'>빌리기</span>
        </Link>
        <Link href='/lend' className={getLinkClasses('/lend')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            />
          </svg>
          <span className='text-sm mt-1'>빌려주기</span>
        </Link>
        <AuthNavButton className={getLinkClasses('/my')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
          <span className='text-sm mt-1 font-medium'>My</span>
        </AuthNavButton>
      </div>
    </nav>
  );
}