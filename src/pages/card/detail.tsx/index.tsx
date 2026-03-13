import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../app/router/config";
import { ArrowLeft } from "lucide-react";
import { CardInfoTop } from "../../../widgets/Cards/detail-top";
import { useGetCardByIdQuery } from "../../../features/query/card";
import { FlashcardsPreview } from "../../../widgets/Cards/cards-preview";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

export const CardDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: cardData, isLoading } = useGetCardByIdQuery(id);

  return (
    <div className="px-8 py-10 w-[70%] mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(ROUTES.Cards)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors mb-6 text-sm"
      >
        <ArrowLeft size={16} />
        {t("card.phrases.detailPage.backToFlashcards")}
      </button>

      {isLoading ? (
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        </div>
      ) : (
        cardData && (
          <>
            <CardInfoTop isLoading={isLoading} card={cardData} />

            {cardData.cards && cardData.cards.length > 0 && (
              <FlashcardsPreview cards={cardData.cards} />
            )}
          </>
        )
      )}
    </div>
  );
};
