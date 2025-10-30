import { LogOut } from "lucide-react";
import type { FC } from "react";

type Props = {
  isOpen: boolean
}
const Header:FC<Props> = ({isOpen}) => {
  return (
    <header className={`fixed top-0 ${!isOpen?'left-16':'left-64'} transition-all duration-200 right-0 h-[72px] flex justify-between items-center px-6 py-4 shadow-md bg-white z-50`}>
      {/* Логотип */}
      <div className="text-2xl font-bold">MyApp</div>

      {/* Профиль и логаут */}
      <div className="flex items-center gap-7">
        <div>Profile</div>
        <LogOut />
      </div>
    </header>
  );
};

export default Header;
