import { useState, type FC } from "react";
import Sidebar from "../../widgets/sidebar";
import Header from "../../widgets/header";
import { Outlet } from "react-router-dom";
import { GradeBandProvider } from "../../app/context/grade-band";
import { ProgressHUD } from "../../features/header/progress-hud";

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Read user from localStorage to get grade
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userGrade = user?.grade ?? 5; // Default to grade 5 if not set

  return (
    <GradeBandProvider grade={userGrade} setGrade={() => {}}>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        {/* Right content area */}
        <div className={`flex-1 flex flex-col overflow-hidden z-0 ${isOpen?'ml-64':'ml-16'} transition-all duration-200`}>
          {/* Existing Header */}
          <Header isOpen={isOpen}/>
          {/* Progress HUD below header */}
          <div style={{ position: 'fixed', top: 72, left: isOpen ? 256 : 64, right: 0, zIndex: 15, transition: 'left 0.2s' }}>
            <ProgressHUD />
          </div>
          {/* Content */}
          <main className="flex-1 flex flex-col mt-[120px] h-[calc(100vh-120px)] overflow-y-auto bg-[#101622]">
             <Outlet />
          </main>
        </div>
      </div>
    </GradeBandProvider>
  );
};
