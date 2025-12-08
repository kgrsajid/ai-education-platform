// 🧠 Quizlet Flashcards App (Enhanced Design + Modular Components)
// Tech Stack: React + TypeScript + Tailwind + PrimeReact

import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// ===================== TYPES =====================
interface Flashcard {
  id: number;
  term: string;
  definition: string;
  correct?: boolean;
  seen?: boolean;
}

type Mode = "flashcards" | "learn" | "test" | "match" | "autoplay";

// ===================== COMPONENTS =====================
const FlashcardView: React.FC<{ card: Flashcard }> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer w-full h-64 flex items-center justify-center bg-white border border-indigo-200 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 overflow-hidden"
    >
      <div className="text-center text-2xl font-semibold text-indigo-700 px-4">
        {flipped ? card.definition : card.term}
      </div>
    </div>
  );
};

const LearnMode: React.FC<{ cards: Flashcard[]; onComplete: () => void }> = ({ cards, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);

  const current = cards[index];

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === current.definition.toLowerCase()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const next = () => {
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setInput("");
      setCorrect(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">Learn Mode</h2>
      <div className="text-xl font-medium mb-4">{current.term}</div>
      <InputText
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
        className="w-full max-w-sm"
      />
      <div className="flex gap-4 mt-6">
        <Button label="Check" onClick={checkAnswer} />
        <Button label="Next" severity="secondary" onClick={next} />
      </div>
      {correct === true && <p className="text-green-500 mt-3">Correct!</p>}
      {correct === false && <p className="text-red-500 mt-3">Wrong! Correct answer: {current.definition}</p>}
    </div>
  );
};

const TestMode: React.FC<{ cards: Flashcard[]; onComplete: () => void }> = ({ cards, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const options = [...cards.map((c) => c.definition)].sort(() => Math.random() - 0.5);
    setShuffledOptions(options);
  }, [index]);

  const current = cards[index];

  const checkAnswer = (ans: string) => {
    setSelected(ans);
    if (ans === current.definition) setScore((prev) => prev + 1);
  };

  const next = () => {
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">Test Mode</h2>
      <div className="text-xl font-medium mb-4">{current.term}</div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {shuffledOptions.map((opt) => (
          <Button
            key={opt}
            label={opt}
            onClick={() => checkAnswer(opt)}
            className={`$${selected === opt ? (opt === current.definition ? "bg-green-400" : "bg-red-400") : "bg-indigo-50 text-indigo-700"}`}
          />
        ))}
      </div>
      <Button label="Next" onClick={next} className="mt-4" />
      <p className="text-gray-500 text-sm mt-3">Score: {score}</p>
    </div>
  );
};

// ===================== MAIN APP =====================
export const QuizletFlashcardsApp: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([
    { id: 1, term: "React", definition: "A JavaScript library for building UIs" },
    { id: 2, term: "TypeScript", definition: "A typed superset of JavaScript" },
    { id: 3, term: "Tailwind", definition: "A utility-first CSS framework" },
  ]);
  const [mode, setMode] = useState<Mode>("flashcards");
  const [visible, setVisible] = useState(false);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const toast = useRef<Toast>(null);

  const addCard = () => {
    if (term && definition) {
      setCards([...cards, { id: Date.now(), term, definition }]);
      setTerm("");
      setDefinition("");
      setVisible(false);
      toast.current?.show({ severity: "success", summary: "Card added" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex flex-col items-center p-8">
      <Toast ref={toast} />
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-10 drop-shadow-sm">Quizlet Flashcards</h1>

      {/* Mode Selection */}
      <div className="flex gap-4 flex-wrap justify-center mb-8">
        {(["flashcards", "learn", "test"] as Mode[]).map((m) => (
          <Button
            key={m}
            label={m.toUpperCase()}
            onClick={() => setMode(m)}
            className={`${mode === m ? "bg-indigo-500 text-white" : "bg-white text-indigo-600 border border-indigo-200"} px-5 py-2 rounded-full shadow-md hover:shadow-lg transition`}
          />
        ))}
      </div>

      {/* Render Modes */}
      <div className="w-full max-w-3xl">
        {mode === "flashcards" && (
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <FlashcardView key={card.id} card={card} />
            ))}
          </div>
        )}
        {mode === "learn" && <LearnMode cards={cards} onComplete={() => toast.current?.show({ severity: "success", summary: "Learn complete!" })} />}
        {mode === "test" && <TestMode cards={cards} onComplete={() => toast.current?.show({ severity: "success", summary: "Test complete!" })} />}
      </div>

      {/* Add Card Button */}
      <Button
        label="Add New Card"
        icon="pi pi-plus"
        className="mt-10 bg-indigo-500 text-white hover:bg-indigo-600"
        onClick={() => setVisible(true)}
      />

      {/* Add Card Modal */}
      <Dialog header="Add Flashcard" visible={visible} style={{ width: "30rem" }} onHide={() => setVisible(false)}>
        <div className="flex flex-col gap-4">
          <InputText placeholder="Term" value={term} onChange={(e) => setTerm(e.target.value)} />
          <InputText placeholder="Definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
          <Button label="Add" className="bg-indigo-500 text-white hover:bg-indigo-600" onClick={addCard} />
        </div>
      </Dialog>
    </div>
  );
};

export default QuizletFlashcardsApp;