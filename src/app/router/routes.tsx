import { Routes, Route, Outlet } from "react-router-dom";
import QuizPage from "../../widgets/Tests/components/quiz";
import { LoginPage } from "../../pages/login/sugn_in";
import { MainLayout } from "../../providers/main-layout";
import { RegisterPage } from "../../pages/login/sing_up";
import { ForgotPasswordPage } from "../../pages/login/forgot-password";
import { PrivateRoute } from "../../providers/private-router";
import { ChatPage } from "../../pages/chat";
import { ROUTES } from "./config";
import { QuizDetailsPage } from "../../widgets/Tests/components/quiz-info";
import { QuizCreatePage } from "../../pages/quiz/create";
import QuizListPage from "../../pages/quiz/list";
import { CardsListPage } from "../../pages/card/list/index.tsx";
import { CardDetailPage } from "../../pages/card/detail.tsx";
import { CardsCreatePage } from "../../pages/card/create/index.tsx";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path={ROUTES.Login} element={<LoginPage/>}/>
        <Route path={ROUTES.Register} element={<RegisterPage/>}/>
        <Route path={ROUTES.ForgotPassword} element={<ForgotPasswordPage/>}/>
        <Route path={ROUTES.All} element={<MainLayout />}>
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path={ROUTES.ChatDetail} element={<ChatPage/>} />
            <Route path={ROUTES.Quiz} element={<QuizListPage />} />
            <Route path={ROUTES.QuizDetail} element={<QuizDetailsPage />} />
            <Route path={ROUTES.QuizDetailStart} element={<QuizPage />} />
            <Route path={ROUTES.QuizCreate} element={<QuizCreatePage/>} />
            <Route path={ROUTES.QuizEdit} element={<QuizCreatePage isEdit={true}/>} />
            <Route path={ROUTES.Games} element={<div>Игра</div>} />
            <Route path={ROUTES.Cards} element={<CardsListPage/>} />
            <Route path={ROUTES.CardDetail} element={<CardDetailPage/>}/>
            <Route path={ROUTES.CardsCreate} element={<CardsCreatePage/>}/>
            <Route path={ROUTES.CardEdit} element={<CardsCreatePage isEdit/>}/>
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
  );
};

export default AppRoutes;
