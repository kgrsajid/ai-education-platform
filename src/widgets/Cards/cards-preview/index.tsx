import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TCardResponse } from "../../../features/api/card/type";
import { FlashCard } from "../../../features/card/flash-card";
import { Switch } from "antd";
import { FlashArrows } from "../../../features/card/flash-arrows";
import { FlashModes } from "../../../features/card/flash-modes";
import { FlashProgress } from "../../../features/card/flash-progress";
import { FlashcardsSummary } from "../../../features/card/flash-summary";

type Props = {
  cards: TCardResponse[];
};

type Action = {
  card: TCardResponse;
  type: "know" | "still";
};

export const FlashcardsPreview = ({ cards }: Props) => {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [history, setHistory] = useState<Action[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const originalCards = cards;

  const [cardsOrder, setCardsOrder] = useState<TCardResponse[]>(originalCards);

  const [stillLearning, setIsStillLearning] = useState<TCardResponse[]>([]);
  const [knows, setIsKnows] = useState<TCardResponse[]>([]);

  /* ---------------- PAGINATION ---------------- */

  const paginate = (newDirection: number) => {
    setState(([i]) => {
      const nextIndex = i + newDirection;
      if (nextIndex < 0 || nextIndex > cardsOrder.length) {
        return [i, 0];
      }
      return [nextIndex, newDirection];
    });
  };
  const card = cardsOrder[index];


  const handleFinish = () => {
    setIsFinish(true);
  }
  const handleRight = () => {
    setIsKnows(prev => [...prev, card]);
    setHistory(prev => [...prev, { card, type: "know" }]);
    paginate(1);
    if(index === cardsOrder.length - 1) {
      handleFinish();
    }
  }
   const handleAddToLearning = () => {
    setIsStillLearning(prev => [...prev, card]);
    setHistory(prev => [...prev, { card, type: "still" }]);
    paginate(1);
    if(index === cardsOrder.length - 1) {
      handleFinish();
    }
  }

  const handleAddToKnow = () => {
    setIsKnows(prev => [...prev, card]);
    setHistory(prev => [...prev, { card, type: "know" }]);
    paginate(1);
    if(index === cardsOrder.length - 1) {
      handleFinish();
    }
  }


  useEffect(() => {
    console.log(knows);
  }, [knows]);

  const handleUndo = () => {
    if (!history.length) return;

    const last = history[history.length - 1];

    if (last.type === "know") {
      setIsKnows(k => k.filter(c => c.id !== last.card.id));
    }

    if (last.type === "still") {
      setIsStillLearning(s => s.filter(c => c.id !== last.card.id));
    }

    setHistory(prev => prev.slice(0, -1));
    paginate(-1);
  };


  const handleBack = () => {
    handleUndo();
    setIsFinish(false);
  }

  const handleRestart = () => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setIsStillLearning([]);
    setIsKnows([]);
    setCardsOrder(originalCards);
    setIsFinish(false);
  }
  const handleLearnUnknown = () => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setCardsOrder(prev => prev.filter(p => stillLearning.some(v => v.id === p.id)));
    setIsStillLearning([]);
    setIsKnows([]);
    setIsFinish(false);
  }

  const handleSwitch = (value: boolean) => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setIsStillLearning([]);
    setIsKnows([]);
    setIsProgressActive(value);
  }


  /* ---------------- SHUFFLE (TOGGLE MODE) ---------------- */

  const handleShuffleToggle = () => {
    setIsShuffled(prev => {
      const next = !prev;

      const answered = history.map(val => val.card);

      if (next) {
        // карточки, которые ещё НЕ отвечены
        const remaining = [...originalCards]
          .filter(card => !answered.some(a => a.id === card.id))
          .sort(() => Math.random() - 0.5);
        setCardsOrder([...answered, ...remaining]);
      } else {
        // возврат к исходному порядку, но answered остаются первыми
        const remaining = [...originalCards]
          .filter(card => !answered.some(a => a.id === card.id));

        setCardsOrder([...answered, ...remaining]);
      }

      return next;
    });
  };


  /* ---------------- AUTOPLAY ---------------- */

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (index < cardsOrder.length - 1) {
        handleAddToKnow();
      } else {
        setIsPlaying(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, index, cardsOrder.length, handleAddToKnow]);

  /* ---------------- UI ---------------- */

  return (
    <div className="mt-12">
      {/* CARD */}
      {
        isFinish? 
        <FlashcardsSummary
          knows={knows}
          stillLearning={stillLearning}
          onBack={handleBack}
          onLearnUnknown={handleLearnUnknown}
          onRestart={handleRestart}
        /> : 
        <>
          <div className="relative h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={card.id}
                custom={direction}
                initial={{
                  x: direction > 0 ? 100 : -100,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: direction > 0 ? -100 : 100,
                  opacity: 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <FlashCard front={card.question} back={card.answer} />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* CONTROLS */}
          <div className="grid grid-cols-3 items-center mt-3">
            {/* LEFT EMPTY */}
            <div className="flex gap-3 items-center">
              <div className="text-[--primary-hover-color] text-[14px] font-bold">Track Progress</div>
                <Switch
                  onChange={handleSwitch}
                  checked={isProgressActive}
                />
            </div>

            {/* CENTER NAV */}
            <FlashArrows
              index={index}
              cardsOrder={cardsOrder}
              isProgress={isProgressActive}
              handleAddToKnows={handleAddToKnow}
              handleAddToLearning={handleAddToLearning}
              handleRight={handleRight}
              handleUndo={handleUndo}
            />

            {/* RIGHT ACTIONS */}
            <FlashModes
              isPlaying={isPlaying}
              isShuffled={isShuffled}
              handleShuffleToggle={handleShuffleToggle}
              setIsPlaying={setIsPlaying}
              isProgressActive={isProgressActive}
              handleUndo={handleUndo}
              index={index}
            />
          </div>
          <FlashProgress
            cardsOrder={cardsOrder}
            index={index}
          />
        </>
      }
      {/* {"all cards"} */}
      <div className="mt-6">
        <div className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          All cards
        </div>

        <div className="flex flex-col gap-4">
          {originalCards.map((card) => (
            <div
              key={card.id}
              className="
                flex w-full bg-white
                rounded-2xl
                border border-gray-100
                shadow-sm
                hover:shadow-md
                transition-shadow
                px-6 py-5
                min-h-[120px]
              "
            >
              {/* Question */}
              <div className="w-[40%] pr-6 flex flex-col gap-2">
                <span className="text-xs font-medium text-indigo-500 uppercase">
                  Question
                </span>
                <p className="text-gray-900 font-medium leading-snug">
                  {card.question}
                </p>
              </div>

              {/* Divider */}
              <div className="w-[2px] bg-gray-300 rounded-full" /> 

              {/* Answer */}
              <div className="flex-1 pl-6 flex flex-col gap-2">
                <span className="text-xs font-medium text-emerald-500 uppercase">
                  Answer
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {card.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
