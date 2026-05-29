import { useEffect, useState } from "react";

import axios from "axios";

export default function DailyAITasks() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [xp, setXp] = useState(Number(localStorage.getItem("xp")) || 0);

  const getLevel = () => {
    if (xp >= 1500) return "🏆 Career Master";

    if (xp >= 700) return "🔥 AI Warrior";

    if (xp >= 300) return "🚀 Builder";

    if (xp >= 100) return "⚡ Explorer";

    return "🌱 Beginner";
  };

  const getBadge = () => {
    if (xp >= 1500) return "👑 Legend Badge";

    if (xp >= 700) return "🏆 Warrior Badge";

    if (xp >= 300) return "🚀 Builder Badge";

    if (xp >= 100) return "⚡ Explorer Badge";

    return "🌱 Starter Badge";
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("dailyTasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      generateTasks();
    }
  }, []);

  const generateTasks = async () => {
    setLoading(true);

    try {
      const interest = localStorage.getItem("interest") || "";

      const goal = localStorage.getItem("goal") || "";

      const skillLevel = localStorage.getItem("skillLevel") || "";

      const stream = localStorage.getItem("educationStream") || "";
      const timeCommitment =
  localStorage.getItem("timeCommitment") || "";

   const prompt = `
You are WaveSights AI, an elite career coach, hiring manager, productivity mentor, and industry expert.

Your goal is to help the user make measurable career progress TODAY.

User Profile:
- Background: ${stream}
- Interest: ${interest}
- Goal: ${goal}
- Skill Level: ${skillLevel}
- Daily Available Time: ${timeCommitment}

TASK GENERATION RULES:

1. Generate EXACTLY 5 personalized tasks.
2. Tasks must directly help the user move closer to their career goal.
3. Prioritize high-impact activities over generic advice.
4. Consider the user's skill level.
5. Mix learning, portfolio building, networking, job preparation, and practical execution.
6. Every task must be achievable in a single day.
7. Avoid vague tasks like:
   - Learn AI
   - Study Programming
   - Improve Skills
8. Prefer specific tasks like:
   - Build a landing page using React and deploy it on Vercel
   - Solve 3 medium DSA problems on arrays
   - Optimize LinkedIn headline for AI Engineer roles
9. Tasks should feel like they were created by a professional career mentor.
10. No repeated tasks.

OUTPUT RULES:
- Return ONLY the 5 tasks.
- One task per line.
- No introduction.
- No headings.
- No numbering.
- No bullet points.
- No explanations.
- Maximum 15 words per task.

Generate the tasks now.
`;
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-3-8b-instruct",

          messages: [
            {
              role: "system",

              content: "You are an AI productivity coach.",
            },

            {
              role: "user",

              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",
          },
        },
      );

      const text = response.data.choices[0].message.content;

   const taskArray = text
  .split("\n")
  .map((task) => task.trim())
  .filter((task) => task.length > 0)
  .filter(
    (task) =>
      !task.toLowerCase().includes("here are") &&
      !task.toLowerCase().includes("personalized daily career tasks")
  );

      const formattedTasks = taskArray.map((task, index) => ({
        text: task,

        completed: false,

        xp: index < 2 ? 25 : 10,
      }));

      setTasks(formattedTasks);

      localStorage.setItem("dailyTasks", JSON.stringify(formattedTasks));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];

    if (!updatedTasks[index].completed) {
      updatedTasks[index].completed = true;

      const newXP = xp + updatedTasks[index].xp;

      setXp(newXP);

      localStorage.setItem("xp", newXP);

      alert(`🎉 Task Completed! +${updatedTasks[index].xp} XP`);
    }

    setTasks(updatedTasks);

    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
  };

  const totalReward = tasks.reduce(
  (sum, task) => sum + task.xp,
  0
);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mt-10">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-cyan-400">
            🚀 Daily AI Tasks
          </h2>

          <p className="text-gray-400 mt-2">Complete tasks and grow daily 🔥</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* XP */}

          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-3 rounded-2xl font-black text-xl shadow-lg">
            ⚡ {xp} XP
          </div>

          {/* Level */}

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-lg">
            {getLevel()}
          </div>

          {/* Badge */}

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl font-black text-xl shadow-lg">
            {getBadge()}
          </div>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-cyan-400 animate-pulse text-lg">
          WaveSights AI is generating tasks...
        </div>
      ) : (
        <div className="space-y-5">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 transition-all ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{task.completed ? "✅" : "🔥"}</div>

                <p className="text-lg text-gray-200">{task.text}</p>
              </div>

              <button
                onClick={() => completeTask(index)}
                disabled={task.completed}
                className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-105"
                }`}
              >
                {task.completed ? "✅ Completed" : `+${task.xp} XP`}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Refresh */}

      <div className="mt-8">
        <button
          onClick={generateTasks}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-lg"
        >
          🔄 Generate New Tasks
        </button>
      </div>
    </div>
  );
}
