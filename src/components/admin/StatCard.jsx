import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
    >
      {/* Glow */}

      <div
        className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl opacity-20 ${color}`}
      ></div>

      {/* Top */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            {value}
          </h2>

        </div>

        <div
          className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl ${color}`}
        >
          {icon}
        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">

          <ArrowUpRight size={16} />

          {change}

        </div>

        <span className="text-gray-500 text-sm">
          Last 30 days
        </span>

      </div>
    </div>
  );
}