export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 py-4 mt-8">
      <p className="text-center text-sm text-gray-400">
        Powered by{" "}
        <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
          Text2SQL Genie
        </span>{" "}
        &mdash; Modern LLM SQL Assistant
      </p>
    </footer>
  );
}
