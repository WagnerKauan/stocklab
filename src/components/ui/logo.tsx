
import { FiLayers } from "react-icons/fi";

export function Logo() {


  return (

    <div className="flex items-center gap-1 text-2xl">
      <FiLayers className="text-primary-normal" />
      <h4 className="text-secondary-dark">StockLab</h4>
    </div>
  )
}