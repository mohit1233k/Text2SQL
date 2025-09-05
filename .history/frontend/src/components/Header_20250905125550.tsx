import { Database } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-3 mb-6 px-4 animate-fadeIn">
      {/* Icon */}
      <Database
        size={40}
        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
      />
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
        Text2SQL Genie
      </h1>
      {/* Subtitle */}
      <p className="text-gray-400 text-center text-sm sm:text-base max-w-xl">
        Generate SQL from natural language using AI.<br className="hidden sm:block" />
        Paste your schema, ask a question, and get instant SQL!
      </p>
    </header>
  );
}
