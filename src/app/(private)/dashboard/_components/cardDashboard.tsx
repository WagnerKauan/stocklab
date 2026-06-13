
type CardDashboardProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  bgColor?: string
}


export function CardDashboard({ title, icon, value, bgColor}: CardDashboardProps) {
  return (
    <div className="border rounded-2xl border-secondary-light/20 bg-white p-4 xl:p-6 flex flex-col xl:gap-11 gap-4 flex-1">
      <div className="flex justify-between items-center gap-3">
        <h4 className="text-lg xl:text-2xl text-secondary-normal">{title}</h4>

        <div className={`${bgColor} w-8 h-8 xl:w-10 xl:h-10 rounded-lg flex items-center justify-center  xl:text-2xl`}>
         {icon}
        </div>
      </div>

      <div>
        <h2 className=" text-2xl  xl:text-[34px]">{value}</h2>
      </div>
    </div>
  );
}