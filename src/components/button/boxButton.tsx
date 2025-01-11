interface BoxButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
}

const BoxButton: React.FC<BoxButtonProps> = ({
  children,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${backgroundColor} ${textColor} transition-all duration-200 active:scale-95 hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};

export default BoxButton;
