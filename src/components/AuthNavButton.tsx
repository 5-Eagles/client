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
    if (!session) {
      router.push('/login');
      return;
    }
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
}
