import { useState } from "react";
import { askAI } from "../services/aiService";
import { roadmapPrompt } from "../prompts/roadmapPrompt";
import { getUserContext } from "../utils/userContext";
import RoadmapResult from "../components/RoadmapResult";

export default function AIRoadmap() {
 const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);

    try {
     

      
const context = getUserContext();

const userPrompt = `
${context}

Generate a highly personalized career roadmap.

The roadmap should:

- Start from the user's current level.
- End with internship/job readiness.
- Be completely personalized.
- Focus on practical learning.
- Include modern technologies.
- Include portfolio projects.
- Include certifications.
- Include interview preparation.
- Include job strategy.
- Include LinkedIn strategy.
- Include GitHub strategy.
- Include open-source contribution.
- Include networking.
- Include timeline.
- Include salary progression.
- Include milestones.
- Include weekly action plan.

Return ONLY valid JSON.
`;

const rawResponse = await askAI(
  roadmapPrompt,
  userPrompt
);

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
