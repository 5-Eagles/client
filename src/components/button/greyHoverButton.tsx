interface GreyHoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  textColor?: string;
}

const GreyHoverButton: React.FC<GreyHoverButtonProps> = ({
  children,
  onClick,
  className = '',
  textColor = 'text-black',
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-ghost transition-all duration-200 
        active:scale-95 rounded-full ${textColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default GreyHoverButton;
