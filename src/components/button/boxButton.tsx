interface BoxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  textColor?: string;
}

const BoxButton: React.FC<BoxButtonProps> = ({
  children,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${backgroundColor} ${textColor} transition-all duration-200 active:scale-95 hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BoxButton;
