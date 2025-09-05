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
    <section>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Ask a Question
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Show all users who signed up in 2024"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 font-semibold text-white shadow"
        >
          <Send size={18} /> {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </section>
  );
}