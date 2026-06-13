import { FiBox } from "react-icons/fi";


type TitleSectionProps = {
  typeTitle: 'info' | 'warning'
  title: string,
  paragrafo: string,
  icon?: React.ReactNode
}

export function TitleSection({ typeTitle, title, paragrafo, icon}: TitleSectionProps) {


  const iconColors = {
    info: 'bg-secondary-dark',
    warning: 'bg-error'
  }

  return(
  <div className="flex items-center gap-3">

    {/* icon */}
    <div className={` text-2xl xl:text-3xl p-1.5 xl:p-2 rounded-lg ${iconColors[typeTitle]}`}>
      {icon}
    </div>

    {/* titles */}
    <div>
      <h3 className="text-xl xl:text-[28px]/8  text-secondary-dark">{title}</h3>
      <p className="text-secondary-light text-sm xl:text-[16px] line-clamp-1">{paragrafo}</p>
    </div>

  </div>
  )
}