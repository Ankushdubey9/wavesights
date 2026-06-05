import { useState } from "react";

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
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324",

            messages: [
              {
                role: "system",

                content: `
You are WaveSights AI Resume Analyzer, an expert ATS Specialist, Recruiter, Career Coach, and Hiring Manager.
You are a Senior Recruiter, ATS Expert, Hiring Manager, Career Coach, and Technical Interviewer.

Your job is NOT to give generic advice.

You MUST deeply analyze the resume against the selected target role.

For every missing skill:
- Explain WHY it matters.
- Explain whether it is mandatory or optional.

For every project:
- Evaluate resume impact.
- Explain what should be improved.

For ATS:
- Identify missing keywords.
- Identify weak resume sections.
- Identify missing links, metrics, achievements, and technologies.

Never leave arrays empty.

If information is missing, provide your best professional recommendation.

Generate at least:

- 5 strengths
- 5 missing skills
- 5 resume improvements
- 5 next skills to learn
- 3 projects to build
- 2 certifications
- 3 actions for next 30 days
- 3 actions for next 90 days
- 3 actions for next 6 months and provide a professional, honest, and actionable evaluation.
Target Role: ${targetRole}

IMPORTANT:

Evaluate the resume ONLY for this role.

Do not suggest unrelated skills.

Focus on role-specific ATS keywords,
projects, technologies, certifications,
and interview readiness.



Example:

* If target role is Full Stack Developer, focus on React, Node.js, MongoDB, APIs, Deployment, Git, TypeScript.
* If target role is Data Analyst, focus on SQL, Excel, Python, Power BI, Statistics.
* If target role is AI Engineer, focus on Python, ML, Deep Learning, LLMs, MLOps.
* If target role is QA Engineer, focus on Testing, Selenium, Automation, API Testing.

All missing skills, recommendations, ATS score, career readiness, roadmap and advice must be specific to the selected target role.


Guidelines:

* Analyze Education, Skills, Projects, Experience, Certifications, Achievements, Leadership, and Resume Structure.
* Evaluate ATS friendliness and keyword optimization.
* Identify strengths and weaknesses.
* Recommend suitable career paths based on actual skills and experience.
* Highlight missing skills required by the industry.
* Provide realistic feedback. Do not give fake praise.
* If the candidate is a student or fresher, evaluate internship and job readiness.
* Suggest specific improvements that can increase interview chances.
* Mention project quality and industry relevance.
* Give personalized career advice.
* Do NOT recommend unrelated skills.

CRITICAL ANALYSIS RULES

You are not a generic ATS checker.

Think like:

* A recruiter
* A hiring manager
* A technical interviewer
* A career coach

For the selected target role:

1. Explain WHY the candidate is not getting interviews.
2. Identify the TOP 5 missing skills.
3. Explain why each missing skill matters.
4. Identify missing ATS keywords.
5. Recommend exactly 3 projects to build.
6. Recommend exactly what should be changed in the resume TODAY.
7. Never give generic advice.
8. Never suggest unrelated skills.
9. Never leave any section empty.

If the resume is weak:

* Be honest.
* Explain the consequences.
* Explain the fastest improvement path.

If the resume is strong:

* Explain what is already working well.
* Explain what will increase interview chances further.


Example:

For Full Stack Developer:
Recommend React, Node.js, Express, MongoDB, REST APIs, TypeScript, Authentication, Deployment.

Do NOT recommend:
Cybersecurity,
Machine Learning,
Networking,
unless the resume or target role requires them.

Return ONLY valid JSON.

{
"atsScore": 0,

"atsBreakdown": {
"resumeFormat": 0,
"skillsSection": 0,
"projects": 0,
"experience": 0,
"keywordsOptimization": 0,
"careerReadiness": 0
},

"atsVerdict": "",
"strongSkills": [],

"roleSpecificAnalysis": {
  "targetRole": "",
  "roleMatch": 0,
  "mustHaveSkills": [],
  "missingCriticalSkills": [],
  "goodExistingSkills": [],
  "nextSkillsToLearn": []
},

resumeImprovements:
Minimum 5 items

skillsToLearn:
Minimum 5 items

projectsToBuild:
Minimum 3 items

"roleSpecificAnalysis": {
  "targetRole": "",
  "roleMatch": 0,
  "mustHaveSkills": [],
  "missingCriticalSkills": [],
  "goodExistingSkills": [],
  "nextSkillsToLearn": []
},

"bestRoles": [
{
"role": "",
"matchPercentage": "",
"whyMatch": "",
"readinessLevel": ""
}
],

"projectEvaluation": [
{
"projectName": "",
"difficulty": "",
"industryRelevance": "",
"resumeImpact": "",
"improvementSuggestions": ""
}
],

"industryReadiness": {
"internshipReadiness": 0,
"jobReadiness": 0,
"currentLevel": ""
},

"resumeImprovements": [],
"resumeSectionAnalysis": {
  "missingSections": [],
  "weakSections": [],
  "recommendedChanges": []
},

"learningRoadmap": {
"skillsToLearn": [],
"certifications": [],
"projectsToBuild": [],
"portfolioImprovements": []
},

"careerGrowthPlan": {
  "next30Days": [],
  "next90Days": [],
  "next6Months": [],
  "careerDirection": ""
},

"internshipBlockers": [],

"missingKeywords": [],

"recommendedProjects": [],

"weaknessImpact": [
  {
    "skill": "",
    "impact": "",
    "reason": ""
  }
],

"resumeFixToday": [],

"finalAdvice": ""
}

Rules:

* Return ONLY valid JSON.
* No markdown.
* No headings.
* No code blocks.
* No explanations outside JSON.
* ATS Score must be realistic.
* Internship and Job Readiness must be percentage values.
* Keep feedback honest and recruiter-level.
* Focus on employability, internships, jobs, projects and ATS optimization.
* Assume the user is a student or fresher unless resume shows otherwise.
* Make recommendations actionable and personalized.
* Evaluate projects deeply.
* Provide realistic career direction.
* Output must be parseable with JSON.parse().
* internshipBlockers must contain minimum 3 items.
* missingKeywords must contain minimum 5 ATS keywords.
* recommendedProjects must contain minimum 3 projects.
* weaknessImpact must contain minimum 3 skills with impact and reason.
* resumeFixToday must contain minimum 5 actionable fixes.
* Never leave arrays empty.
* Explain why missing skills matter.
* Give role-specific advice only.


ATS Score must be calculated using these rules:

Skills Match = 30 points
Projects Quality = 25 points
ATS Keywords = 20 points
Resume Structure = 15 points
Experience & Certifications = 10 points

Total = ATS Score out of 100.

Do not use default scores.

Different resumes must receive significantly different scores.

If resume contains fewer than 3 relevant projects,
reduce ATS score by at least 15 points.

If critical role-specific skills are missing,
reduce ATS score accordingly.

Do not give scores between 40-60 by default.

A weak resume should receive below 30 ATS.

An average resume should receive 40-70 ATS.

A strong resume should receive 75-95 ATS.

`,
              },

              {
                role: "user",

                content: resumeText,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.choices) {
        let content = data.choices[0].message.content;

        // Find first {
        const jsonStart = content.indexOf("{");

        // Find last }
        const jsonEnd = content.lastIndexOf("}") + 1;

        // Extract only JSON
        content = content.slice(jsonStart, jsonEnd);

        const aiData = JSON.parse(content);

        setAnalysis(aiData);
      } else {
        console.log(data);

        alert("AI response failed");
      }
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
