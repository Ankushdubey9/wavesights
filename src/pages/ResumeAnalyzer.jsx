import { useState } from "react";
import { askAI } from "../services/aiService";

import { resumePrompt } from "../prompts/resumePrompt";

import pdfToText from "react-pdftotext";

import ResumeAnalysisResult from "../components/ResumeAnalysisResult";

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");

  const aiCareerData = JSON.parse(localStorage.getItem("aiCareerData") || "{}");

  const targetRole =
    selectedRole === "Use My Roadmap Goal"
      ? aiCareerData.careerMatch
      : selectedRole === "Other"
        ? customRole
        : selectedRole;

  const analyzeResume = async () => {
    if (!targetRole) {
      alert("Please select a target role first");
      return;
    }

    if (!resumeText) {
      alert("Paste resume text first!");
      return;
    }

    setLoading(true);

    try {
    const prompt = `
Target Role:
${targetRole}

Resume:

${resumeText}
`;

const text = await askAI(
  resumePrompt,
  prompt
);
  const jsonStart = text.indexOf("{");

const jsonEnd = text.lastIndexOf("}") + 1;

const content = text.slice(jsonStart, jsonEnd);

const aiData = JSON.parse(content);

setAnalysis(aiData);
     
    } catch (error) {
      console.log(error);

      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">
      <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-6">
        AI Resume Analyzer 🚀
      </h1>

      <p className="text-gray-400 text-lg mb-10">
        Paste your resume below and get AI-powered career analysis.
      </p>

      <div className="mb-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

  <h2 className="text-2xl font-bold mb-4 text-cyan-300">
    🎯 Select Target Role
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    {[
      "Use My Roadmap Goal",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "Data Analyst",
      "AI Engineer",
      "QA Engineer",
      "Cyber Security Analyst",
      "Other",
    ].map((role) => (
      <button
        key={role}
        onClick={() => setSelectedRole(role)}
        className={`
          p-4 rounded-2xl border transition-all duration-300 text-left

          ${
            selectedRole === role
              ? "bg-cyan-500 text-black border-cyan-400 scale-105"
              : "bg-white/5 border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10"
          }
        `}
      >
        <div className="font-bold">

          {role === "Use My Roadmap Goal" && "🎯 "}
          {role === "Full Stack Developer" && "💻 "}
          {role === "Frontend Developer" && "🎨 "}
          {role === "Backend Developer" && "⚙️ "}
          {role === "Software Engineer" && "🚀 "}
          {role === "Data Analyst" && "📊 "}
          {role === "AI Engineer" && "🤖 "}
          {role === "QA Engineer" && "🧪 "}
          {role === "Cyber Security Analyst" && "🔒 "}
          {role === "Other" && "✨ "}

          {role}
        </div>
      </button>
    ))}

  </div>

</div>
{selectedRole === "Other" && (
  <input
    type="text"
    placeholder="Enter your target role..."
    value={customRole}
    onChange={(e) => setCustomRole(e.target.value)}
    className="w-full mt-4 mb-8 bg-white/5 border border-white/10 rounded-2xl p-4"
  />
)}

      <input
        type="file"
        accept=".pdf"
        onChange={async (e) => {
          const file = e.target.files[0];

          if (!file) return;

          try {
            const text = await pdfToText(file);

            console.log(text);

            setResumeText(text);
          } catch (error) {
            console.log(error);

            alert("PDF extraction failed");
          }
        }}
        className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 mb-8"
      />

      {resumeText && (
        <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6 max-h-72 overflow-y-auto">
          <p className="text-gray-300 whitespace-pre-wrap">
            {resumeText.slice(0, 2000)}
          </p>
        </div>
      )}

      <button
        onClick={analyzeResume}
       className="mt-4 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-105 transition-all"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      </div>
      {analysis && (
        <div className="mt-10">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-4xl font-black text-cyan-400">
              Resume Analysis Report 🤖
            </h2>
            <p className="text-gray-400 mt-2">
              AI-powered ATS and Career Analysis
            </p>
          </div>

          {/* Main Report Card */}
          <div className="bg-gradient-to-br from-white/5 to-cyan-500/5 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            {/* Decorative Top Bar */}
            <div className="h-1 w-32 bg-cyan-400 rounded-full mb-8"></div>

            <div
              className="
          prose
          prose-invert
          max-w-none

          prose-headings:text-cyan-300
          prose-headings:font-bold

          prose-h1:text-4xl
          prose-h1:mb-6

          prose-h2:text-3xl
          prose-h2:mt-10

          prose-h3:text-2xl

          prose-p:text-gray-300
          prose-p:leading-relaxed

          prose-strong:text-white

          prose-li:text-gray-300

          prose-ul:space-y-2

          prose-table:border
          prose-table:border-white/10

          prose-th:text-cyan-300
          prose-th:border
          prose-th:border-white/10

          prose-td:border
          prose-td:border-white/10

          prose-blockquote:border-cyan-400
          prose-blockquote:text-gray-300
        "
            >
              {analysis && <ResumeAnalysisResult analysis={analysis} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
