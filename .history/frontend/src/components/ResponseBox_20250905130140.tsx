import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  response: any;
}

export default function ResponseBox({ response }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Optionally, show error notification or toast here
      console.error("Failed to copy:", err);
    }
  };

  return (
    <AnimatePresence>
      {response && (
        <motion.div
          className="w-full max-w-2xl mx-auto mt-6 p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/80
                     rounded-2xl border border-blue-900/30 shadow-2xl ring-1 ring-blue-700/10
                     transition-all"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.35 }}
        >
          {response.error ? (
            <div className="flex items-center gap-2 text-red-400 font-semibold text-base">
              <AlertCircle size={20} />
              <span>{response.error}</span>
            </div>
          ) : response.sql ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-blue-300 text-lg tracking-wide drop-shadow">
                  Generated SQL
                </h2>
                <button
                  type="button"
                  aria-label="Copy SQL to clipboard"
                  onClick={() => handleCopy(response.sql)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg
                              ${copied
                                ? 'bg-green-900/70 text-green-300 font-bold'
                                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}
                              focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={15} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre
                className="bg-black/50 p-4 rounded-lg text-green-300 text-[15px] overflow-x-auto
                           font-mono whitespace-pre-wrap break-words border border-gray-800 min-h-[48px] select-all"
                tabIndex={0}
                aria-label="Generated SQL code"
              >
                {response.sql}
              </pre>
              <p className="text-xs text-gray-400 mt-4 flex flex-wrap gap-4">
                <span>
                  <span className="font-semibold text-gray-300">Dialect:</span> {response.dialect}
                </span>
                <span>
                  <span className="font-semibold text-gray-300">Context Chunks:</span> {response.contextChunks}
                </span>
              </p>
            </>
          ) : (
            <p className="text-green-400 font-medium text-base">{response.message}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
