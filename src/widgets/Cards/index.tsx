// 🧠 Quizlet Flashcards App
// Tech Stack: React + TypeScript + Ant Design

import React, { useState } from 'react';
import { Button, Card, Modal, Input, Typography, Space, message } from 'antd';

const { Title, Text } = Typography;

// ===================== TYPES =====================
interface Flashcard {
  id: number;
  term: string;
  definition: string;
}

type Mode = 'flashcards' | 'learn' | 'test';

// ===================== COMPONENTS =====================
const FlashcardView: React.FC<{ card: Flashcard }> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      hoverable
      onClick={() => setFlipped(!flipped)}
      style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Title level={4} style={{ textAlign: 'center', color: '#2563eb' }}>
        {flipped ? card.definition : card.term}
      </Title>
    </Card>
  );
};

const LearnMode: React.FC<{ cards: Flashcard[]; onComplete: () => void }> = ({ cards, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const current = cards[index];

  const check = () => {
    if (input.trim().toLowerCase() === current.definition.toLowerCase()) {
      setResult('success');
    } else {
      setResult('error');
    }
  };

  const next = () => {
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setInput('');
      setResult(null);
    } else {
      onComplete();
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <Title level={3}>Learn Mode</Title>
      <Text strong>{current.term}</Text>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer"
        style={{ marginTop: 16 }}
      />
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={check}>Check</Button>
        <Button onClick={next}>Next</Button>
      </Space>
      {result === 'success' && <Text type="success">Correct!</Text>}
      {result === 'error' && (
        <Text type="danger">Wrong. Correct answer: {current.definition}</Text>
      )}
    </Card>
  );
};

const TestMode: React.FC<{ cards: Flashcard[]; onComplete: () => void }> = ({ cards, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const current = cards[index];
  const options = [...cards.map((c) => c.definition)].sort(() => Math.random() - 0.5);

  const choose = (opt: string) => {
    setSelected(opt);
    if (opt === current.definition) setScore((s) => s + 1);
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
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>Test Mode</Title>
      <Text strong>{current.term}</Text>
      <Space direction="vertical" style={{ marginTop: 16, width: '100%' }}>
        {options.map((opt) => (
          <Button
            key={opt}
            block
            type={selected === opt ? (opt === current.definition ? 'primary' : 'default') : 'default'}
            danger={selected === opt && opt !== current.definition}
            onClick={() => choose(opt)}
          >
            {opt}
          </Button>
        ))}
      </Space>
      <Button onClick={next} style={{ marginTop: 16 }}>Next</Button>
      <Text type="secondary">Score: {score}</Text>
    </Card>
  );
};

// ===================== MAIN APP =====================
const QuizletFlashcardsApp: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([
    { id: 1, term: 'React', definition: 'A JavaScript library for building UIs' },
    { id: 2, term: 'TypeScript', definition: 'A typed superset of JavaScript' },
    { id: 3, term: 'Tailwind', definition: 'A utility-first CSS framework' },
  ]);
  const [mode, setMode] = useState<Mode>('flashcards');
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const addCard = () => {
    if (!term || !definition) return;

    setCards([...cards, { id: Date.now(), term, definition }]);
    setTerm('');
    setDefinition('');
    setOpen(false);
    message.success('Card added');
  };

  return (
    <div style={{ minHeight: '100vh', padding: 32, background: '#eff6ff' }}>
      <Title style={{ textAlign: 'center', color: '#2563eb' }}>Quizlet Flashcards</Title>

      <Space style={{ justifyContent: 'center', width: '100%', marginBottom: 32 }}>
        {(['flashcards', 'learn', 'test'] as Mode[]).map((m) => (
          <Button
            key={m}
            type={mode === m ? 'primary' : 'default'}
            onClick={() => setMode(m)}
          >
            {m.toUpperCase()}
          </Button>
        ))}
      </Space>

      {mode === 'flashcards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {cards.map((card) => (
            <FlashcardView key={card.id} card={card} />
          ))}
        </div>
      )}

      {mode === 'learn' && (
        <LearnMode cards={cards} onComplete={() => message.success('Learn complete')} />
      )}

      {mode === 'test' && (
        <TestMode cards={cards} onComplete={() => message.success('Test complete')} />
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add New Card
        </Button>
      </div>

      <Modal
        title="Add Flashcard"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={addCard}
        okText="Add"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Term" value={term} onChange={(e) => setTerm(e.target.value)} />
          <Input placeholder="Definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        </Space>
      </Modal>
    </div>
  );
};

export default QuizletFlashcardsApp;
