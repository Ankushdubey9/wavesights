import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function AIChat() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("wavesights-chat");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: "ai",
            text: "Hello 👋 I am WaveSights AI. Ask me anything about careers, skills, internships, or roadmap guidance.",
          },
        ];
  });

  const exploreCareer = localStorage.getItem("exploreCareer");

const [input, setInput] = useState(
  exploreCareer
    ? `I want to explore ${exploreCareer} career path. Give me roadmap, skills, salary, opportunities and preparation strategy.`
    : ""
);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("wavesights-chat", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const interest = localStorage.getItem("interest") || "";

      const goal = localStorage.getItem("goal") || "";

      const skillLevel = localStorage.getItem("skillLevel") || "";

      const stream = localStorage.getItem("educationStream") || "";
      const xp = localStorage.getItem("xp") || 0;

const streak = localStorage.getItem("streak") || 0;

const completedSkills =
  JSON.parse(localStorage.getItem("completedSkills")) || [];

      const timeCommitment =
        localStorage.getItem("timeCommitment") || "";

      const conversationHistory = messages
        .slice(-5)
        .map(
          (msg) =>
            `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`
        )
        .join("\n");

      const prompt = `
You are WaveSights AI, a modern AI Career Mentor.

User Profile:
- Background: ${stream}
- Interest: ${interest}
- Goal: ${goal}
- Skill Level: ${skillLevel}
- Daily Time Commitment: ${timeCommitment}
- XP: ${xp}
- Learning Streak: ${streak}
- Completed Skills: ${completedSkills.join(", ")}

Previous Conversation:
${conversationHistory}

Current User Question:
${input}

STRICT RESPONSE RULES:

- NEVER write huge paragraphs.
- ALWAYS answer in short line-by-line format.
- ALWAYS use headings with emojis.
- ALWAYS add spacing between sections.
- ALWAYS keep answers mobile-friendly.
- ALWAYS use bullet points.
- ALWAYS sound practical and modern.
- Keep answers visually attractive.
- Keep sentences short.
- Use markdown formatting.
- Avoid robotic tone.
- Make answers feel like ChatGPT premium responses.
ALWAYS provide:
- next learning step
- project suggestion
- resource suggestion
- interview preparation tip

GOOD RESPONSE EXAMPLE:

## 🚀 Start Learning
- Learn fundamentals first
- Build small projects
- Practice consistently

## 💼 Career Growth
- Improve communication
- Build portfolio
- Apply for internships

## 🔥 Long-Term Success
- Stay disciplined
- Keep learning
- Build personal brand

Now answer the user's question properly.
`;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content:
                "You are WaveSights AI, a smart AI career mentor.",
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

      const aiMessage = {
        sender: "ai",
        text,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.log(error.response?.data || error.message);

      const errorMessage = {
        sender: "ai",
        text:
          "⚠️ WaveSights AI is temporarily unavailable. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);

    setInput("");
  };

  const clearChat = () => {
    localStorage.removeItem("wavesights-chat");

    setMessages([
      {
        sender: "ai",
        text: "Hello 👋 I am WaveSights AI. Ask me anything about careers, skills, internships, or roadmap guidance.",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 px-4 md:px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-cyan-400">
            WaveSights AI
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Your Personalized AI Career Assistant
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-2xl text-sm">
            AI Online
          </div>

          <button
            onClick={clearChat}
            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-2xl text-sm hover:bg-red-500/30 transition"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-2xl px-5 md:px-6 py-4 md:py-5 rounded-3xl break-words text-base md:text-lg leading-relaxed shadow-lg
              
              ${
                message.sender === "user"
                  ? "bg-cyan-500 text-black self-end"
                  : "bg-white/5 border border-white/10 text-white"
              }`}
            >
             <ReactMarkdown>
  {message.text}
</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
  <div className="flex justify-start">

    <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-3xl flex items-center gap-2">

      <span className="text-cyan-400 font-semibold">
        WaveSights AI
      </span>

      <div className="flex gap-1 text-cyan-400 text-2xl">

        <span className="animate-bounce">•</span>

        <span className="animate-bounce delay-100">•</span>

        <span className="animate-bounce delay-200">•</span>

      </div>

    </div>

  </div>
)}
      </div>

      <div className="flex flex-wrap gap-3 mb-4">

  {[
    "Frontend Roadmap",
    "Resume Review",
    "Interview Prep",
    "Project Ideas",
  ].map((item) => (
    <button
      key={item}
      onClick={() => setInput(item)}
      className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:border-cyan-400"
    >
      {item}
    </button>
  ))}

</div>

      {/* Input */}
      <div className="border-t border-white/10 p-4 md:p-6 sticky bottom-0 bg-[#020817]">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Ask WaveSights AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-4 outline-none focus:border-cyan-400 text-white w-full"
          />

          <button
            onClick={handleSend}
            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}