interface BoxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function BoxButton({ children, className, ...props }: BoxButtonProps) {
  return (
    <button 
      className={`btn btn-primary ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
}
