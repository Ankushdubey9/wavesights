import {
  LayoutDashboard,
  Users,
  Mail,
  Bell,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      icon: Users,
    },
    {
      name: "Contacts",
      icon: Mail,
    },
    {
      name: "Subscribers",
      icon: Bell,
    },
    {
      name: "Analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 bg-white/5 border-r border-white/10 backdrop-blur-xl flex flex-col justify-between">

      <div>

        <div className="p-8 border-b border-white/10">

          <h1 className="text-3xl font-black text-cyan-400">
            WaveSights
          </h1>

          <p className="text-gray-400 text-sm">
            Admin Dashboard
          </p>

        </div>

        <div className="p-5">

          {menu.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition duration-300 ${
                  active === item.name
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >

                <Icon size={22} />

                {item.name}

              </button>

            );

          })}

        </div>

      </div>

      <div className="p-5">

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-bold transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}