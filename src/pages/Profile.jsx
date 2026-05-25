import { useEffect, useState } from "react";

export default function Profile() {

  const [xp, setXp] =
    useState(0);

  const [streak, setStreak] =
    useState(1);

  const [completedTasks, setCompletedTasks] =
    useState(0);

  useEffect(() => {

    const savedXP =
      Number(
        localStorage.getItem("xp")
      ) || 0;

    setXp(savedXP);

    const savedTasks =
      JSON.parse(
        localStorage.getItem(
          "dailyTasks"
        )
      ) || [];

    const completed =
      savedTasks.filter(
        (task) =>
          task.completed
      ).length;

    setCompletedTasks(
      completed
    );

    const firebaseStreak =
  Number(
    localStorage.getItem(
      "firebaseStreak"
    )
  ) || 1;

setStreak(
  firebaseStreak
);

  }, []);

  const getLevel = () => {

    if (xp >= 1500)
      return "🏆 Career Master";

    if (xp >= 700)
      return "🔥 AI Warrior";

    if (xp >= 300)
      return "🚀 Builder";

    if (xp >= 100)
      return "⚡ Explorer";

    return "🌱 Beginner";
  };

  const getBadge = () => {

    if (xp >= 1500)
      return "👑 Legend Badge";

    if (xp >= 700)
      return "🏆 Warrior Badge";

    if (xp >= 300)
      return "🚀 Builder Badge";

    if (xp >= 100)
      return "⚡ Explorer Badge";

    return "🌱 Starter Badge";
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">

      {/* Heading */}

      <div className="mb-12">

        <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-4">

          👤 AI Career Profile

        </h1>

        <p className="text-gray-400 text-lg">

          Track your AI career growth journey 🚀

        </p>

      </div>

      {/* Stats Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {/* XP */}

        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-3xl p-8 shadow-lg">

          <h2 className="text-5xl font-black">

            ⚡ {xp}

          </h2>

          <p className="mt-3 text-xl font-bold">

            Total XP

          </p>

        </div>

        {/* Level */}

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-lg">

          <h2 className="text-3xl font-black">

            {getLevel()}

          </h2>

          <p className="mt-3 text-lg text-gray-100">

            Current Level

          </p>

        </div>

        {/* Badge */}

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-3xl p-8 shadow-lg">

          <h2 className="text-3xl font-black">

            {getBadge()}

          </h2>

          <p className="mt-3 text-lg font-bold">

            Achievement Badge

          </p>

        </div>

        {/* Streak */}

        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 shadow-lg">

          <h2 className="text-5xl font-black">

            🔥 {streak}

          </h2>

          <p className="mt-3 text-xl">

            Day Streak

          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

        <h2 className="text-4xl font-black text-cyan-400 mb-6">

          📈 Career Progress

        </h2>

        <div className="space-y-6">

          <div>

            <div className="flex justify-between mb-2">

              <span>
                Completed Tasks
              </span>

              <span>
                {completedTasks}
              </span>

            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">

              <div
                style={{
                  width: `${Math.min(
                    completedTasks * 10,
                    100
                  )}%`,
                }}

                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />

            </div>

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <span>
                XP Progress
              </span>

              <span>
                {xp}/1500
              </span>

            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">

              <div
                style={{
                  width: `${Math.min(
                    (xp / 1500) * 100,
                    100
                  )}%`,
                }}

                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Motivation */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-4xl font-black text-cyan-400 mb-6">

          🚀 AI Motivation

        </h2>

        <p className="text-xl text-gray-300 leading-relaxed">

          Every task you complete is building your future career.
          Stay consistent, keep learning, and your growth will compound over time 🔥

        </p>

      </div>

    </div>
  );
}