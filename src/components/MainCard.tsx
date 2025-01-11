interface ServiceCardProps {
  title: string;
  bgColor: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  title,
  bgColor,
  icon,
}: ServiceCardProps) {
  return (
    <div className='w-full aspect-square'>
      <div
        className={`${bgColor} rounded-2xl p-4 h-full flex flex-col justify-between`}
      >
        <div className='text-white text-lg font-medium'>{title}</div>
        <div className='flex justify-end'>{icon}</div>
      </div>
    </div>
  );
}
