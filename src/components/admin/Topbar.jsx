import {
  Bell,
  RefreshCw,
  Search,
} from "lucide-react";

export default function Topbar({
  search,
  setSearch,
  refreshData,
}) {
  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-black text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Admin 👋
        </p>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-3 outline-none text-white w-72 focus:border-cyan-400"
          />

        </div>

        {/* Refresh */}

        <button
          onClick={refreshData}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition"
        >

          <RefreshCw size={20} />

        </button>

        {/* Notification */}

        <button
          className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition"
        >

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-black text-black text-xl">

            A

          </div>

          <div>

            <p className="font-bold">
              Ankush
            </p>

            <p className="text-xs text-gray-400">
              {today}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}