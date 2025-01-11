import { RiCloseLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";

interface BadgeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const BadgeButton: React.FC<BadgeButtonProps> = ({
  children,
  onClick,
  className = '',
  backgroundColor = 'bg-transparent',
  textColor = 'text-gray-600',
}) => {
  return (
    <button
      onClick={onClick}
      className={`badge ${backgroundColor} ${textColor} 
        transition-all duration-200 
        active:scale-95 hover:opacity-90
        px-2 py-4 rounded-full border border-gray-100
        flex items-center gap-1 text-xs
        ${className}`}
    >
      {children}
    </button>
  );
};

export default BadgeButton;
