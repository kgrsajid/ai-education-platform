import { Routes, Route } from "react-router-dom";
import Chat from "./modules/Chat";
import QuizListPage from "./modules/Tests/components/quiz-list";
import QuizInfoPage from "./modules/Tests/components/quiz-info";
import QuizPage from "./modules/Tests/components/quiz";


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<></>
        } />
        <Route path="/chat" element={<Chat />} />
        <Route path="/quiz" element={<QuizListPage />} />
        <Route path="/quiz/:id" element={<QuizInfoPage />} />
        <Route path="/quiz/:id/start" element={<QuizPage/>} />
        <Route path="/game" element={<></>} />
        <Route path="/tests" element={<></>} />
      </Routes>
  );
};

export default AppRoutes;
