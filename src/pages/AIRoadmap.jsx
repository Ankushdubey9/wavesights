import { useState } from "react";
import axios from "axios";

export default function AIRoadmap() {
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
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

Generate a modern personalized career roadmap.

User Details:
- Background: ${stream}
- Interest: ${interest}
- Goal: ${goal}
- Skill Level: ${skillLevel}

STRICT RULES:
- Use emojis
- Use headings
- Use bullet points
- Keep roadmap structured
- Divide into phases
- Keep mobile friendly
- Make roadmap practical and modern
- Avoid paragraphs

Example Format:

## 🚀 Phase 1 — Fundamentals
- Learn basics
- Build foundation

## 💻 Phase 2 — Skills
- Learn tools
- Build projects

## 🔥 Phase 3 — Career Growth
- Portfolio
- Internship
- Networking
`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an expert AI career roadmap generator.",
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

      setRoadmap(text);

    } catch (error) {
      console.log(error);

      setRoadmap(
        "⚠️ Failed to generate roadmap."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 md:p-10">

      <h1 className="text-4xl md:text-6xl font-black text-cyan-400 mb-6">
        AI Career Roadmap 🚀
      </h1>

      <p className="text-gray-400 text-lg mb-10">
        Generate your personalized AI-powered roadmap.
      </p>

      <button
        onClick={generateRoadmap}
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition duration-300"
      >
        Generate Roadmap
      </button>

      {loading && (
        <div className="mt-10 text-cyan-400 text-xl animate-pulse">
          WaveSights AI is generating roadmap...
        </div>
      )}

      {roadmap && (
        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
          {roadmap}
        </div>
      )}
    </div>
  );
}