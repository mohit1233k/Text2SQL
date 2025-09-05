import { Database } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-4 mb-10 px-4 animate-fadeIn">
      {/* Icon */}
      <span
        className="rounded-full bg-blue-900/30 p-3 shadow-md hover:shadow-lg transition-shadow"
        tabIndex={0}
        aria-label="Database icon"
      >
        <Database 
          size={48}
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
        />
      </span>
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 drop-shadow-lg select-none">
        Text2SQL Genie
      </h1>
      {/* Subtitle */}
      <p className="text-gray-300 text-center text-base sm:text-lg max-w-xl font-medium">
        Generate SQL from natural language using <span className="text-blue-300 font-semibold">AI</span>.<br className="hidden sm:block" />
        Paste your schema, ask a question, and get instant SQL!
      </p>
    </header>
  );
}
