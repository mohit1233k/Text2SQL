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
    <section>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Database Schema (DDL)
      </label>
      <textarea
        placeholder="Paste your schema here..."
        value={schemaText}
        onChange={(e) => setSchema(e.target.value)}
        className="w-full h-32 md:h-40 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 resize-none"
        disabled={loading}
      />
      <div className="flex flex-col gap-3 mt-3 md:flex-row md:items-center">
        <input
          value={dbId}
          onChange={(e) => setDbId(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          placeholder="Database ID"
          disabled={loading}
        />
        <select
          value={dialect}
          onChange={(e) => setDialect(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 font-semibold text-white shadow w-full md:w-auto"
        >
          <Upload size={18} /> {loading ? "Uploading..." : "Upload Schema"}
        </button>
      </div>
    </section>
  );
}