import { LogOut } from "lucide-react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/context/const/const";
import { ROUTES } from "../../app/router/config";
import { LanguageDropdown } from "../../features/header/language-dropdown";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean
}
const Header:FC<Props> = ({isOpen}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const logOut = () => {
    navigate(ROUTES.Login);
    localStorage.removeItem("token");
    auth.logout();
  }
  return (
    <header className={`fixed top-0 ${!isOpen?'left-16':'left-64'} transition-all duration-200 right-0 h-[72px] flex justify-between items-center px-6 py-4 shadow-md bg-slate-900 border-b border-slate-800 z-50`}>
      {/* Logo */}
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary text-2xl">school</span>
        <h2 className="text-lg font-bold tracking-tight">{t('header.appName')}</h2>
      </div>

      {/* Profile and logout */}
      <div className="flex items-center gap-7">
        <LanguageDropdown/>
        <div>{t('header.profile')}</div>
        <LogOut className="cursor-pointer" onClick={logOut}/>
      </div>
    </header>
  );
};

export default Header;
