

type cardInfoProps = {
  tag: string;
  value: string;
  icon: React.ReactNode;
  bgColor?: string;
};

export function CardInfo({ tag, value, icon, bgColor ='bg-primary-normal' }: cardInfoProps) {
  

  return (
    <div className="border p-4 border-secondary-light/20 rounded-2xl flex items-center justify-between ">
      <div className="flex flex-col justify-between gap-6">
        <span className="text-secondary-light">{tag}</span>
        <span className="text-lg text-secondary-dark">{value}</span>
      </div>

      <div className={`p-2 ${bgColor} flex items-center justify-center rounded-lg`} >
        {icon}
      </div>
    </div>
  );
}
