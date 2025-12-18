import { Button } from "antd";
import { ArrowBigUp } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  input: string;
  setInput: (value: string) => void;
  isPending: boolean;
  handleSend: () => void;
}
export const ChatInput:FC<Props> = ({input, setInput, isPending, handleSend}) => {
  const { t } = useTranslation();
  return (
    <div className="p-3 bg-white border-t mb-4 flex items-center rounded-full border border-gray-300 gap-2 sticky bottom-0">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" &&  !isPending && handleSend()}
        placeholder={t("chat.phrases.input.placeholder")}
        className="flex-1 p-1 rounded-xl focus:outline-none focus:ring-0"
      />
      <Button
        type="primary"
        disabled={isPending || input.length  == 0}
        onClick={handleSend}
        className="w-[35px] h-[35px] p-0 bg-blue-600 text-white rounded-full transition"
      >
        <ArrowBigUp size={18} />
      </Button>
    </div>
  );
}