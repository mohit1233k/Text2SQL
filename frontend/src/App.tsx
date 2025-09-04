import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Database, Upload, Send } from "lucide-react";

export default function App() {
  const [userId] = useState("user-" + Math.floor(Math.random() * 1000)); // generate unique user id
  const [dbId, setDbId] = useState("db1");
  const [dialect, setDialect] = useState("postgres");
  const [schema, setSchema] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [schemaUploaded, setSchemaUploaded] = useState(false);

  // Upload schema
  async function handleUploadSchema() {
    if (!schema.trim()) {
      alert("Please paste your schema first!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8787/schema/upsert", {
        userId,
        dbId,
        dialect,
        schema,
      },
    {
      headers: {
        "x-api-key": "keepitsecret",
      }}
    );
      setSchemaUploaded(true);
      setResponse({ message: "Schema ingested successfully ✅" });
    } catch (err: any) {
      setResponse(err.response?.data ?? { error: "Schema upload failed ❌" });
    } finally {
      setLoading(false);
    }
  }

  // Ask question
  async function handleAsk() {
    if (!schemaUploaded) {
      alert("Please upload schema first!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8787/generate/sql", {
        userId,
        dbId,
        question,
        dialect,
      });
      setResponse(res.data);
    } catch (err: any) {
      setResponse(err.response?.data ?? { error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 p-5 border-r border-gray-800">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Database size={20} /> SQL Genie
        </h1>
        <div className="space-y-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">User</p>
            <p className="font-medium">{userId}</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">Database ID</p>
            <input
              value={dbId}
              onChange={(e) => setDbId(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none"
            />
          </div>
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">Dialect</p>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value)}
              className="w-full bg-gray-700 p-1 rounded"
            >
              <option value="postgres">Postgres</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col p-6">
        {/* Schema Upload */}
        <section className="mb-6">
          <textarea
            placeholder="Paste your schema here..."
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            className="w-full h-40 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUploadSchema}
            disabled={loading}
            className="mt-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Upload size={16} /> {loading ? "Uploading..." : "Upload Schema"}
          </button>
        </section>

        {/* Question Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask me something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={16} /> {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* Output */}
        {response && (
          <motion.div
            className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {response.error ? (
              <p className="text-red-400">{response.error}</p>
            ) : response.sql ? (
              <>
                <h2 className="font-semibold mb-2">Generated SQL:</h2>
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
      </main>
    </div>
  );
}
