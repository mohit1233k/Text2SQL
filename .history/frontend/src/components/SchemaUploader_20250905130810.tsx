import { Upload } from "lucide-react";

interface Props {
  schemaText: string;
  setSchema: (v: string) => void;
  dbId: string;
  setDbId: (v: string) => void;
  dialect: string;
  setDialect: (v: string) => void;
  loading: boolean;
  handleUploadSchema: () => void;
  DIALECTS: { value: string; label: string }[];
}

export default function SchemaUploader({
  schemaText,
  setSchema,
  dbId,
  setDbId,
  dialect,
  setDialect,
  loading,
  handleUploadSchema,
  DIALECTS,
}: Props) {
  return (
    <section className="w-full max-w-xl mx-auto p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/80 rounded-2xl border border-blue-900/30 shadow-2xl ring-1 ring-blue-700/10 space-y-5 transition-all duration-300">
      {/* Schema Input */}
      <div>
        <label className="block text-base font-bold text-blue-300 mb-2" htmlFor="schema-textarea">
          Database Schema (DDL)
        </label>
        <textarea
          id="schema-textarea"
          placeholder="Paste your schema here..."
          value={schemaText}
          onChange={(e) => setSchema(e.target.value)}
          className="w-full h-40 md:h-48 p-3 rounded-xl bg-gray-800 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 
                     resize-y font-mono text-base leading-relaxed shadow transition-all duration-200 disabled:opacity-60"
          spellCheck={false}
          disabled={loading}
        />
      </div>
      {/* Options Row */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* DB ID */}
        <input
          value={dbId}
          onChange={(e) => setDbId(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 text-base shadow"
          placeholder="Database ID"
          disabled={loading}
          aria-label="Database ID"
        />
        {/* Dialect Selector */}
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 text-base shadow cursor-pointer"
          disabled={loading}
          aria-label="SQL Dialect"
        >
          {DIALECTS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        {/* Upload Button */}
        <button
  type="button"
  onClick={handleUploadSchema}
  disabled={loading}
  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl 
              font-bold shadow-lg w-full md:w-auto
              focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors
              ${loading 
                ? "bg-gray-700 text-gray-300 cursor-wait opacity-70" 
                : "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white"
              }`}
  aria-label="Upload schema"
>
  <Upload size={20} className={loading ? "animate-spin" : ""} />
  {loading ? "Uploading..." : "Upload Schema"}
</button>


      </div>
      <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
        Paste your DDL (CREATE TABLE statements) above and upload for context-aware SQL generation.
      </p>
    </section>
  );
}
