import { useState } from "react";

export default function MockInterview() {
  const [role, setRole] = useState("Frontend Developer");

  const [difficulty, setDifficulty] = useState("Easy");
  const [interviewType, setInterviewType] = useState("Mixed");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] =
  useState(5);

  const getInterviewTypes = () => {
    if (
      [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "React Developer",
        "AI Engineer",
        "Data Analyst",
        "Software Engineer",
        "Cyber Security Analyst",
        "Cloud Engineer",
        "DevOps Engineer",
      ].includes(role)
    ) {
      return ["Technical", "HR", "Mixed", "System Design", "Behavioral"];
    }

    if (["Product Manager", "Startup Founder"].includes(role)) {
      return [
        "Product Thinking",
        "Case Study",
        "Business Strategy",
        "Investor Questions",
        "Mixed",
      ];
    }

    if (role === "UPSC Personality Test") {
      return [
        "Personality Test",
        "Current Affairs",
        "Ethics",
        "Situational",
        "Mixed",
      ];
    }

    if (role === "Banking Interview") {
      return ["Banking Knowledge", "Current Affairs", "HR", "Mixed"];
    }

    return ["Mixed"];
  };

  const startInterview = async () => {
    if (!question) {
      setQuestionNumber(1);
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct",

            messages: [
              {
                role: "system",

                content: `
You are a professional AI Mock Interviewer.

Role: ${role}

Difficulty: ${difficulty}

Interview Type: ${interviewType}

Generate ONE interview question based on:

- Role
- Difficulty
- Interview Type

Examples:

Frontend Developer + Technical
→ Technical coding question

Frontend Developer + HR
→ HR question

Frontend Developer + System Design
→ Architecture/design question

UPSC Personality Test + Current Affairs
→ Current affairs question

Only ask ONE question.
`,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      const generatedQuestion = data.choices[0].message.content;

      setQuestion(generatedQuestion);

      const speech = new SpeechSynthesisUtterance(generatedQuestion);

      speech.lang = "en-US";

      speech.rate = 1;

      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.log(error);

      alert("Failed to generate question");
    } finally {
      setLoading(false);
    }
  };

  const analyzeAnswer = async () => {
    if (!answer) {
      alert("Write your answer first!");

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct",

            messages: [
              {
                role: "system",

                content: `
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

                content: `
Interview Question:
${question}

Candidate Answer:
${answer}
`,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      setFeedback(data.choices[0].message.content);
    } catch (error) {
      console.log(error);

      alert("Answer analysis failed");
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
        {/* ROLE SELECTION */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-black text-cyan-300 mb-6">
            🎯 Select Interview Role
          </h2>

          {/* TECH ROLES */}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              💻 Tech Careers
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "React Developer",
                "AI Engineer",
                "Data Analyst",
                "Software Engineer",
                "Cyber Security Analyst",
                "Cloud Engineer",
                "DevOps Engineer",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`
            p-4 rounded-2xl border text-sm md:text-base
            transition-all duration-300

            ${
              role === item
                ? "bg-cyan-400 text-black border-cyan-300 scale-105 shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10"
            }
          `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CORPORATE ROLES */}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              🏢 Corporate Careers
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Product Manager",
                "Digital Marketing",
                "HR Interview",
                "Startup Founder",
                "MBA Interview",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`
            p-4 rounded-2xl border text-sm md:text-base
            transition-all duration-300

            ${
              role === item
                ? "bg-purple-400 text-black border-purple-300 scale-105 shadow-lg shadow-purple-500/30"
                : "bg-white/5 border-white/10 hover:border-purple-400 hover:bg-purple-500/10"
            }
          `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* GOVERNMENT ROLES */}

          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">
              🏛 Government & Public Sector
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "SSC Interview",
                "UPSC Personality Test",
                "Banking Interview",
                "Railway Interview",
                "Defense Interview",
                "Police Interview",
                "Teaching Interview",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`
            p-4 rounded-2xl border text-sm md:text-base
            transition-all duration-300

            ${
              role === item
                ? "bg-green-400 text-black border-green-300 scale-105 shadow-lg shadow-green-500/30"
                : "bg-white/5 border-white/10 hover:border-green-400 hover:bg-green-500/10"
            }
          `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4">
            ⚡ Select Difficulty
          </h2>

          <div className="flex flex-wrap gap-4">
            {["Easy", "Medium", "Hard"].map((item) => (
              <button
                key={item}
                onClick={() => setDifficulty(item)}
                className={`
          px-8 py-4 rounded-2xl border font-bold
          transition-all duration-300

          ${
            difficulty === item
              ? "bg-cyan-400 text-black border-cyan-300 scale-105"
              : "bg-white/5 border-white/10 hover:border-cyan-400"
          }
        `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              🧠 Interview Type
            </h2>

            <div className="flex flex-wrap gap-3">
              {getInterviewTypes().map((item) => (
                <button
                  key={item}
                  onClick={() => setInterviewType(item)}
                  className={`
          px-4 py-3 rounded-2xl border transition-all

          ${
            interviewType === item
              ? "bg-cyan-400 text-black border-cyan-300"
              : "bg-white/5 border-white/10"
          }
        `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">

  <h2 className="text-2xl font-bold text-cyan-300 mb-4">
    📋 Number of Questions
  </h2>

  <div className="flex gap-3 flex-wrap">

    {[3, 5, 10].map((count) => (

      <button
        key={count}
        onClick={() =>
          setTotalQuestions(count)
        }
        className={`
          px-5 py-3 rounded-2xl border

          ${
            totalQuestions === count
              ? "bg-cyan-400 text-black"
              : "bg-white/5 border-white/10"
          }
        `}
      >
        {count} Questions
      </button>

    ))}

  </div>

</div>

          {/* INTERVIEW PREVIEW */}

          <div className="mt-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">
              🚀 Interview Preview
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Role</span>
                <span className="font-bold">{role}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty</span>
                <span className="font-bold">{difficulty}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Interview Type</span>

                <span className="font-bold">{interviewType}</span>
              </div>
            </div>
          </div>

          {/* FEATURES */}

          <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">
              📋 What You'll Get
            </h3>

            <div className="space-y-3 text-gray-300">
              <div>✅ AI-generated interview question</div>

              <div>✅ Voice answer practice</div>

              <div>✅ Technical evaluation</div>

              <div>✅ Communication feedback</div>

              <div>✅ Confidence score</div>

              <div>✅ Personalized improvements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Interview */}

      <div className="mb-10">
        <button
          onClick={startInterview}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/40"
        >
          {loading ? "Generating..." : "Start Interview"}
        </button>
      </div>

      {/* Question */}

      {question && (
        <>
          <div className="w-full bg-white/10 rounded-full h-3 mb-6">
            <div
              className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((questionNumber / 10) * 100, 100)}%`,
              }}
            />
          </div>
          <div className="mb-4 text-cyan-400 font-bold text-xl">
            Question {questionNumber} / {totalQuestions}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-3xl font-black text-cyan-400 mb-4">
              Interview Question
            </h2>

            <p className="text-xl text-gray-200 leading-relaxed">{question}</p>
          </div>
        </>
      )}
      {/* Answer */}

      {question && (
        <div className="mb-8">
          <textarea
            rows={10}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 outline-none text-lg"
          />

          <div className="mt-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
            <h4 className="font-bold text-cyan-300">💡 Answer Tip</h4>

            <p className="text-gray-300 mt-2">
              Use STAR Method: Situation → Task → Action → Result
            </p>
          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => {
                const SpeechRecognition =
                  window.SpeechRecognition || window.webkitSpeechRecognition;

                if (!SpeechRecognition) {
                  alert("Speech Recognition not supported in this browser");

                  return;
                }

                const recognition = new SpeechRecognition();

                recognition.lang = "en-US";

                recognition.start();

                recognition.onstart = () => {
                  alert("🎤 Listening...");
                };

                recognition.onresult = (event) => {
                  setAnswer(event.results[0][0].transcript);
                };

                recognition.onerror = (event) => {
                  console.log(event);

                  alert("Microphone access failed");
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
              {loading ? "Analyzing..." : "Analyze Answer"}
            </button>

           <button
  onClick={() => {

    if (questionNumber >= totalQuestions) {

      alert("🎉 Interview Completed!");

      return;
    }

    setAnswer("");
    setFeedback("");

    setQuestionNumber(prev => prev + 1);

    startInterview();

  }}

  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold text-lg hover:scale-105 transition-all"
>
  ➡️ Next Question
</button>

<button
  onClick={() => {

    setQuestion("");

    setAnswer("");

    setFeedback("");

    setQuestionNumber(1);

  }}

  className="px-8 py-4 rounded-2xl bg-red-500 text-white font-bold"
>
  🛑 End Interview
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
