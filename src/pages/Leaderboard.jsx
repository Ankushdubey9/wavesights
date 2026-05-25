import { useEffect, useState } from "react";

export default function Leaderboard() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    const currentXP =
      Number(
        localStorage.getItem("xp")
      ) || 0;

    const currentStreak =
      Number(
        localStorage.getItem(
          "firebaseStreak"
        )
      ) || 1;

    const demoUsers = [

      {
        name: "Ankush",
        xp: currentXP,
        streak: currentStreak,
      },

      {
        name: "Rahul",
        xp: 540,
        streak: 12,
      },

      {
        name: "Priya",
        xp: 430,
        streak: 8,
      },

      {
        name: "Aman",
        xp: 380,
        streak: 6,
      },

      {
        name: "Sneha",
        xp: 310,
        streak: 5,
      },
    ];

    const sortedUsers =
      demoUsers.sort(
        (a, b) =>
          b.xp - a.xp
      );

    setUsers(sortedUsers);

  }, []);

  const getRankColor = (index) => {

    if (index === 0)
      return "from-yellow-400 to-orange-500";

    if (index === 1)
      return "from-gray-300 to-gray-500";

    if (index === 2)
      return "from-orange-400 to-yellow-700";

    return "from-cyan-400 to-blue-500";
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">

      {/* Heading */}

      <div className="mb-12">

        <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-4">

          🏆 Leaderboard

        </h1>

        <p className="text-gray-400 text-lg">

          Compete with top AI learners 🚀

        </p>

      </div>

      {/* Top 3 */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {users.slice(0, 3).map(
          (user, index) => (

            <div
              key={index}

              className={`bg-gradient-to-r ${getRankColor(index)} rounded-3xl p-8 shadow-lg text-black`}
            >

              <div className="text-6xl mb-4">

                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : "🥉"}

              </div>

              <h2 className="text-4xl font-black mb-3">

                {user.name}

              </h2>

              <p className="text-2xl font-bold mb-2">

                ⚡ {user.xp} XP

              </p>

              <p className="text-xl font-bold">

                🔥 {user.streak} Day Streak

              </p>

            </div>
          )
        )}

      </div>

      {/* Full Leaderboard */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-4xl font-black text-cyan-400 mb-8">

          🌍 Global Rankings

        </h2>

        <div className="space-y-5">

          {users.map(
            (user, index) => (

              <div
                key={index}

                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
              >

                <div className="flex items-center gap-5">

                  <div className="text-3xl font-black text-cyan-400">

                    #{index + 1}

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold">

                      {user.name}

                    </h3>

                    <p className="text-gray-400">

                      AI Career Learner

                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap gap-4">

                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-5 py-3 rounded-2xl font-bold">

                    ⚡ {user.xp} XP

                  </div>

                  <div className="bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 rounded-2xl font-bold">

                    🔥 {user.streak} Streak

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}