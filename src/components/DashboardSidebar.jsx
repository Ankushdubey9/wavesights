import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {

  const location = useLocation();

  const menus = [

    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },

    {
      title: "AI Roadmap",
      path: "/ai-roadmap",
      icon: "🧭",
    },

    {
      title: "AI Chat",
      path: "/ai-chat",
      icon: "🤖",
    },

    {
      title: "Resume Analyzer",
      path: "/resume-analyzer",
      icon: "📄",
    },

    {
      title: "Mock Interview",
      path: "/mock-interview",
      icon: "🎤",
    },

    {
      title: "Leaderboard",
      path: "/leaderboard",
      icon: "🏆",
    },

    {
      title: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (

    <div className="w-[280px] min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-2xl p-6 flex flex-col justify-between">

      {/* Top */}

      <div>

        {/* Logo */}

        <div className="flex items-center gap-3 mb-12">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">

            🚀

          </div>

          <div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              WaveSights

            </h1>

            <p className="text-gray-400 text-sm">

              AI Career Platform

            </p>

          </div>

        </div>

        {/* User */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center gap-4 mb-10">

          <img
            src={localStorage.getItem("photo")}
            alt="profile"
            className="w-14 h-14 rounded-full border border-cyan-400/20"
          />

          <div>

            <h3 className="font-bold text-lg">

              {localStorage.getItem("name")}

            </h3>

            <p className="text-gray-400 text-sm">

              AI Learner

            </p>

          </div>

        </div>

        {/* Menu */}

        <div className="space-y-3">

          {menus.map((item, index) => (

            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-semibold transition duration-300

              ${
                location.pathname === item.path

                  ? "bg-cyan-500 text-black shadow-xl shadow-cyan-500/20"

                  : "bg-white/5 border border-white/5 hover:border-cyan-400/20 hover:bg-cyan-500/10 text-white"
              }`}
            >

              <span className="text-2xl">

                {item.icon}

              </span>

              {item.title}

            </Link>

          ))}

        </div>

      </div>

      {/* Bottom */}

      <button

        onClick={() => {

          localStorage.clear();

          window.location.href = "/";

        }}

        className="w-full bg-red-500/10 border border-red-400/20 hover:bg-red-500 hover:text-white text-red-300 py-4 rounded-2xl font-bold transition duration-300"
      >

        Logout

      </button>

    </div>
  );
}