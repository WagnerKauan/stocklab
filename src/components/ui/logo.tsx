
import { FiLayers } from "react-icons/fi";


type LogoProps = {size?: string}
export function Logo({size}: LogoProps) {


  return (

    <div className={`flex items-center gap-1 ${size || 'text-2xl'}`}>
      <FiLayers className="text-primary-normal" />
      <h4 className="text-secondary-dark">StockLab</h4>
    </div>
  )
}