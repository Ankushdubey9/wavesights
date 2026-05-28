import { useState } from "react";

export default function FloatingAI() {

  const [open, setOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const askAI = async () => {

    if (!message) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      const response =
        await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              model:
                "meta-llama/llama-3-8b-instruct",

              messages: [
                {
                  role: "system",

                  content:
                    `
You are WaveSights AI.

Help users with:
- Career guidance
- Coding
- Interviews
- Resume help
- Motivation
- Roadmaps

Keep answers short and practical.
`,
                },

                {
                  role: "user",
                  content: message,
                },
              ],
            }),
          }
        );

      const data =
        await response.json();

      const aiReply =
        data.choices[0]
          .message.content;

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiReply,
        },
      ]);

    } catch (error) {

      console.log(error);

    }

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full bg-cyan-400 text-black text-3xl shadow-2xl hover:scale-110 transition-all"
      >
        🤖
      </button>

      {/* Chat Box */}

      {open && (

        <div className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] bg-[#020817] border border-cyan-400/20 rounded-3xl shadow-2xl z-50 overflow-hidden">

          {/* Header */}

          <div className="bg-cyan-400 text-black font-black px-5 py-4 text-xl">

            WaveSights AI 🚀

          </div>

          {/* Chat Area */}

          <div className="h-[400px] overflow-y-auto p-4 space-y-4">

            {chat.map(
              (item, index) => (

                <div
                  key={index}
                  className={`p-4 rounded-2xl text-sm whitespace-pre-wrap

                  ${
                    item.role ===
                    "user"

                      ? "bg-cyan-500 text-black ml-10"

                      : "bg-white/10 text-white mr-10"
                  }`}
                >

                  {item.text}

                </div>
              )
            )}

          </div>

          {/* Input */}

          <div className="p-4 border-t border-white/10 flex gap-3">

            <input
              type="text"

              value={message}

              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }

              placeholder="Ask WaveSights AI..."

              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
            />

            <button
              onClick={askAI}
              className="bg-cyan-400 text-black px-5 rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}