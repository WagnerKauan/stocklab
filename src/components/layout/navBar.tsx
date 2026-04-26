import Image from "next/image";
import { FiBell } from "react-icons/fi";



export function NavBar() {
  


  return (
    <header className="max-h-17.5 bg-white w-full rounded-3xl py-3 px-6 flex items-center justify-between border border-secondary-light/20">
     <span className="text-secondary-dark text-lg ">Dashboard</span>

     <div className="flex items-center gap-4">
      <div className="cursor-pointer">
        <FiBell className="text-secondary-dark text-[32px]" />
      </div>

      <div className="w-12 h-12 rounded-full bg-background-normal">
        <Image  src="/profile.png" alt="avatar" width={48} height={48} />
      </div>
     </div>
    </header>
  );
}