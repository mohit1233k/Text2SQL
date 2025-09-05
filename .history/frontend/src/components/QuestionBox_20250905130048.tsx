import { Send } from "lucide-react";

interface Props {
  question: string;
  setQuestion: (v: string) => void;
  loading: boolean;
  handleAsk: () => void;
}

export default function QuestionBox({
  question,
  setQuestion,
  loading,
  handleAsk,
}: Props) {
  return (
    <section className="w-full max-w-xl mx-auto px-2 sm:px-4 py-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl shadow-xl ring-1 ring-blue-900/20 transition-all duration-300">
      {/* Label */}
      <label
        htmlFor="question"
        className="block text-base font-semibold text-blue-300 mb-2 tracking-wide"
      >
        Ask a Question
      </label>
      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <input
          id="question"
          type="text"
          autoComplete="off"
          aria-label="Ask an SQL-related question"
          placeholder="e.g. Show all users who signed up in 2024"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && question.trim() && !loading) handleAsk();
          }}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-300 shadow disabled:opacity-60 disabled:cursor-not-allowed text-base"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40
                     flex items-center justify-center gap-2 font-semibold text-white shadow-lg
                     transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Ask question"
        >
          <Send
            size={20}
            className={`${loading ? "animate-spin" : ""} transition-transform`}
          />
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
        Natural language questions will be converted to SQL!
      </p>
    </section>
  );
}
