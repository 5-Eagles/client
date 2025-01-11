interface CardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
}

const CardButton = ({
  children,
  onClick,
  className = '',
  bgColor = 'bg-base-100',
}: CardButtonProps) => {
  return (
    <div 
      onClick={onClick}
      className={`block w-full ${className}`}
    >
      <div className="m-4 rounded-3xl bg-card-bg shadow-center-xl overflow-hidden active:scale-95 active:brightness-95 transition-all duration-200 cursor-pointer">
        <div className={`${bgColor} p-4`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardButton;
