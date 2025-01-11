import Link from 'next/link';

interface CardButtonProps {
  children: React.ReactNode;
  bgColor?: string;
  href: string;
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  children,
  bgColor = 'bg-white',
  href,
  className = '',
}) => {
  return (
    <Link href={href}>
      <div className={`w-full p-4 rounded-lg ${bgColor} ${className} transition-all duration-200 active:scale-95 hover:opacity-90`}>
        {children}
      </div>
    </Link>
  );
};

export default CardButton;
