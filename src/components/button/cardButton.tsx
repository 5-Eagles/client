interface CardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full ${className}`}
    >
      <div className="m-4 rounded-3xl bg-card-bg shadow-xl overflow-hidden active:scale-95 active:brightness-95 transition-all duration-200 cursor-pointer">
        <div className="bg-base-100 p-6">
          {children}
        </div>
      </div>
    </button>
  );
};

export default CardButton;
