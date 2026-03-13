import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export const QuizRole = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 rounded-3xl p-8 border mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle size={22} />
          {t('quizInfo.rules.title')}
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>• {t('quizInfo.rules.rule1')}</li>
          <li>• {t('quizInfo.rules.rule2')}</li>
          <li>• {t('quizInfo.rules.rule3')}</li>
          <li>• {t('quizInfo.rules.rule4')}</li>
        </ul>
      </div>
  );
}
