export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-5 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-2 sm:flex-row items-center justify-between">
        {/* Branding */}
        <p className="text-center sm:text-left text-xs sm:text-sm text-gray-400 flex items-center gap-1">
          Powered by
          <span
            tabIndex={0}
            className="font-bold text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors duration-200 cursor-pointer"
            aria-label="Text2SQL Genie Home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Text2SQL Genie
          </span>
        </p>
        {/* Tagline */}
        <p className="text-center sm:text-right text-[11px] sm:text-xs text-gray-500">
          Modern LLM SQL Assistant
        </p>
      </div>
    </footer>
  );
}
