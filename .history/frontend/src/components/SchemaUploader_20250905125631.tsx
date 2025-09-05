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
    <section className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg space-y-4">
      {/* Schema Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Database Schema (DDL)
        </label>
        <textarea
          placeholder="Paste your schema here..."
          value={schemaText}
          onChange={(e) => setSchema(e.target.value)}
          className="w-full h-40 md:h-48 p-3 rounded-lg bg-gray-800 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 
                     resize-y font-mono text-sm leading-relaxed"
          disabled={loading}
        />
      </div>
      {/* Options Row */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={dbId}
          onChange={(e) => setDbId(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          placeholder="Database ID"
          disabled={loading}
        />
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          disabled={loading}
        >
          {DIALECTS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleUploadSchema}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg 
                     bg-green-600 hover:bg-green-700 transition-colors 
                     disabled:opacity-50 font-semibold text-white shadow w-full md:w-auto"
        >
          <Upload size={18} />
          {loading ? "Uploading..." : "Upload Schema"}
        </button>
      </div>
    </section>
  );
}
