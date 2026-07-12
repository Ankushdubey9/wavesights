import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full md:w-96">

      {/* Search Icon */}

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          bg-white/5
          border
          border-white/10
          rounded-2xl
          py-3
          pl-12
          pr-12
          text-white
          placeholder:text-gray-500
          outline-none
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-400/20
          transition-all
        "
      />

      {/* Clear Button */}

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}