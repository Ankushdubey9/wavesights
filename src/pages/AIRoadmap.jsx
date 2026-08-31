import { useEffect, useMemo, useState } from "react";
import { askAI } from "../services/aiService";
import { roadmapPrompt } from "../prompts/roadmapPrompt";
import { getUserContext } from "../utils/userContext";
import RoadmapResult from "../components/RoadmapResult";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import {
  getPlanLimits,
  getUserPlan,
} from "../utils/planAccess";

import { initializeUserPlan } from "../services/userPlanManager";

import UpgradeModal from "../components/UpgradeModal";

const CAREER_OPTIONS = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Engineer",
  "QA Engineer",
  "Embedded Engineer",
  "Android Developer",
  "iOS Developer",
  "UI/UX Designer",
  "Product Manager",
  "Business Analyst",
  "Blockchain Developer",
  "Game Developer",
];

const COMPANY_OPTIONS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "OpenAI",
  "Adobe",
  "Atlassian",
  "NVIDIA",
  "TCS",
  "Infosys",
  "Accenture",
  "IBM",
  "Wipro",
  "Deloitte",
  "Startup",
];

const SKILL_OPTIONS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "C++",
  "Java",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Git",
  "GitHub",
  "Machine Learning",
  "Deep Learning",
  "Data Analysis",
  "Docker",
  "AWS",
];

const LEARNING_STYLES = [
  "Videos",
  "Documentation",
  "Projects",
  "Practice",
  "Mixed",
];

