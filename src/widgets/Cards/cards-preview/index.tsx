import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TCardResponse } from "../../../features/api/card/type";
import { FlashCard } from "../../../features/card/flash-card";
import { Switch } from "antd";
import { FlashArrows } from "../../../features/card/flash-arrows";
import { FlashModes } from "../../../features/card/flash-modes";
import { FlashProgress } from "../../../features/card/flash-progress";
import { FlashcardsSummary } from "../../../features/card/flash-summary";
import { useTranslation } from "react-i18next";

type Props = {
  cards: TCardResponse[];
};

type Action = {
  card: TCardResponse;
  type: "know" | "still";
};

export const FlashcardsPreview = ({ cards }: Props) => {
  const { t } = useTranslation();
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

  const paginate = (newDirection: number) => {
    setState(([i]) => {
      const nextIndex = i + newDirection;
      if (nextIndex < 0 || nextIndex > cardsOrder.length) return [i, 0];
      return [nextIndex, newDirection];
    });
  };

  const card = cardsOrder[index];

  const handleFinish = () => setIsFinish(true);

  const handleRight = () => {
    setIsKnows((prev) => [...prev, card]);
    setHistory((prev) => [...prev, { card, type: "know" }]);
    paginate(1);
    if (index === cardsOrder.length - 1) handleFinish();
  };

  const handleAddToLearning = () => {
    setIsStillLearning((prev) => [...prev, card]);
    setHistory((prev) => [...prev, { card, type: "still" }]);
    paginate(1);
    if (index === cardsOrder.length - 1) handleFinish();
  };

  const handleAddToKnow = () => {
    setIsKnows((prev) => [...prev, card]);
    setHistory((prev) => [...prev, { card, type: "know" }]);
    paginate(1);
    if (index === cardsOrder.length - 1) handleFinish();
  };

  const handleUndo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    if (last.type === "know") setIsKnows((k) => k.filter((c) => c.id !== last.card.id));
    if (last.type === "still") setIsStillLearning((s) => s.filter((c) => c.id !== last.card.id));
    setHistory((prev) => prev.slice(0, -1));
    paginate(-1);
  };

  const handleBack = () => {
    handleUndo();
    setIsFinish(false);
  };

  const handleRestart = () => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setIsStillLearning([]);
    setIsKnows([]);
    setCardsOrder(originalCards);
    setIsFinish(false);
  };

  const handleLearnUnknown = () => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setCardsOrder((prev) => prev.filter((p) => stillLearning.some((v) => v.id === p.id)));
    setIsStillLearning([]);
    setIsKnows([]);
    setIsFinish(false);
  };

  const handleSwitch = (value: boolean) => {
    setIsShuffled(false);
    setIsPlaying(false);
    setState([0, 0]);
    setHistory([]);
    setIsStillLearning([]);
    setIsKnows([]);
    setIsProgressActive(value);
  };

  const handleShuffleToggle = () => {
    setIsShuffled((prev) => {
      const next = !prev;
      const answered = history.map((val) => val.card);
      if (next) {
        const remaining = [...originalCards]
          .filter((card) => !answered.some((a) => a.id === card.id))
          .sort(() => Math.random() - 0.5);
        setCardsOrder([...answered, ...remaining]);
      } else {
        const remaining = [...originalCards].filter(
          (card) => !answered.some((a) => a.id === card.id)
        );
        setCardsOrder([...answered, ...remaining]);
      }
      return next;
    });
  };

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
  }, [isPlaying, index, cardsOrder.length]);

  return (
    <div>
      {/* Flashcard viewer */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
        {isFinish ? (
          <FlashcardsSummary
            knows={knows}
            stillLearning={stillLearning}
            onBack={handleBack}
            onLearnUnknown={handleLearnUnknown}
            onRestart={handleRestart}
          />
        ) : (
          <>
            {/* Card */}
            <div className="relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={card.id}
                  custom={direction}
                  initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <FlashCard front={card.question} back={card.answer} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls row */}
            <div className="grid grid-cols-3 items-center mt-5">
              {/* Track progress toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">{t('card.phrases.flashcard.trackProgress')}</span>
                <Switch
                  size="small"
                  onChange={handleSwitch}
                  checked={isProgressActive}
                  style={isProgressActive ? { background: "#1152d4" } : {}}
                />
              </div>

              {/* Navigation */}
              <FlashArrows
                index={index}
                cardsOrder={cardsOrder}
                isProgress={isProgressActive}
                handleAddToKnows={handleAddToKnow}
                handleAddToLearning={handleAddToLearning}
                handleRight={handleRight}
                handleUndo={handleUndo}
              />

              {/* Mode buttons */}
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

            {/* Progress bar */}
            <FlashProgress cardsOrder={cardsOrder} index={index} />
          </>
        )}
      </div>

      {/* All cards list */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-slate-500" style={{ fontSize: "1rem" }}>
            list
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            {t('card.phrases.detailPage.allCards')} ({originalCards.length})
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {originalCards.map((card, i) => (
            <div
              key={card.id}
              className="flex w-full bg-slate-900/50 border border-slate-800 rounded-xl
                         px-6 py-5 min-h-[100px] hover:border-slate-700 transition-colors"
            >
              {/* Index */}
              <div className="w-8 flex-shrink-0 flex items-center">
                <span className="text-xs font-bold text-slate-600">{i + 1}</span>
              </div>

              {/* Question */}
              <div className="w-[40%] pr-6 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#1152d4] uppercase tracking-widest">
                  {t('card.phrases.createPage.question')}
                </span>
                <p className="text-slate-200 text-sm font-medium leading-snug">
                  {card.question}
                </p>
              </div>

              {/* Divider */}
              <div className="w-px bg-slate-800 mx-2 self-stretch" />

              {/* Answer */}
              <div className="flex-1 pl-6 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  {t('card.phrases.createPage.answer')}
                </span>
                <p className="text-slate-400 text-sm leading-relaxed">{card.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
