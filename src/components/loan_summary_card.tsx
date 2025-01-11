import CardButton from '@/components/button/cardButton';
import Link from 'next/link';

interface LoanSummaryProps {
  title: string;
  status?: string;
  amount: number;
  stats: {
    label: string;
    value: string;
    color?: string;
  }[];
  progressAmount: number;
  targetAmount: number;
  href: string;
  badge?: string;
}

export default function LoanSummaryCard({
  title,
  status,
  amount,
  stats,
  progressAmount,
  targetAmount,
  href,
  badge,
}: LoanSummaryProps) {
  return (
    <Link href={href}>
      <CardButton>
        <div className="flex justify-between items-center">
          <span className="text-base-content/80">{title}</span>
          {status && <span className="text-primary">{status}</span>}
        </div>

        <p className="text-2xl font-bold text-right mt-2 text-base-content">
          {amount.toLocaleString()} 원
        </p>
        {badge && (
          <div className="flex justify-end mt-1">
            <div className="badge badge-primary">
              {`${((progressAmount / targetAmount) * 100).toFixed(2)}% ${badge}`}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-base-content/80 mb-1 text-sm">{stat.label}</p>
              <p className={`font-bold text-base-content text-xl ${stat.color || ''}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <progress 
            className="progress progress-primary w-full" 
            value={progressAmount} 
            max={targetAmount}
          />
          <div className="flex justify-between text-sm mt-1 text-base-content">
            <span>{progressAmount.toLocaleString()}원</span>
            <span>{targetAmount.toLocaleString()}원</span>
          </div>
        </div>
      </CardButton>
    </Link>
  );
}