export default function AIRoadmap() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const savedInterest =
    localStorage.getItem("interest") || "";

  const savedGoal =
    localStorage.getItem("goal") || "";

  const savedLevel =
    localStorage.getItem("skillLevel") ||
    "Beginner";

  const savedStream =
    localStorage.getItem("educationStream") || "";

  const savedTime =
    localStorage.getItem("timeCommitment") ||
    "2 Hours";

  const savedSkills = JSON.parse(
    localStorage.getItem("completedSkills") ||
      "[]"
  );

  const [careerGoal, setCareerGoal] = useState(
    savedGoal || savedInterest || ""
  );

  const [customGoal, setCustomGoal] =
    useState("");

  const [skillLevel, setSkillLevel] =
    useState(savedLevel);

  const [education, setEducation] =
    useState(savedStream);

  const [dailyTime, setDailyTime] =
    useState(savedTime);

  const [timeline, setTimeline] =
    useState("6 Months");

  const [target, setTarget] =
    useState("Internship");

  const [country, setCountry] =
    useState("India");

  const [dreamCompanies, setDreamCompanies] =
    useState([]);

  const [completedSkills, setCompletedSkills] =
    useState(savedSkills);

  const [learningStyle, setLearningStyle] =
    useState("Mixed");

  const [search, setSearch] =
    useState("");

  const [showCustomGoal, setShowCustomGoal] =
    useState(false);

  const [roadmap, setRoadmap] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // -----------------------------------------
  // PLAN / USAGE
  // -----------------------------------------

  const [userPlan, setUserPlan] =
    useState("free");

  const [roadmapUsage, setRoadmapUsage] =
    useState(0);

  const [showUpgradeModal, setShowUpgradeModal] =
    useState(false);

  const filteredCareers = useMemo(() => {
    if (!search.trim()) {
      return CAREER_OPTIONS;
    }

    return CAREER_OPTIONS.filter((career) =>
      career
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const selectedCareer = showCustomGoal
    ? customGoal
    : careerGoal;

  const toggleCompany = (company) => {
    setDreamCompanies((prev) =>
      prev.includes(company)
        ? prev.filter(
            (item) => item !== company
          )
        : [...prev, company]
    );
  };

  const toggleSkill = (skill) => {
    setCompletedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter(
            (item) => item !== skill
          )
        : [...prev, skill]
    );
  };

  const selectCareer = (career) => {
    setCareerGoal(career);
    setCustomGoal("");
    setShowCustomGoal(false);
  };

  const generateRoadmap = async () => {
    if (!selectedCareer.trim()) {
      alert(
        "Please select or enter your career goal."
      );
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert(
        "Please login to generate your career roadmap."
      );
      return;
    }

    try {
      // Initialize/reset monthly usage
      await initializeUserPlan(user.uid);

      // Get latest user data
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert(
          "Your account information could not be found."
        );
        return;
      }

      const userData = userSnap.data();

      // Get current plan
      const plan =
        getUserPlan(userData);

      // Get current plan limits
      const limits =
        getPlanLimits(userData);

      // Current monthly roadmap usage
      const currentUsage =
        userData.usage?.careerRoadmap || 0;

      const roadmapLimit =
        limits.careerRoadmaps;

      // Keep local state synchronized
      setUserPlan(plan);
      setRoadmapUsage(currentUsage);

      // -----------------------------------------
      // CHECK USAGE LIMIT
      // -----------------------------------------

      if (currentUsage >= roadmapLimit) {
        if (plan === "free") {
          setShowUpgradeModal(true);
        } else {
          // Pro is unlimited, so this should
          // normally never happen.
          alert(
            "⚠️ Career Roadmap is temporarily unavailable. Please try again."
          );
        }

        return;
      }

      setLoading(true);
      setRoadmap(null);

      /*
       * Save the current roadmap preferences.
       * Other WaveSights pages can use these later.
       */

      localStorage.setItem(
        "roadmapCareerGoal",
        selectedCareer
      );

      localStorage.setItem(
        "roadmapSkillLevel",
        skillLevel
      );

      localStorage.setItem(
        "roadmapEducation",
        education
      );

      localStorage.setItem(
        "roadmapDailyTime",
        dailyTime
      );

      localStorage.setItem(
        "roadmapTimeline",
        timeline
      );

      localStorage.setItem(
        "roadmapTarget",
        target
      );

      localStorage.setItem(
        "roadmapCountry",
        country
      );

      localStorage.setItem(
        "roadmapDreamCompanies",
        JSON.stringify(
          dreamCompanies
        )
      );

      localStorage.setItem(
        "roadmapCompletedSkills",
        JSON.stringify(
          completedSkills
        )
      );

      localStorage.setItem(
        "roadmapLearningStyle",
        learningStyle
      );

      const context =
        getUserContext();

      const userPrompt = `
WAVESIGHTS CAREER ROADMAP REQUEST

USER PROFILE
${context}

CURRENT ROADMAP REQUEST

Career Goal:
${selectedCareer}

Education:
${education || "Not provided"}

Current Skill Level:
${skillLevel}

Daily Available Time:
${dailyTime}

Target Timeline:
${timeline}

Primary Target:
${target}

Preferred Country:
${country}

Dream Companies:
${
  dreamCompanies.length > 0
    ? dreamCompanies.join(", ")
    : "No specific companies selected"
}

Completed Skills:
${
  completedSkills.length > 0
    ? completedSkills.join(", ")
    : "No skills selected"
}

Learning Preference:
${learningStyle}

IMPORTANT:

Create the roadmap specifically for this request.

Do NOT simply repeat the user's existing profile.

If the requested career differs from the user's previous interest,
respect the CURRENT ROADMAP REQUEST.

Use the user's current skills to determine the correct starting point.

Do not recommend skills that the user already knows unless they need
advanced knowledge of that skill.

The roadmap must fit the selected daily time and timeline.

The roadmap should optimize for the selected target:
${target}

Generate a practical, realistic and highly personalized career blueprint.
Keep the response concise enough to fit within the output limit.

Do not include unnecessary explanations outside the requested JSON.

Every JSON object, array, and string must be completely closed before finishing.

Return ONLY valid JSON.
`;

      const rawResponse =
        await askAI(
          roadmapPrompt,
          userPrompt
        );

      console.log(
        "AI Roadmap Response:",
        rawResponse
      );

      /*
       * Some models occasionally wrap JSON
       * in ```json ... ```
       */

      const cleanResponse =
        rawResponse
          .replace(
            /```json/gi,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      console.log(
        "Clean JSON:",
        cleanResponse
      );

      let aiData;

      try {
        aiData =
          JSON.parse(
            cleanResponse
          );
      } catch (jsonError) {
        console.error(
          "❌ JSON parsing failed:",
          jsonError
        );

        console.error(
          "❌ AI returned incomplete/invalid JSON:",
          cleanResponse
        );

        throw new Error(
          "AI returned incomplete JSON. Please generate the roadmap again."
        );
      }

      localStorage.setItem(
        "aiCareerData",
        JSON.stringify(aiData)
      );

      setRoadmap(aiData);

      // Count ONLY successful roadmap generation
      await updateDoc(userRef, {
        "usage.careerRoadmap":
          increment(1),
      });

      // Update local usage immediately
      setUserPlan(plan);
      setRoadmapUsage(
        currentUsage + 1
      );

      /*
       * Scroll to result after generation.
       */

      setTimeout(() => {
        document
          .getElementById(
            "roadmap-result"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);

    } catch (error) {
      console.error(
        "Roadmap Error:",
        error
      );

      setRoadmap({
        error:
          error?.message ||
          "⚠️ Failed to generate roadmap. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8 lg:p-10">

        {/* HERO */}

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-semibold mb-5">
              🤖 AI Career Operating System
            </div>

            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Build Your Career Roadmap 🚀
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-4">
              Tell WaveSights where you want to go. We'll create a
              personalized path based on your skills, time, goals and
              career target.
            </p>

          </div>

          {/* CAREER GOAL */}

          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 mb-6">

            <div className="flex items-center justify-between gap-3 mb-5">

              <div>
                <h2 className="text-2xl font-bold">
                  🎯 What do you want to become?
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Choose a career or write your own.
                </p>
              </div>

            </div>

            {/* SEARCH */}

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="🔎 Search career... e.g. AI Engineer"
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 mb-5"
            />

            {/* CAREER OPTIONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

              {filteredCareers.map(
                (career) => (

                  <button
                    key={career}
                    onClick={() =>
                      selectCareer(
                        career
                      )
                    }
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      selectedCareer === career
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-white/10"
                    }`}
                  >

                    <div className="font-semibold">
                      {career}
                    </div>

                    {selectedCareer ===
                      career && (
                      <div className="text-xs text-cyan-400 mt-1">
                        ✓ Selected
                      </div>
                    )}

                  </button>

                )
              )}

            </div>

            {/* CUSTOM CAREER */}

            <button
              onClick={() =>
                setShowCustomGoal(
                  (prev) => !prev
                )
              }
              className="mt-5 text-cyan-400 font-semibold hover:text-cyan-300"
            >
              ✍️ My career isn't listed — I'll type it
            </button>

            {showCustomGoal && (

              <input
                type="text"
                value={customGoal}
                onChange={(e) =>
                  setCustomGoal(
                    e.target.value
                  )
                }
                placeholder="Enter your career goal..."
                className="w-full mt-4 bg-black/20 border border-cyan-400/30 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            )}

          </section>

          {/* BASIC PROFILE */}

          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 mb-6">

            <h2 className="text-2xl font-bold mb-6">
              🧭 Tell us about your current position
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {/* EDUCATION */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  🎓 Education
                </label>

                <input
                  value={education}
                  onChange={(e) =>
                    setEducation(
                      e.target.value
                    )
                  }
                  placeholder="e.g. B.Tech ECE"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              {/* LEVEL */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  📊 Current Skill Level
                </label>

                <select
                  value={skillLevel}
                  onChange={(e) =>
                    setSkillLevel(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option>
                    Beginner
                  </option>

                  <option>
                    Intermediate
                  </option>

                  <option>
                    Advanced
                  </option>
                </select>
              </div>

              {/* TIME */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  ⏰ Daily Study Time
                </label>

                <select
                  value={dailyTime}
                  onChange={(e) =>
                    setDailyTime(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option>
                    30 Minutes
                  </option>

                  <option>
                    1 Hour
                  </option>

                  <option>
                    2 Hours
                  </option>

                  <option>
                    3 Hours
                  </option>

                  <option>
                    5+ Hours
                  </option>
                </select>
              </div>

              {/* TIMELINE */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  📅 Target Timeline
                </label>

                <select
                  value={timeline}
                  onChange={(e) =>
                    setTimeline(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option>
                    3 Months
                  </option>

                  <option>
                    6 Months
                  </option>

                  <option>
                    9 Months
                  </option>

                  <option>
                    12 Months
                  </option>

                  <option>
                    18 Months
                  </option>
                </select>
              </div>

              {/* TARGET */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  💼 What are you targeting?
                </label>

                <select
                  value={target}
                  onChange={(e) =>
                    setTarget(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option>
                    Internship
                  </option>

                  <option>
                    Full-time Job
                  </option>

                  <option>
                    Freelancing
                  </option>

                  <option>
                    Startup
                  </option>

                  <option>
                    Higher Studies
                  </option>
                </select>
              </div>

              {/* COUNTRY */}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  🌍 Preferred Market
                </label>

                <select
                  value={country}
                  onChange={(e) =>
                    setCountry(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option>
                    India
                  </option>

                  <option>
                    Remote Worldwide
                  </option>

                  <option>
                    USA
                  </option>

                  <option>
                    Europe
                  </option>
                </select>
              </div>

            </div>

          </section>

          {/* DREAM COMPANIES */}

          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 mb-6">

            <h2 className="text-2xl font-bold">
              🏢 Where would you like to work?
            </h2>

            <p className="text-gray-400 text-sm mt-1 mb-5">
              Select multiple companies. This helps AI personalize
              your preparation.
            </p>

            <div className="flex flex-wrap gap-3">

              {COMPANY_OPTIONS.map(
                (company) => (

                  <button
                    key={company}
                    onClick={() =>
                      toggleCompany(
                        company
                      )
                    }
                    className={`px-4 py-2 rounded-xl border transition ${
                      dreamCompanies.includes(
                        company
                      )
                        ? "bg-cyan-400 text-black border-cyan-400"
                        : "bg-white/5 border-white/10 hover:border-cyan-400"
                    }`}
                  >
                    {dreamCompanies.includes(
                      company
                    )
                      ? "✓ "
                      : ""}

                    {company}
                  </button>

                )
              )}

            </div>

          </section>

          {/* COMPLETED SKILLS */}

          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 mb-6">

            <h2 className="text-2xl font-bold">
              🧠 What do you already know?
            </h2>

            <p className="text-gray-400 text-sm mt-1 mb-5">
              Select skills you have already learned.
            </p>

            <div className="flex flex-wrap gap-3">

              {SKILL_OPTIONS.map(
                (skill) => (

                  <button
                    key={skill}
                    onClick={() =>
                      toggleSkill(
                        skill
                      )
                    }
                    className={`px-4 py-2 rounded-xl border transition ${
                      completedSkills.includes(
                        skill
                      )
                        ? "bg-purple-500 text-white border-purple-400"
                        : "bg-white/5 border-white/10 hover:border-purple-400"
                    }`}
                  >
                    {completedSkills.includes(
                      skill
                    )
                      ? "✓ "
                      : ""}

                    {skill}
                  </button>

                )
              )}

            </div>

          </section>

          {/* LEARNING STYLE */}

          <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              📚 How do you prefer to learn?
            </h2>

            <div className="flex flex-wrap gap-3">

              {LEARNING_STYLES.map(
                (style) => (

                  <button
                    key={style}
                    onClick={() =>
                      setLearningStyle(
                        style
                      )
                    }
                    className={`px-5 py-3 rounded-2xl border transition ${
                      learningStyle ===
                      style
                        ? "bg-blue-500 text-white border-blue-400"
                        : "bg-white/5 border-white/10 hover:border-blue-400"
                    }`}
                  >
                    {style}
                  </button>

                )
              )}

            </div>

          </section>

          {/* SUMMARY */}

          <section className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/20 rounded-3xl p-5 md:p-8 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              ✨ Your Roadmap Request
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-black/20 rounded-2xl p-4">

                <p className="text-gray-400 text-xs">
                  CAREER
                </p>

                <p className="font-bold mt-1">
                  {selectedCareer ||
                    "Not selected"}
                </p>

              </div>

              <div className="bg-black/20 rounded-2xl p-4">

                <p className="text-gray-400 text-xs">
                  LEVEL
                </p>

                <p className="font-bold mt-1">
                  {skillLevel}
                </p>

              </div>

              <div className="bg-black/20 rounded-2xl p-4">

                <p className="text-gray-400 text-xs">
                  TIMELINE
                </p>

                <p className="font-bold mt-1">
                  {timeline}
                </p>

              </div>

              <div className="bg-black/20 rounded-2xl p-4">

                <p className="text-gray-400 text-xs">
                  TARGET
                </p>

                <p className="font-bold mt-1">
                  {target}
                </p>

              </div>

            </div>

          </section>

          {/* GENERATE BUTTON */}

          <div className="text-center mb-12">

            <button
              onClick={
                generateRoadmap
              }
              disabled={loading}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-black font-black text-lg px-10 py-5 rounded-2xl transition-all shadow-xl"
            >
              {loading
                ? "🤖 WaveSights AI is Building Your Roadmap..."
                : "🚀 Generate My AI Roadmap"}
            </button>

            <p className="text-gray-500 text-sm mt-3">
              Your roadmap is generated specifically for your
              selected goal and current skill level.
            </p>

          </div>

          {/* RESULT */}

          <div id="roadmap-result">

            {roadmap?.error ? (

              <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-5">
                {roadmap.error}
              </div>

            ) : roadmap ? (

              <RoadmapResult
                roadmap={roadmap}
              />

            ) : null}

          </div>

        </div>

      </div>

      {/* ----------------------------------------- */}
      {/* UPGRADE MODAL */}
      {/* ----------------------------------------- */}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() =>
          setShowUpgradeModal(false)
        }
        feature="Career Roadmap"
        currentUsage={roadmapUsage}
        limit={
          userPlan === "free"
            ? 5
            : undefined
        }
      />
    </>
  );
}