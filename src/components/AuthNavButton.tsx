'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface AuthNavButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthNavButton({
  children,
  className = 'flex flex-col items-center text-gray-400',
}: AuthNavButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
