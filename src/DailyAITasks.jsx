import { useEffect, useState } from "react";
import axios from "axios";

export default function DailyAITasks() {
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateTasks();
  }, []);

  const generateTasks = async () => {
    setLoading(true);

    try {
      const interest =
        localStorage.getItem("interest") || "";

      const goal =
        localStorage.getItem("goal") || "";

      const skillLevel =
        localStorage.getItem("skillLevel") || "";

      const stream =
        localStorage.getItem("educationStream") || "";

      const prompt = `
You are WaveSights AI.

Generate personalized daily career tasks.

User Details:
- Background: ${stream}
- Interest: ${interest}
- Goal: ${goal}
- Skill Level: ${skillLevel}

STRICT RULES:
- Use emojis
- Use bullet points
- Keep tasks practical
- Keep answers short
- Make tasks motivating
- Make mobile friendly
- Give only 5 tasks

Example:

## 🚀 Today's Tasks

✅ Learn React basics
✅ Solve 2 coding problems
✅ Improve LinkedIn profile
✅ Watch AI tutorial
✅ Build mini project
`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are an AI career productivity coach.",
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
        }
      );

      const text =
        response.data.choices[0].message.content;

      setTasks(text);

    } catch (error) {
      console.log(error);

      setTasks(
        "⚠️ Failed to generate AI tasks."
      );
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mt-10">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-4xl font-black text-cyan-400">
          Daily AI Tasks 🚀
        </h2>

        <button
          onClick={generateTasks}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-3 rounded-2xl transition duration-300"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-cyan-400 animate-pulse text-lg">
          WaveSights AI is generating tasks...
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-base md:text-lg leading-relaxed">
          {tasks}
        </div>
      )}
    </div>
  );
}