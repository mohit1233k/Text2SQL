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
      console.error("Failed to copy:", err);
    }
  };

  return (
    <AnimatePresence>
      {response && (
        <motion.div
          className="mt-4 p-5 bg-gray-900 rounded-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
        >
          {response.error ? (
            <div className="flex items-center gap-2 text-red-400 font-medium">
              <AlertCircle size={18} />
              <span>{response.error}</span>
            </div>
          ) : response.sql ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-blue-300 text-lg">
                  Generated SQL
                </h2>
                <button
                  onClick={() => handleCopy(response.sql)}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md 
                             bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} className="text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <pre
                className="bg-black/40 p-4 rounded-lg text-green-300 text-sm overflow-x-auto 
                           font-mono whitespace-pre-wrap break-words border border-gray-700"
              >
                {response.sql}
              </pre>

              <p className="text-xs text-gray-400 mt-3">
                <span className="font-medium">Dialect:</span> {response.dialect} |{" "}
                <span className="font-medium">Context Chunks:</span>{" "}
                {response.contextChunks}
              </p>
            </>
          ) : (
            <p className="text-green-400">{response.message}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
