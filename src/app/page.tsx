import Link from 'next/link';
import RankingItem from '@/components/RankingItem';
import AuthNavButton from '@/components/AuthNavButton';
import Image from 'next/image';
import ServiceCard from '@/components/MainCard';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const rankings = [
    { rank: 1, company: 'SK하이닉스', amount: 1000000, score: 48 },
    { rank: 2, company: '삼성전자', amount: 800000, score: 47 },
    { rank: 3, company: '현대차', amount: 700000, score: 44 },
    { rank: 4, company: '유한양행', amount: 600000, score: 41 },
    { rank: 5, company: 'TSLA', amount: 500000, score: 38 },
  ];

  const services = [
    {
      title: '땡겨요',
      bgColor: 'bg-[#E67E22]',
      icon: <Image src='/donut.png' alt='donut' width={40} height={40} />,
    },
    {
      title: '대출비교/갈아타기',
      bgColor: 'bg-white',
      icon: (
        <Image src='/wallet-search.png' alt='wallet' width={40} height={40} />
      ),
    },
    {
      title: 'SOL트래블',
      bgColor: 'bg-[#3498DB]',
      icon: <Image src='/card-travel.png' alt='card' width={40} height={40} />,
    },
    {
      title: '쏠지갑',
      bgColor: 'bg-white',
      icon: <Image src='/wallet.png' alt='wallet' width={40} height={40} />,
    },
    {
      title: '쏠아구',
      bgColor: 'bg-white',
      icon: <Image src='/baseball.png' alt='baseball' width={40} height={40} />,
    },
    {
      title: '스토리뱅크',
      bgColor: 'bg-white',
      icon: <Image src='/chat.png' alt='chat' width={40} height={40} />,
    },
  ];

  return (
    <>
      <div className='flex flex-col min-h-screen pb-20'>
        <header className='p-4'>
          <h1 className='text-2xl font-bold text-[#15357A]'>CrediX</h1>
        </header>

        <div className='p-4 space-y-8'>
          <div className='bg-gray-100 rounded-2xl p-4 flex justify-between items-center'>
            <span className='text-lg font-medium'>내 계좌</span>
            <Link href='/mypage' className='text-blue-500'>
              전체보기
            </Link>
          </div>

          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>실시간 랭킹</h2>
            </div>
            <div className='space-y-2'>
              {rankings.map((item) => (
                <RankingItem key={item.rank} {...item} />
              ))}
            </div>
            <button className='w-full py-3 mt-4 bg-gray-100 rounded-xl text-gray-600'>
              더보기
            </button>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                bgColor={service.bgColor}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
