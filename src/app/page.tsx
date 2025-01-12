'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RankingItem from '@/components/RankingItem';
import Image from 'next/image';
import CardButton from '@/components/button/cardButton';
import BottomNav from '@/components/BottomNav';
import { Passion_One } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// 실시간 랭킹 데이터
const rankingData = [
  {
    rank: 1,
    company: '퓨처파이낸스',
    amount: '42,000,000',
    status: '46/50',
    score: 92,
  },
  {
    rank: 2,
    company: '디지털펀드',
    amount: '38,000,000',
    status: '32/50',
    score: 64,
  },
  {
    rank: 3,
    company: '테크론캐피탈',
    amount: '35,000,000',
    status: '28/50',
    score: 56,
  },
];

export default function Home() {
  const [currentRankings, setCurrentRankings] = useState(rankingData);

  // 랭킹 순환 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRankings((prev) => {
        const newRankings = [...prev];
        const first = newRankings.shift();
        newRankings.push(first);
        return newRankings.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className='flex flex-col min-h-screen pb-20'>
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative h-48 w-full bg-gradient-to-b from-primary/50 to-transparent'
        >
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-4'>
            <h1
              className={`text-6xl text-primary [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff] px-6 py-2 rounded-lg ${passionOne.className}`}
            >
              CrediX
            </h1>
          </div>
        </motion.div>

        {/* 실시간 랭킹 섹션 */}
        <div className='p-3 mt-0'>
          <div className='bg-gray-50 rounded-xl p-3 shadow-sm'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                <FaChartLine className='text-primary text-sm' />
              </div>
              <h2 className='text-lg font-bold'>실시간 랭킹 🔥</h2>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='text-xs text-primary font-semibold ml-auto'
              >
                LIVE
              </motion.div>
            </div>

            <div className='h-16 relative overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentRankings[0].company}
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  exit={{ y: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <RankingItem {...currentRankings[0]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 중간 섹션 추가 */}
        <div className='px-3 mt-1'>
          <motion.div
            className='bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-2xl mb-2'
            whileHover={{ scale: 1.02 }}
          >
            <h3 className='text-lg font-bold mb-2'>이번 주 인기 대출상품</h3>
            <div className='space-y-3'>
              {[
                { title: '사업자 신용대출', rate: '연 4.5%' },
                { title: '소상공인 특별대출', rate: '연 3.9%' },
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center bg-white/50 p-3 rounded-lg'
                >
                  <span className='font-medium'>{item.title}</span>
                  <span className='text-primary font-bold'>{item.rate}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className='grid grid-cols-2 gap-2'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl'
            >
              <div className='flex flex-col items-center text-center'>
                <div className='bg-primary/20 p-3 rounded-full mb-3'>
                  <FaChartLine className='text-primary text-2xl' />
                </div>
                <h3 className='font-bold mb-1'>ML 신용 분석</h3>
                <p className='text-sm text-gray-600'>자체 제작 신용평가 모델</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className='bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-2xl'
            >
              <div className='flex flex-col items-center text-center'>
                <div className='bg-secondary/20 p-3 rounded-full mb-3'>
                  <FaShieldAlt className='text-secondary text-2xl' />
                </div>
                <h3 className='font-bold mb-1'>안전성 · 투명성</h3>
                <p className='text-sm text-gray-600'>
                  블록체인 기반 거래 시스템
                </p>
              </div>
            </motion.div>
          </div>

          <div className='mt-3 bg-white/80 rounded-2xl p-4'>
            <div className='space-y-3 px-3 mt-4'>
              {/* 첫 번째 배너 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-2xl text-white flex items-center justify-between'
              >
                <div className='space-y-1'>
                  <h3 className='text-lg font-bold'>두나무 투자의 디딤돌</h3>
                  <p className='text-sm text-blue-200'>
                    안전한 투자를 위한 최고의 파트너
                  </p>
                </div>
                <div className='relative w-24 h-24'>
                  <Image
                    src='/doonamu.jpeg'
                    alt='Dunamu Logo'
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </motion.div>

              {/* 두 번째 배너 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-2xl text-white flex items-center justify-between'
              >
                <div className='space-y-1'>
                  <h3 className='text-lg font-bold'>AWS 클라우드 기반</h3>
                  <p className='text-sm text-orange-100'>
                    안정적이고 확장 가능한 시스템
                  </p>
                </div>
                <div className='relative w-24 h-24'>
                  <Image
                    src='/icon/aws.png'
                    alt='AWS Logo'
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 신용평가 시작하기 버튼을 맨 아래로 이동 */}
        <div className='p-4 mt-auto'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20'
          >
            신용평가 시작하기
          </motion.button>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
