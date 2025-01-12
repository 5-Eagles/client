interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
