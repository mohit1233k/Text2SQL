import { motion, AnimatePresence } from "framer-motion";

interface Props {
  response: any;
}

export default function ResponseBox({ response }: Props) {
  return (
    <AnimatePresence>
      {response && (
        <motion.div
          className="mt-2 p-4 bg-gray-900 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {response.error ? (
            <p className="text-red-400 font-semibold">{response.error}</p>
          ) : response.sql ? (
            <>
              <h2 className="font-semibold mb-2 text-blue-300">
                Generated SQL:
              </h2>
              <pre className="bg-black/40 p-3 rounded-md text-green-300 text-sm overflow-x-auto">
                {response.sql}
              </pre>
              <p className="text-xs text-gray-400 mt-2">
                Dialect: {response.dialect} | Context Chunks:{" "}
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