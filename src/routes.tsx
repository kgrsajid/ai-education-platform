import { Routes, Route, Outlet } from "react-router-dom";
import QuizListPage from "./modules/Tests/components/quiz-list";
import QuizInfoPage from "./modules/Tests/components/quiz-info";
import QuizPage from "./modules/Tests/components/quiz";
import QuizletFlashcardsApp from "./modules/Cards";
import { LoginPage } from "./pages/login/sugn_in";
import { MainLayout } from "./widgets/main-layout";
import { RegisterPage } from "./pages/login/sing_up";
import { PrivateRoute } from "./providers/private-router";
import { ChatPage } from "./pages/chat";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="/chat/:id" element={<ChatPage/>} />
            <Route path="/quiz" element={<QuizListPage />} />
            <Route path="/quiz/:id" element={<QuizInfoPage />} />
            <Route path="/quiz/:id/start" element={<QuizPage />} />
            <Route path="/game" element={<div>Игра</div>} />
            <Route path="/cards" element={<QuizletFlashcardsApp />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
  );
};

export default AppRoutes;
