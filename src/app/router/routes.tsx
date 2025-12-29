import { Routes, Route, Outlet } from "react-router-dom";
import QuizPage from "../../widgets/Tests/components/quiz";
import QuizletFlashcardsApp from "../../widgets/Cards";
import { LoginPage } from "../../pages/login/sugn_in";
import { MainLayout } from "../../providers/main-layout";
import { RegisterPage } from "../../pages/login/sing_up";
import { PrivateRoute } from "../../providers/private-router";
import { ChatPage } from "../../pages/chat";
import { ROUTES } from "./config";
import { QuizDetailsPage } from "../../widgets/Tests/components/quiz-info";
import { QuizCreatePage } from "../../pages/quiz/create";
import QuizListPage from "../../pages/quiz/list";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path={ROUTES.Login} element={<LoginPage/>}/>
        <Route path={ROUTES.Register} element={<RegisterPage/>}/>
        <Route path={ROUTES.All} element={<MainLayout />}>
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path={ROUTES.ChatDetail} element={<ChatPage/>} />
            <Route path={ROUTES.Quiz} element={<QuizListPage />} />
            <Route path={ROUTES.QuizDetail} element={<QuizDetailsPage />} />
            <Route path={ROUTES.QuizDetailStart} element={<QuizPage />} />
            <Route path={ROUTES.QuizCreate} element={<QuizCreatePage/>} />
            <Route path={ROUTES.Games} element={<div>Игра</div>} />
            <Route path={ROUTES.Cards} element={<QuizletFlashcardsApp />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
  );
};

export default AppRoutes;
