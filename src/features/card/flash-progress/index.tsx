import type { FC } from "react";
import type { TCardResponse } from "../../api/card/type";
import { useTranslation } from "react-i18next";

type Props = {
  index: number;
  cardsOrder: TCardResponse[];
};

export const FlashProgress: FC<Props> = ({ index, cardsOrder }) => {
  const { t } = useTranslation();
  const progress = cardsOrder.length === 0 ? 0 : (index / cardsOrder.length) * 100;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-slate-500 font-medium">{t('card.phrases.flashcard.progress')}</span>
        <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-800">
        <div
          style={{ width: `${progress}%` }}
          className="bg-[#1152d4] h-full rounded-full transition-all duration-300"
        />
      </div>
    </div>
  );
};
