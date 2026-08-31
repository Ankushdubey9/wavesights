import { useState } from "react";
import { askAI } from "../services/aiService";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    const userMessage = {
      role: "user",
      text: currentMessage,
    };

    setChat((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      const systemPrompt = `
You are WaveSights AI, a helpful AI career and productivity assistant.

Help users with:
- Career guidance
- Coding
- Interviews
- Resume improvement
- Learning roadmaps
- Projects
- Internships
- Job preparation
- Productivity
- General questions

IMPORTANT:
The user may ask ANYTHING, not only career-related questions.

Answer the actual question the user asks.

Do not force every conversation toward jobs, salaries, careers, or internships.

For simple questions:
Give a simple and direct answer.

For technical questions:
Give practical explanations and examples.

For career questions:
Give personalized and actionable guidance.

For general questions:
Answer naturally and helpfully.

Keep answers clear, useful and reasonably concise.
`;

      const aiReply = await askAI(
        systemPrompt,
        currentMessage,
        {
          temperature: 0.7,
          maxTokens: 1000,
        }
      );

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiReply,
        },
      ]);

    } catch (error) {
      console.error("Floating AI Error:", error);

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error.message ||
            "⚠️ WaveSights AI is temporarily unavailable.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-cyan-400 text-black text-3xl shadow-2xl hover:scale-110 transition-all"
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[350px] max-w-[90vw] bg-[#020817] border border-cyan-400/20 rounded-3xl shadow-2xl z-50 overflow-hidden">

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-4 text-gray-400 hover:text-red-400 text-2xl font-bold z-50"
          >
            ✕
          </button>

          {/* Header */}
          <div className="bg-cyan-400 text-black font-black px-5 py-4 text-xl">
            WaveSights AI 🚀
          </div>

          {/* Chat Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">

            {chat.length === 0 && (
              <div className="text-gray-400 text-sm text-center mt-10">
                👋 Hi! I'm WaveSights AI.
                <br />
                Ask me anything.
              </div>
            )}

            {chat.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl text-sm whitespace-pre-wrap ${
                  item.role === "user"
                    ? "bg-cyan-500 text-black ml-10"
                    : "bg-white/10 text-white mr-10"
                }`}
              >
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="bg-white/10 text-cyan-400 mr-10 p-4 rounded-2xl">
                WaveSights AI is thinking...
              </div>
            )}

          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskAI();
                }
              }}
              placeholder="Ask WaveSights AI..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
            />

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="bg-cyan-400 text-black px-5 rounded-2xl font-bold hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

        </div>
      )}
    </>
  );
}