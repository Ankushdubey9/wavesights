import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";

import {
  getPlanLimits,
  getUserPlan,
} from "../utils/planAccess";

import { initializeUserPlan } from "../services/userPlanManager";

import UpgradeModal from "../components/UpgradeModal";

export default function SkillTracker() {
  const [currentUser, setCurrentUser] = useState(null);

  const [userPlan, setUserPlan] = useState("free");

  const [roadmap, setRoadmap] = useState(null);

  const [completedSkills, setCompletedSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  // Pro upgrade modal
  const [showUpgrade, setShowUpgrade] = useState(false);

  // -----------------------------------------
  // LOAD USER + CHECK PLAN + ROADMAP + SKILLS
  // -----------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setCurrentUser(user);

        if (!user) {
          setLoading(false);
          setError("Please login to use Skill Tracker.");
          return;
        }

        try {
          // Initialize user plan/month
          await initializeUserPlan(user.uid);

          // Get Firebase user data
          const userRef = doc(db, "users", user.uid);

          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            setLoading(false);
            setError("Your account information could not be found.");
            return;
          }

          const userData = userSnap.data();

          // -----------------------------------------
          // PLAN CHECK
          // -----------------------------------------

          const plan = getUserPlan(userData);

          const limits = getPlanLimits(userData);

          setUserPlan(plan);

          // Skill Tracker is Pro-only
          if (!limits?.skillTracking) {
            setShowUpgrade(true);
            setLoading(false);
            return;
          }

          // -----------------------------------------
          // GET AI-GENERATED ROADMAP
          // -----------------------------------------

          const savedAIData =
            localStorage.getItem("aiCareerData");

          if (!savedAIData) {
            setError(
              "No AI Career Roadmap found. Generate your roadmap first."
            );

            setLoading(false);
            return;
          }

          const aiData = JSON.parse(savedAIData);

          setRoadmap(aiData);

          // -----------------------------------------
          // LOAD SAVED SKILL PROGRESS
          // -----------------------------------------

          const progressRef = doc(
            db,
            "users",
            user.uid,
            "skillTracker",
            "progress"
          );

          const progressSnap = await getDoc(progressRef);

          if (progressSnap.exists()) {
            setCompletedSkills(
              progressSnap.data().completedSkills || []
            );
          }
        } catch (err) {
          console.error(
            "Skill Tracker loading error:",
            err
          );

          setError("Unable to load Skill Tracker.");
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // -----------------------------------------
  // EXTRACT SKILLS FROM AI ROADMAP
  // -----------------------------------------

  const allSkills = useMemo(() => {
    if (!roadmap) {
      return [];
    }

    const skillMap = new Map();

    // Skills from career roadmap phases
    roadmap.careerRoadmap?.forEach(
      (phase, phaseIndex) => {
        phase.skills?.forEach((skill) => {
          if (!skill) return;

          const normalized = skill.trim();

          if (!normalized) return;

          if (!skillMap.has(normalized.toLowerCase())) {
            skillMap.set(normalized.toLowerCase(), {
              name: normalized,
              phase:
                phase.title ||
                `Phase ${phaseIndex + 1}`,
              duration:
                phase.duration || "",
              priority: "Required",
            });
          }
        });
      }
    );

    // Skills from technicalSkills
    roadmap.technicalSkills?.forEach((skill) => {
      if (!skill?.skill) return;

      const normalized = skill.skill.trim();

      if (!normalized) return;

      const key = normalized.toLowerCase();

      if (!skillMap.has(key)) {
        skillMap.set(key, {
          name: normalized,
          phase: "Technical Skills",
          duration: "",
          priority:
            skill.priority || "Recommended",
          reason:
            skill.learningReason || "",
          difficulty:
            skill.difficulty || "",
          importance:
            skill.industryImportance || "",
        });
      }
    });

    return Array.from(skillMap.values());
  }, [roadmap]);

  // -----------------------------------------
  // FILTER SKILLS
  // -----------------------------------------

  const filteredSkills = useMemo(() => {
    let skills = [...allSkills];

    if (filter === "completed") {
      skills = skills.filter((skill) =>
        completedSkills.includes(skill.name)
      );
    }

    if (filter === "pending") {
      skills = skills.filter(
        (skill) =>
          !completedSkills.includes(skill.name)
      );
    }

    if (search.trim()) {
      skills = skills.filter((skill) =>
        skill.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return skills;
  }, [
    allSkills,
    completedSkills,
    filter,
    search,
  ]);

  // -----------------------------------------
  // PROGRESS
  // -----------------------------------------

  const completedCount = allSkills.filter((skill) =>
    completedSkills.includes(skill.name)
  ).length;

  const totalSkills = allSkills.length;

  const progress =
    totalSkills > 0
      ? Math.round(
          (completedCount / totalSkills) * 100
        )
      : 0;

  // -----------------------------------------
  // SKILL GAP
  // -----------------------------------------

  const skillGaps = allSkills.filter(
    (skill) =>
      !completedSkills.includes(skill.name)
  );

  // -----------------------------------------
  // CURRENT PHASE
  // -----------------------------------------

  const currentPhase =
    roadmap?.careerRoadmap?.find((phase) =>
      phase.skills?.some(
        (skill) =>
          !completedSkills.includes(skill)
      )
    );

  // -----------------------------------------
  // TOGGLE SKILL
  // -----------------------------------------

  const toggleSkill = async (skillName) => {
    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    // Extra protection
    if (userPlan !== "pro") {
      setShowUpgrade(true);
      return;
    }

    const isCompleted =
      completedSkills.includes(skillName);

    const updatedSkills = isCompleted
      ? completedSkills.filter(
          (skill) => skill !== skillName
        )
      : [...completedSkills, skillName];

    // Update UI immediately
    setCompletedSkills(updatedSkills);

    setSaving(true);

    try {
      const progressRef = doc(
        db,
        "users",
        currentUser.uid,
        "skillTracker",
        "progress"
      );

      await setDoc(
        progressRef,
        {
          completedSkills: updatedSkills,

          totalSkills: allSkills.length,

          completedCount:
            updatedSkills.filter((skill) =>
              allSkills.some(
                (item) =>
                  item.name === skill
              )
            ).length,

          progress:
            allSkills.length > 0
              ? Math.round(
                  (updatedSkills.filter(
                    (skill) =>
                      allSkills.some(
                        (item) =>
                          item.name === skill
                      )
                  ).length /
                    allSkills.length) *
                    100
                )
              : 0,

          updatedAt: new Date(),
        },
        {
          merge: true,
        }
      );
    } catch (err) {
      console.error(
        "Error saving skill:",
        err
      );

      // Revert UI if save fails
      setCompletedSkills(completedSkills);

      alert(
        "Could not save your skill progress."
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-5 animate-pulse">
            🧠
          </div>

          <h2 className="text-2xl font-bold text-cyan-400">
            Loading Skill Tracker...
          </h2>

          <p className="text-gray-400 mt-2">
            Reading your AI career roadmap.
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // FREE USER → PRO LOCK
  // -----------------------------------------

  if (userPlan !== "pro") {
    return (
      <div className="min-h-screen bg-[#020617] text-white p-5 md:p-10">
        <div className="max-w-6xl mx-auto">

          <div className="min-h-[70vh] flex items-center justify-center">

            <div className="w-full max-w-2xl text-center bg-white/5 border border-cyan-400/20 rounded-3xl p-8 md:p-12">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-4xl mb-6">
                🔒
              </div>

              <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-semibold mb-5">
                ⭐ PRO AI FEATURE
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white">
                Skill Tracker
              </h1>

              <p className="text-gray-400 text-lg mt-4 leading-relaxed">
                Track your personalized career skills,
                monitor your progress, identify skill gaps,
                and see how close you are to your career goal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-cyan-400 text-xl">
                    📊
                  </span>

                  <p className="font-bold mt-2">
                    Skill Progress
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Track your learning progress.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-cyan-400 text-xl">
                    🎯
                  </span>

                  <p className="font-bold mt-2">
                    Skill Gaps
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Discover what you still need to learn.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-cyan-400 text-xl">
                    🗺️
                  </span>

                  <p className="font-bold mt-2">
                    Roadmap Integration
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Connect your skills with your roadmap.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-cyan-400 text-xl">
                    🚀
                  </span>

                  <p className="font-bold mt-2">
                    Career Readiness
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Understand your overall progress.
                  </p>
                </div>

              </div>

              <button
                onClick={() => setShowUpgrade(true)}
                className="mt-8 w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-2xl transition hover:scale-[1.02]"
              >
                Upgrade to Pro AI →
              </button>

              <p className="text-gray-600 text-xs mt-4">
                Unlock Skill Tracker with Pro AI.
              </p>

            </div>

          </div>

        </div>

        <UpgradeModal
          isOpen={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          feature="Skill Tracker"
        />
      </div>
    );
  }

  // -----------------------------------------
  // ERROR
  // -----------------------------------------

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-white p-5 md:p-10">

        <div className="max-w-6xl mx-auto">

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6">

            <h2 className="text-xl font-bold text-yellow-400">
              ⚠️ No Roadmap Available
            </h2>

            <p className="text-gray-300 mt-2">
              {error}
            </p>

            <button
              onClick={() =>
                (window.location.href =
                  "/ai-roadmap")
              }
              className="mt-5 bg-cyan-400 text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 transition"
            >
              🗺️ Generate Roadmap
            </button>

          </div>

        </div>
      </div>
    );
  }

  // -----------------------------------------
  // MAIN UI
  // -----------------------------------------

  return (
    <div className="min-h-screen bg-[#020617] text-white p-5 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-semibold mb-5">
            🧠 AI Skill Development
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-cyan-400">
            Skill Tracker
          </h1>

          <p className="text-gray-400 text-lg mt-3 max-w-3xl">
            Track the skills from your personalized AI
            career roadmap and see exactly how far you've
            progressed.
          </p>

        </div>

        {/* PROGRESS CARD */}

        <section className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-6 md:p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-gray-400 text-sm">
                CURRENT CAREER PATH
              </p>

              <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                {roadmap?.careerSummary
                  ?.careerTitle ||
                  localStorage.getItem("goal") ||
                  "Your Career Path"}
              </h2>

              <p className="text-gray-400 mt-2">
                {roadmap?.careerSummary
                  ?.careerDescription ||
                  "Build your skills step by step."}
              </p>

            </div>

            <div className="text-center">

              <div className="text-5xl font-black text-cyan-400">
                {progress}%
              </div>

              <p className="text-gray-400 text-sm mt-1">
                Skill Progress
              </p>

            </div>

          </div>

          {/* PROGRESS BAR */}

          <div className="mt-8">

            <div className="flex justify-between text-sm mb-2">

              <span className="text-gray-400">
                {completedCount} of {totalSkills} skills completed
              </span>

              <span className="text-cyan-400 font-bold">
                {progress}%
              </span>

            </div>

            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </section>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400">
              Total Skills
            </p>

            <h3 className="text-4xl font-black text-cyan-400 mt-2">
              {totalSkills}
            </h3>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

            <p className="text-gray-400">
              Completed
            </p>

            <h3 className="text-4xl font-black text-green-400 mt-2">
              {completedCount}
            </h3>

          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">

            <p className="text-gray-400">
              Remaining
            </p>

            <h3 className="text-4xl font-black text-red-400 mt-2">
              {skillGaps.length}
            </h3>

          </div>

        </div>

        {/* CURRENT PHASE */}

        {currentPhase && (

          <section className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6 md:p-8 mb-8">

            <p className="text-purple-300 text-sm font-bold">
              ⚡ CURRENT FOCUS
            </p>

            <h2 className="text-2xl md:text-3xl font-black mt-2">
              {currentPhase.title}
            </h2>

            <p className="text-gray-300 mt-2">
              {currentPhase.goal}
            </p>

            {currentPhase.duration && (
              <p className="text-gray-400 mt-3">
                ⏱️ {currentPhase.duration}
              </p>
            )}

          </section>

        )}

        {/* SEARCH + FILTER */}

        <section className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="🔎 Search skills..."
              className="flex-1 bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <div className="flex flex-wrap gap-2">

              {[
                ["all", "All"],
                ["pending", "Pending"],
                ["completed", "Completed"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  onClick={() =>
                    setFilter(value)
                  }
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    filter === value
                      ? "bg-cyan-400 text-black"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-400"
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

          </div>

        </section>

        {/* SKILL LIST */}

        <section className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl md:text-3xl font-black">
              🛠️ Your Skills
            </h2>

            {saving && (
              <span className="text-cyan-400 text-sm">
                Saving...
              </span>
            )}

          </div>

          {filteredSkills.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

              <p className="text-gray-400">
                No skills found.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredSkills.map(
                (skill, index) => {

                  const completed =
                    completedSkills.includes(
                      skill.name
                    );

                  return (

                    <div
                      key={`${skill.name}-${index}`}
                      className={`bg-white/5 border rounded-3xl p-5 md:p-6 transition ${
                        completed
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-white/10 hover:border-cyan-400/30"
                      }`}
                    >

                      <div className="flex items-start gap-4">

                        {/* CHECKBOX */}

                        <button
                          onClick={() =>
                            toggleSkill(
                              skill.name
                            )
                          }
                          className={`w-10 h-10 rounded-xl border flex-shrink-0 flex items-center justify-center text-xl transition ${
                            completed
                              ? "bg-green-500 border-green-400 text-black"
                              : "bg-white/5 border-white/20 hover:border-cyan-400"
                          }`}
                        >
                          {completed ? "✓" : ""}
                        </button>

                        {/* CONTENT */}

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                            <h3
                              className={`text-xl font-bold ${
                                completed
                                  ? "text-green-400"
                                  : "text-white"
                              }`}
                            >
                              {skill.name}
                            </h3>

                            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 w-fit">
                              {skill.priority ||
                                "Required"}
                            </span>

                          </div>

                          <p className="text-gray-400 text-sm mt-2">
                            📍 {skill.phase}
                          </p>

                          {skill.duration && (
                            <p className="text-gray-500 text-sm mt-1">
                              ⏱️ {skill.duration}
                            </p>
                          )}

                          {skill.reason && (
                            <p className="text-gray-300 mt-3">
                              {skill.reason}
                            </p>
                          )}

                          {skill.difficulty && (
                            <span className="inline-block mt-3 mr-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs">
                              Difficulty:{" "}
                              {skill.difficulty}
                            </span>
                          )}

                          {skill.importance && (
                            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs">
                              Industry:{" "}
                              {skill.importance}
                            </span>
                          )}

                          <div className="mt-4">

                            {completed ? (

                              <span className="text-green-400 text-sm font-semibold">
                                ✅ Skill completed
                              </span>

                            ) : (

                              <span className="text-yellow-400 text-sm">
                                ⏳ Skill remaining
                              </span>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </section>

        {/* SKILL GAP */}

        {skillGaps.length > 0 && (

          <section className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 md:p-8 mb-8">

            <h2 className="text-2xl md:text-3xl font-black text-red-300">
              ⚠️ Skills You Still Need
            </h2>

            <p className="text-gray-400 mt-2">
              These skills are currently incomplete in your roadmap.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              {skillGaps
                .slice(0, 12)
                .map((skill) => (

                  <span
                    key={skill.name}
                    className="px-4 py-2 rounded-xl bg-black/20 border border-red-500/20 text-gray-300"
                  >
                    🔸 {skill.name}
                  </span>

                ))}

            </div>

          </section>

        )}

        {/* COMPLETION */}

        {progress === 100 && (

          <section className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-8 text-center">

            <div className="text-6xl mb-4">
              🎉
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-cyan-400">
              All Skills Completed!
            </h2>

            <p className="text-gray-300 text-lg mt-4">
              Amazing work. You've completed the skills
              in your current AI career roadmap.
            </p>

          </section>

        )}

      </div>

    </div>
  );
}