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
}

export default function LoanSummaryCard({
  title,
  status,
  amount,
  stats,
  progressAmount,
  targetAmount,
  href,
}: LoanSummaryProps) {
  return (
    <Link href={href} className="block m-4">
      <div className="btn btn-ghost h-auto p-0 w-full normal-case bg-card-bg shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-200">
        <div className="bg-base-100 rounded-2xl p-4 w-full">
          <div className="flex justify-between items-center">
            <span className="text-base-content/80">{title}</span>
            {status && <span className="text-primary">{status}</span>}
          </div>

          <p className="text-2xl font-bold text-right mt-2 text-base-content">
            {amount.toLocaleString()} 원
          </p>

          <div className="flex justify-between text-sm mt-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-base-content/80 mb-1">{stat.label}</p>
                <p className={`font-bold text-base-content ${stat.color || ''}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <progress 
              className="progress progress-success w-full" 
              value={progressAmount} 
              max={targetAmount}
            />
            <div className="flex justify-between text-sm mt-1 text-base-content">
              <span>{progressAmount.toLocaleString()}원</span>
              <span>{targetAmount.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
