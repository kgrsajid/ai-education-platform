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
import HomePage from "../../pages/home/index";
import RewardsPage from "../../pages/rewards/index";
import RewardsMyPage from "../../pages/rewards/my";
import TrainerPage from "../../pages/trainer/index";
import LeaderboardPage from "../../pages/leaderboard/index";
import AssignmentsPage from "../../pages/assignment/list/index";
import AssignmentDetailPage from "../../pages/assignment/detail/index";
import AssignmentCreatePage from "../../pages/assignment/create/index";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path={ROUTES.Login} element={<LoginPage/>}/>
        <Route path={ROUTES.Register} element={<RegisterPage/>}/>
        <Route path={ROUTES.ForgotPassword} element={<ForgotPasswordPage/>}/>
        <Route path={ROUTES.All} element={<MainLayout />}>
          <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
            {/* Home / Dashboard */}
            <Route path={ROUTES.Home} element={<HomePage />} />
            <Route index element={<HomePage />} />

            {/* Chat */}
            <Route path={ROUTES.ChatDetail} element={<ChatPage/>} />

            {/* Quiz */}
            <Route path={ROUTES.Quiz} element={<QuizListPage />} />
            <Route path={ROUTES.QuizDetail} element={<QuizDetailsPage />} />
            <Route path={ROUTES.QuizDetailStart} element={<QuizPage />} />
            <Route path={ROUTES.QuizCreate} element={<QuizCreatePage/>}/>
            <Route path={ROUTES.QuizEdit} element={<QuizCreatePage isEdit={true}/>} />

            {/* Cards */}
            <Route path={ROUTES.Cards} element={<CardsListPage/>} />
            <Route path={ROUTES.CardDetail} element={<CardDetailPage/>}/>
            <Route path={ROUTES.CardsCreate} element={<CardsCreatePage/>}/>
            <Route path={ROUTES.CardEdit} element={<CardsCreatePage isEdit/>}/>

            {/* Rewards */}
            <Route path={ROUTES.Rewards} element={<RewardsPage />} />
            <Route path={ROUTES.RewardsMy} element={<RewardsMyPage />} />

            {/* AI Trainer & Leaderboard */}
            <Route path={ROUTES.Trainer} element={<TrainerPage />} />
            <Route path={ROUTES.Leaderboard} element={<LeaderboardPage />} />

            {/* Assignments (replacing Games) */}
            <Route path={ROUTES.Assignments} element={<AssignmentsPage />} />
            <Route path={ROUTES.AssignmentCreate} element={<AssignmentCreatePage />} />
            <Route path={ROUTES.AssignmentDetail} element={<AssignmentDetailPage />} />
          </Route>
        </Route>
      </Routes>
  );
};

export default AppRoutes;
