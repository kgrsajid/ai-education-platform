export const ChatTypingIndicator = () => (
  <div className="flex gap-4 max-w-4xl">
    <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
      <span className="material-symbols-outlined text-primary">smart_toy</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-white">EduAI Assistant</span>
      <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-2xl rounded-tl-none">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2 rounded-full bg-slate-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
