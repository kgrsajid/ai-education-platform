import { LogOut } from "lucide-react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/context/const/const";
import { ROUTES } from "../../app/router/config";
import { LanguageDropdown } from "../../features/header/language-dropdown";

type Props = {
  isOpen: boolean
}
const Header:FC<Props> = ({isOpen}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const logOut = () => {
    navigate(ROUTES.Login);
    localStorage.removeItem("token");
    auth.logout();
  }
  return (
    <header className={`fixed top-0 ${!isOpen?'left-16':'left-64'} transition-all duration-200 right-0 h-[72px] flex justify-between items-center px-6 py-4 shadow-md bg-white z-50`}>
      {/* Логотип */}
      <div className="text-2xl font-bold">MyApp</div>

      {/* Профиль и логаут */}
      <div className="flex items-center gap-7">
        <LanguageDropdown/>
        <div>Profile</div>
        <LogOut className="cursor-pointer" onClick={logOut}/>
      </div>
    </header>
  );
};

export default Header;
