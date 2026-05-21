import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

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

  const [input, setInput] = useState("");

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

    setInput("");

    setLoading(true);

    try {
      const interest = localStorage.getItem("interest") || "";

      const goal = localStorage.getItem("goal") || "";

      const skillLevel = localStorage.getItem("skillLevel") || "";

      const stream = localStorage.getItem("educationStream") || "";

      const timeCommitment = localStorage.getItem("timeCommitment") || "";

      const conversationHistory = messages
  .map(
    (msg) =>
      `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`
  )
  .join("\n");

   const prompt = `
You are WaveSights AI, an advanced personalized AI Career Guidance Assistant.

User Profile:
- Background: ${stream}
- Interest: ${interest}
- Goal: ${goal}
- Skill Level: ${skillLevel}
- Daily Time Commitment: ${timeCommitment}

Previous Conversation:
${conversationHistory}

Current User Question:
${input}

IMPORTANT:
- Remember previous conversation context.
- Give highly personalized career guidance.
- If user wants career transition, guide step-by-step.
- Recommend roadmap, projects, internships, and learning strategy.
- Be practical and motivational.
- Avoid generic answers.
`;


      const result = await model.generateContent(prompt);

      const response = await result.response;

      const text = response.text();

      const aiMessage = {
        sender: "ai",
        text,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      const interest = localStorage.getItem("interest") || "Technology";

      const goal = localStorage.getItem("goal") || "Career Growth";

      const skillLevel = localStorage.getItem("skillLevel") || "Beginner";

      const stream = localStorage.getItem("educationStream") || "General";

      let fallbackReply = "";

      if (interest === "AI / ML") {
        fallbackReply = `Based on your ${stream} background and ${skillLevel} level, start learning Python, machine learning basics, and build AI projects consistently to achieve your goal of ${goal} 🚀`;
      } else if (interest === "Web Development") {
        fallbackReply = `To achieve ${goal}, focus on HTML, CSS, JavaScript, and React. Build real projects regularly and improve your frontend skills daily 🚀`;
      } else if (interest === "Cybersecurity") {
        fallbackReply = `Start with networking, Linux, and ethical hacking basics. Consistent hands-on practice will help you achieve your ${goal} in cybersecurity 🔐`;
      } else if (interest === "Data Science") {
        fallbackReply = `Learn Python, data analysis, statistics, and visualization tools. Building data projects will help you move toward your ${goal} 📊`;
      } else if (interest === "Finance") {
        fallbackReply = `Focus on financial analysis, Excel, market understanding, and investment concepts. Building practical finance knowledge daily will help achieve your ${goal} 💰`;
      } else {
        fallbackReply = `Based on your ${stream} background and ${goal}, focus on consistent skill-building, practical projects, and daily learning to grow your career 🚀`;
      }

      const errorMessage = {
        sender: "ai",
        text: fallbackReply,
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
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
          <h1 className="text-3xl font-black text-cyan-400">WaveSights AI</h1>

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

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-2xl px-5 md:px-6 py-4 md:py-5 rounded-3xl break-words text-base md:text-lg leading-relaxed shadow-lg

              ${
                message.sender === "user"
                  ? "bg-cyan-500 text-black self-end break-words"
                  : "bg-white/5 border border-white/10 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-3xl">
              Thinking...
            </div>
          </div>
        )}
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
