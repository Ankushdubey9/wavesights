import { useState } from "react";
import axios from "axios";
import RoadmapResult from "../components/RoadmapResult";

export default function AIRoadmap() {
 const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);

    try {
      const interest = localStorage.getItem("interest") || "";

      const goal = localStorage.getItem("goal") || "";

      const skillLevel = localStorage.getItem("skillLevel") || "";

      const stream = localStorage.getItem("educationStream") || "";

      const timeCommitment =
  localStorage.getItem("timeCommitment") || "1 Hour";

const completedSkills =
  JSON.parse(
    localStorage.getItem("completedSkills") || "[]"
  );

const xp =
  localStorage.getItem("xp") || 0;

const streak =
  localStorage.getItem("streak") || 0;

      const prompt = `
You are WaveSights AI, an elite Career Mentor, Recruiter, Industry Expert, and Learning Coach.

Your mission is to create a highly personalized career roadmap for the user.

User Profile:

* Education: ${stream}
* Interest: ${interest}
* Career Goal: ${goal}
* Skill Level: ${skillLevel}
* Daily Time Available: ${timeCommitment}
* Completed Skills: ${completedSkills}
* XP Points: ${xp}
* Learning Streak: ${streak}

Instructions:

You are NOT a generic roadmap generator.

You are a world-class Career Coach, Recruiter, Hiring Manager, Industry Mentor and Learning Strategist.

Your job is to generate a premium personalized career growth plan.

Requirements:

- Analyze the user's profile deeply.
- Personalize everything.
- Focus on internships, jobs and employability.
- Focus on practical skills over theory.
- Focus on modern industry requirements for 2026.
- Recommend tools currently used in industry.
- Recommend projects that improve hiring chances.
- Recommend portfolio building activities.
- Recommend LinkedIn optimization.
- Recommend networking strategies.
- Recommend resume improvements.
- Recommend interview preparation.
- Recommend job application strategy.

Roadmap Rules:

- Generate exactly 5 roadmap phases.
- Every phase must contain:
  - title
  - duration
  - goal
  - 5 actionable tasks
  - 1 project
  - 1 milestone

- Roadmap should start from the user's current level.
- Roadmap should end at internship/job readiness.
- Every phase should build upon the previous phase.

Recommendation Rules:

- Generate at least 5 recommendations.
- Recommendations must be specific.
- Recommendations must be personalized.

Project Rules:

- Generate at least 5 projects.
- Projects must become progressively harder.
- Projects must be portfolio worthy.

Resource Rules:

- Recommend the best learning resources.
- Prefer official documentation and high quality platforms.

Salary Rules:

- Assume the user is based in India unless explicitly specified otherwise.
- Use Indian salary formats only.
- Internship salaries must be in ₹/month.
- Entry-level salaries must be in LPA.
- After 2 years salaries must be in LPA.
- Never use USD ($).
- Give realistic salary ranges for India in 2026.
- Salary estimates should be relevant to the Indian job market.
- Use current Indian industry standards for 2026.

Output Rules:

- Return ONLY valid JSON.
- Do not return markdown.
- Do not return explanations.
- Do not return code blocks.
- Do not return extra text.

Make the output feel like a premium career coach created it.

Return ONLY valid JSON.

{
  "careerPath": "",
  "careerMatch": "",
  "currentLevel": "",
  "industryReadiness": "",

  "internshipReadiness": "",
  "jobReadiness": "",

  "strengths": [
    "",
    "",
    ""
  ],

  "skillGaps": [
    "",
    "",
    ""
  ],

 "recommendations": [
  {
    "title": "",
    "description": "",
    "priority": "",
    "whyItMatters": ""
  }
],

"roadmap": [
  {
    "phase": "",
    "duration": "",
    "title": "",
    "goal": "",
    "skills": [],
    "tasks": [],
    "project": "",
    "milestone": ""
  }
],

  "projects": [
    {
      "title": "",
      "difficulty": "",
      "impact": ""
    }
  ],

 "salaryPotential": {
  "internship": "₹15K–40K/month",
  "entryLevel": "₹5–10 LPA",
  "after2Years": "₹8–18 LPA"
}

  "resources": [
    {
      "skill": "",
      "resource": ""
    }
  ],

  "weeklyPlan": [
    {
      "week": "Week 1",
      "tasks": [
        "",
        "",
        ""
      ]
    }
  ],

  "nextAction": {
    "title": "",
    "reason": ""
  },

  "motivation": ""
}
`;


      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert AI career roadmap generator.",
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
        },
      );

      const rawResponse =
  response.data.choices[0].message.content;

console.log("AI Response:", rawResponse);

try {
  const aiData = JSON.parse(rawResponse);

  localStorage.setItem(
    "aiCareerData",
    JSON.stringify(aiData)
  );

  setRoadmap(aiData);

  console.log("Saved Successfully");

} catch (error) {

  console.log("JSON Error:", error);

  console.log("Raw Response:", rawResponse);

  setRoadmap(
    "⚠️ AI returned invalid JSON. Check console."
  );
}
    } catch (error) {
      console.log(error);

      setRoadmap("⚠️ Failed to generate roadmap.");
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

   {roadmap && typeof roadmap === "object" && (
  <RoadmapResult roadmap={roadmap} />
)}
    </div>
  );
}
