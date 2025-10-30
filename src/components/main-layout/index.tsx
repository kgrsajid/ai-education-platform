import { useState, type FC, type ReactNode } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
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
          {children}
        </main>
      </div>
    </div>
  );
};
