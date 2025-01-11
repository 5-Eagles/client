import Link from 'next/link';
import RankingItem from '@/components/RankingItem';
import AuthNavButton from '@/components/AuthNavButton';
import Image from 'next/image';
import ServiceCard from '@/components/MainCard';

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

      <nav className='fixed bottom-0 w-full bg-white border-t'>
        <div className='max-w-md mx-auto flex justify-between items-center px-12 py-4'>
          <Link href='/' className='flex flex-col items-center text-blue-500'>
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
          <Link
            href='/borrow'
            className='flex flex-col items-center text-gray-400'
          >
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
          <Link
            href='/lend'
            className='flex flex-col items-center text-gray-400'
          >
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
          <AuthNavButton
            href='/mypage'
            className='flex flex-col items-center text-gray-400'
          >
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
            <span className='text-sm mt-1'>My</span>
          </AuthNavButton>
        </div>
      </nav>
    </>
  );
}
