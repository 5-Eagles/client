interface RankingItemProps {
  rank: number;
  company: string;
  amount: string;
  status: string;
  score: number;
}

export default function RankingItem({
  rank,
  company,
  amount,
  score,
}: RankingItemProps) {
  return (
    <div className='flex items-center justify-between py-4 border-b border-gray-100'>
      <div className='flex items-center gap-4'>
        <span className='text-xl font-bold w-8'>{rank}</span>
        <div>
          <p className='font-bold'>{company}</p>
          <p className='text-gray-500'>거래대금 {amount.toLocaleString()}</p>
        </div>
      </div>
      <div className='flex items-center text-red-500'>
        {score}/50
        <span className='ml-2'>›</span>
      </div>
    </div>
  );
}
