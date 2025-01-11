interface GreyHoverButtonProps {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function GreyHoverButton({
  children,
  className = '',
  textColor = '',
  onClick,
}: GreyHoverButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`btn btn-ghost transition-all duration-200 
        active:scale-95 hover:bg-gray-100 ${textColor} ${className} rounded-full`}
    >
      {children}
    </div>
  );
}
