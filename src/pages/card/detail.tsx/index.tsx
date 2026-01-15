import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../app/router/config";
import { ArrowLeft } from "lucide-react";
import { CardInfoTop } from "../../../widgets/Cards/detail-top";
import { useGetCardByIdQuery } from "../../../features/query/card";
import { useEffect } from "react";
import { FlashcardsPreview } from "../../../widgets/Cards/cards-preview";

export const CardDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data: cardData, isLoading} = useGetCardByIdQuery(id);

  useEffect(() => {
    console.log(cardData);
  },[cardData]);
  return(
    <div className="px-8 py-12 w-[70%] mx-auto">
      <button
        onClick={() => navigate(ROUTES.Cards)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-10"
      >
        <ArrowLeft size={18} />
      </button>
      {
        cardData && 
        <CardInfoTop isLoading={isLoading} card={cardData}/>
      }

      {
        cardData && cardData.cards && 

      <div className="mt-12">
          <FlashcardsPreview cards={cardData.cards}/>
      </div>
      }
    </div>
  );
}