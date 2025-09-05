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
    <section className="w-full max-w-xl mx-auto px-4">
      {/* Label */}
      <label
        htmlFor="question"
        className="block text-sm font-semibold text-gray-300 mb-2"
      >
        Ask a Question
      </label>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          id="question"
          type="text"
          placeholder="e.g. Show all users who signed up in 2024"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
          className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-300 shadow-sm disabled:opacity-50"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 
                     flex items-center gap-2 font-semibold text-white shadow-lg 
                     transition-all duration-300 active:scale-95"
        >
          <Send
            size={18}
            className={`${loading ? "animate-spin" : ""} transition-transform`}
          />
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </section>
  );
}
