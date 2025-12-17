import { useState, type FC } from "react";
import Sidebar from "../../widgets/sidebar";
import Header from "../../widgets/header";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex">
      {/* Фиксированный Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      {/* Правая часть страницы */}
      <div className={`flex-1 flex flex-col relative z-0 h-full ${isOpen?'ml-64':'ml-16'} transition-all duration-200`}> 
        {/* фиксируем header */}
        <Header isOpen={isOpen}/>
        {/* Контент, который занимает всю оставшуюся высоту */}
        <main className="flex-1 flex flex-col mt-[72px] min-h-[calc(100vh-72px)] bg-[--primary-bg-color]">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
