import { FiBox } from "react-icons/fi";




export function CardDashboard() {
  return (
    <div className="border h-full  rounded-2xl border-secondary-light/20 bg-white p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl text-secondary-dark">Produtos</h4>

        <div className="bg-primary-normal w-10 h-10 rounded-lg flex items-center justify-center">
          <FiBox className="text-white text-2xl" />
        </div>
      </div>

      <div>
        <h2 className="text-[34px]">120</h2>
      </div>
    </div>
  );
}