import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  input: string;
  setInput: (value: string) => void;
  isPending: boolean;
  handleSend: () => void;
  isSummaryMode: boolean;
  handleChangeSummaryMode: () => void;
};

export const ChatInput: FC<Props> = ({
  input,
  setInput,
  isPending,
  handleSend,
  isSummaryMode,
  handleChangeSummaryMode,
}) => {
  const { t } = useTranslation();
  const canSend = !isPending && input.trim().length > 0;

  return (
    <div className="p-6 bg-[#111722] border-t border-slate-800 shrink-0">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-2 border border-slate-700/50 flex flex-col gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && canSend) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t('chat.phrases.input.placeholder')}
            rows={2}
            className="w-full bg-transparent border-none focus:ring-0 text-sm py-1 px-3 resize-none text-slate-200 placeholder:text-slate-500 outline-none custom-scrollbar"
          />
          <div className="flex items-center justify-between border-t border-slate-700 pt-2 px-1">
            <div className="flex items-center gap-1">
              <button
                onClick={handleChangeSummaryMode}
                title="Toggle summary mode"
                className={`flex flex-col w-[35px] h-[35px] items-center justify-center rounded-lg transition-all ${
                  isSummaryMode
                    ? 'text-primary bg-primary/10'
                    : 'text-slate-500 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined text-lg">summarize</span>
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!canSend}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                canSend
                  ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Send Message</span>
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};
