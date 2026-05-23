import { useState } from "react";

import pdfToText from "react-pdftotext";

export default function ResumeAnalyzer() {

  const [resumeText, setResumeText] =
    useState("");

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const analyzeResume = async () => {

    if (!resumeText) {
      alert("Paste resume text first!");
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
You are an expert AI Resume Analyzer.

Analyze resume professionally.

Give response in this format:

# ATS Score

# Strong Skills

# Missing Skills

# Best Career Role

# Resume Improvements

# Final AI Advice

Add emojis and beautiful formatting.
`,
              },

              {
                role: "user",

                content: resumeText,
              },
            ],
          }),
        }
      );

      const data =
        await response.json();
        console.log(data);

     if (data.choices) {

  setAnalysis(
    data.choices[0].message.content
  );

} else {

  console.log(data);

  alert(
    "AI response failed"
  );
}
    } catch (error) {

      console.log(error);

      alert(
        "Resume analysis failed"
      );

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

        Paste your resume below and get
        AI-powered career analysis.

      </p>

      <input
  type="file"
  accept=".pdf"

  onChange={async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    try {

      const text =
        await pdfToText(file);

      console.log(text);

      setResumeText(text);

    } catch (error) {

      console.log(error);

      alert(
        "PDF extraction failed"
      );
    }
  }}

  className="w-full bg-white/5 border border-white/10 rounded-3xl p-6"
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

        className="mt-6 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-105 transition-all"
      >

        {loading
          ? "Analyzing..."
          : "Analyze Resume"}

      </button>

      {analysis && (

        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 whitespace-pre-wrap leading-relaxed text-lg">

          {analysis}

        </div>
      )}

    </div>
  );
}