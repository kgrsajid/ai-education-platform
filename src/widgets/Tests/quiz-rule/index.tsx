import { HelpCircle } from "lucide-react";

export const QuizRole = () => {
  return (
    <div className="bg-gray-50 rounded-3xl p-8 border mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle size={22} />
          Quiz rules
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>• One correct answer per question</li>
          <li>• You can’t change answers after submitting</li>
          <li>• No time limit unless specified</li>
          <li>• Your result will be shown at the end</li>
        </ul>
      </div>
  );
}