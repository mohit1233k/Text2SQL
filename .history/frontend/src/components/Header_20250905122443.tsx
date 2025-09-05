import { Database } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-2 mb-4">
      <Database size={36} className="text-blue-400" />
      <h1 className="text-3xl font-extrabold text-white tracking-tight text-center">
        Text2SQL Genie
      </h1>
      <p className="text-gray-400 text-center text-sm max-w-md">
        Generate SQL from natural language using AI. Paste your schema, ask a
        question, and get instant SQL!
      </p>
    </header>
  );
}