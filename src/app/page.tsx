import Link from 'next/link';
import RankingItem from '@/components/RankingItem';
import AuthNavButton from '@/components/AuthNavButton';
import Image from 'next/image';
import ServiceCard from '@/components/MainCard';
import CardButton from '@/components/button/cardButton';
import BottomNav from '@/components/BottomNav';
import { Passion_One } from 'next/font/google';

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen gap-4">
        <Image
          src="/detailLogo.svg"
          alt="CrediX Logo"
          width={200}
          height={200}
          priority
        />
      
      </main>
      <BottomNav />
    </>
  );
}
