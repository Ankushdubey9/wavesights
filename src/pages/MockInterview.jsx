import { useState } from "react";

export default function MockInterview() {

  const [role, setRole] =
    useState("Frontend Developer");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const startInterview = async () => {

    setLoading(true);

    try {

      const response = await fetch(
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
You are a professional AI Mock Interviewer.

Generate ONE ${difficulty} level
interview question for a ${role}.

Only ask the question.
`,
              },
            ],
          }),
        }
      );

      const data =
        await response.json();

      const generatedQuestion =
        data.choices[0].message.content;

      setQuestion(
        generatedQuestion
      );

      const speech =
        new SpeechSynthesisUtterance(
          generatedQuestion
        );

      speech.lang = "en-US";

      speech.rate = 1;

      window.speechSynthesis.speak(
        speech
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to generate question"
      );

    } finally {

      setLoading(false);
    }
  };

  const analyzeAnswer = async () => {

    if (!answer) {

      alert(
        "Write your answer first!"
      );

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
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
You are an expert AI Interview Coach.

Analyze candidate answer professionally.

Give response in this format:

# Feedback

# Strong Points

# Improvements

# Confidence Score

Add emojis and motivation.
`,
              },

              {
                role: "user",

                content:
                  `
Interview Question:
${question}

Candidate Answer:
${answer}
`,
              },
            ],
          }),
        }
      );

      const data =
        await response.json();

      setFeedback(
        data.choices[0].message.content
      );

    } catch (error) {

      console.log(error);

      alert(
        "Answer analysis failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">

      <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-6">

        AI Mock Interview 🎤

      </h1>

      <p className="text-gray-400 text-lg mb-10">

        Practice interviews with AI and improve your confidence 🚀

      </p>

      {/* Role + Difficulty */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <select
          value={role}

          onChange={(e) =>
            setRole(
              e.target.value
            )
          }

          style={{
            color: "white",
            backgroundColor: "#0f172a",
          }}

          className="w-full bg-[#0f172a] text-white border border-white/10 rounded-2xl p-4 text-lg outline-none"
        >

          <option>
            Frontend Developer
          </option>

          <option>
            Backend Developer
          </option>

          <option>
            Full Stack Developer
          </option>

          <option>
            React Developer
          </option>

          <option>
            UI/UX Designer
          </option>

          <option>
            AI Engineer
          </option>

          <option>
            Data Analyst
          </option>

          <option>
            Software Engineer
          </option>

          <option>
            Cyber Security Analyst
          </option>

          <option>
            Cloud Engineer
          </option>

          <option>
            DevOps Engineer
          </option>

          <option>
            Product Manager
          </option>

          <option>
            Digital Marketing
          </option>

          <option>
            HR Interview
          </option>

          <option>
            Startup Founder
          </option>

          <option>
            SSC Interview
          </option>

          <option>
            UPSC Personality Test
          </option>

          <option>
            Banking Interview
          </option>

          <option>
            Railway Interview
          </option>

          <option>
            Defense Interview
          </option>

          <option>
            Police Interview
          </option>

          <option>
            Teaching Interview
          </option>

          <option>
            MBA Interview
          </option>

        </select>

        <select
          value={difficulty}

          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }

          style={{
            color: "white",
            backgroundColor: "#0f172a",
          }}

          className="w-full bg-[#0f172a] text-white border border-white/10 rounded-2xl p-4 text-lg outline-none"
        >

          <option>
            Easy
          </option>

          <option>
            Medium
          </option>

          <option>
            Hard
          </option>

        </select>

      </div>

      {/* Start Interview */}

      <div className="mb-10">

        <button
          onClick={startInterview}

          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/40"
        >

          {loading
            ? "Generating..."
            : "Start Interview"}

        </button>

      </div>

      {/* Question */}

      {question && (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-black text-cyan-400 mb-4">

            Interview Question

          </h2>

          <p className="text-xl text-gray-200 leading-relaxed">

            {question}

          </p>

        </div>
      )}

      {/* Answer */}

      {question && (

        <div className="mb-8">

          <textarea
            rows={10}

            value={answer}

            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }

            placeholder="Write your answer here..."

            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 outline-none text-lg"
          />

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-6">

            <button
              onClick={() => {

                const SpeechRecognition =
                  window.SpeechRecognition ||
                  window.webkitSpeechRecognition;

                if (!SpeechRecognition) {

                  alert(
                    "Speech Recognition not supported in this browser"
                  );

                  return;
                }

                const recognition =
                  new SpeechRecognition();

                recognition.lang =
                  "en-US";

                recognition.start();

                recognition.onstart =
                  () => {

                    alert(
                      "🎤 Listening..."
                    );
                  };

                recognition.onresult =
                  (event) => {

                    setAnswer(
                      event.results[0][0]
                        .transcript
                    );
                  };

                recognition.onerror =
                  (event) => {

                    console.log(event);

                    alert(
                      "Microphone access failed"
                    );
                  };
              }}

              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/40"
            >

              🎤 Speak Answer

            </button>

            <button
              onClick={analyzeAnswer}

              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/40"
            >

              {loading
                ? "Analyzing..."
                : "Analyze Answer"}

            </button>

          </div>

        </div>
      )}

      {/* Feedback */}

      {feedback && (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 whitespace-pre-wrap leading-relaxed text-lg">

          {feedback}

        </div>
      )}

    </div>
  );
}