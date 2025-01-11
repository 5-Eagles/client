'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface AuthNavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthNavButton({
  href,
  children,
  className,
}: AuthNavButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // 로그인된 상태면 해당 페이지로 이동
      router.push(href);
    } else {
      // 로그인되지 않은 상태면 로그인 페이지로 이동
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center ${className}`}
    >
      {children}
    </button>
  );
}
