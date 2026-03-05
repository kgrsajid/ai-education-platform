import { useState, type FC } from 'react';
import type { TChat } from '../../api/session/type';

type ContentPart =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; lang: string };

const parseContent = (raw: string): ContentPart[] => {
  const parts: ContentPart[] = [];
  const regex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: raw.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', lang: match[1] || 'code', content: match[2].trimEnd() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < raw.length) {
    parts.push({ type: 'text', content: raw.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: raw }];
};

const CodeBlock: FC<{ lang: string; content: string }> = ({ lang, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3 bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
        <span className="text-xs text-slate-400">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'check' : 'content_copy'}
          </span>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-emerald-400 text-sm overflow-x-auto">
        <code>{content}</code>
      </pre>
    </div>
  );
};

type Props = {
  message: TChat;
};

export const ChatMessage: FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  const parts = parseContent(message.content);

  if (isUser) {
    return (
      <div className="flex gap-4 max-w-4xl ml-auto flex-row-reverse">
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
          <span className="material-symbols-outlined text-primary text-sm">person</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-bold text-white">You</span>
          <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/10 max-w-2xl">
            <p className="leading-relaxed text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 max-w-4xl">
      <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 shadow-xl">
        <span className="material-symbols-outlined text-primary">smart_toy</span>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-sm font-bold text-white">EduAI Assistant</span>
        <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-2xl rounded-tl-none max-w-2xl">
          {parts.map((part, i) =>
            part.type === 'code' ? (
              <CodeBlock key={i} lang={part.lang} content={part.content} />
            ) : (
              <p key={i} className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                {part.content}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
