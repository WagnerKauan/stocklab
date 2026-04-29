import { FiBox } from "react-icons/fi";

type CardDashboardProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  bgColor?: string
}


export function CardDashboard({ title, icon, value, bgColor}: CardDashboardProps) {
  return (
    <div className="border rounded-2xl border-secondary-light/20 bg-white p-6 flex flex-col gap-11">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl text-secondary-dark">{title}</h4>

        <div className={`${bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
         {icon}
        </div>
      </div>

      <div>
        <h2 className="text-[34px]">{value}</h2>
      </div>
    </div>
  );
}