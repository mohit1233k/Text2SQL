export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Branding */}
        <p className="text-center sm:text-left text-xs sm:text-sm text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
            Text2SQL Genie
          </span>
        </p>
        {/* Tagline */}
        <p className="text-center sm:text-right text-[10px] sm:text-xs text-gray-500">
          Modern LLM SQL Assistant
        </p>
      </div>
    </footer>
  );
}
