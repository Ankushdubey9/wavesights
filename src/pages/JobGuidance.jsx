import { useEffect, useState } from "react";

import { askAI } from "../services/aiService";
import { jobGuidancePrompt } from "../prompts/jobGuidancePrompt";

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


const ROLE_OPTIONS = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Analyst",
  "Data Scientist",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cybersecurity Engineer",
  "QA Engineer",
  "Embedded Engineer",
];


const WORK_TYPES = [
  "Internship",
  "Full-time Job",
  "Internship + Full-time",
];


const WORK_MODES = [
  "Remote",
  "Hybrid",
  "On-site",
  "Any",
];


const EXPERIENCE_LEVELS = [
  "Student / Beginner",
  "Entry Level",
  "Intermediate",
];


const LOCATION_OPTIONS = [
  "India",
  "Remote Worldwide",
  "Any Location",
];


export default function JobGuidance() {

  const [targetRole, setTargetRole] =
    useState("Software Engineer");

  const [experienceLevel, setExperienceLevel] =
    useState("Student / Beginner");

  const [workType, setWorkType] =
    useState("Internship + Full-time");

  const [workMode, setWorkMode] =
    useState("Any");

  const [location, setLocation] =
    useState("India");

  const [skills, setSkills] =
    useState("");

  const [companies, setCompanies] =
    useState("");

  const [stipendSalary, setStipendSalary] =
    useState("");

  const [guidance, setGuidance] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // -----------------------------------------
  // USER / PLAN
  // -----------------------------------------

  const [currentUser, setCurrentUser] =
    useState(null);

  const [userPlan, setUserPlan] =
    useState("free");

  const [usage, setUsage] =
    useState(0);

  // Upgrade Modal
  const [showUpgradeModal, setShowUpgradeModal] =
    useState(false);


  // -----------------------------------------
  // LOAD USER + PLAN
  // -----------------------------------------

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged(
        async (user) => {

          setCurrentUser(user);

          if (!user) {
            setUserPlan("free");
            setUsage(0);
            return;
          }

          try {

            // Initialize/reset monthly usage
            await initializeUserPlan(
              user.uid
            );

            const userRef =
              doc(
                db,
                "users",
                user.uid
              );

            const userSnap =
              await getDoc(userRef);

            if (!userSnap.exists()) {
              return;
            }

            const userData =
              userSnap.data();

            setUserPlan(
              getUserPlan(userData)
            );

            setUsage(
              userData.usage
                ?.jobGuidance || 0
            );

          } catch (error) {

            console.error(
              "Error loading job guidance plan:",
              error
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, []);


  // -----------------------------------------
  // GENERATE GUIDANCE
  // -----------------------------------------

  const generateGuidance =
    async () => {

      if (!currentUser) {

        alert(
          "Please login to use Job & Internship Guidance."
        );

        return;

      }


      try {

        // Make sure monthly usage is initialized/reset
        await initializeUserPlan(
          currentUser.uid
        );


        const userRef =
          doc(
            db,
            "users",
            currentUser.uid
          );


        const userSnap =
          await getDoc(userRef);


        if (!userSnap.exists()) {

          alert(
            "Your account information could not be found."
          );

          return;

        }


        const userData =
          userSnap.data();


        // Current plan
        const plan =
          getUserPlan(userData);


        // Current limits
        const limits =
          getPlanLimits(userData);


        // Current monthly usage
        const currentUsage =
          userData.usage
            ?.jobGuidance || 0;


        const limit =
          limits.jobGuidance;


        // Keep local state synchronized
        setUserPlan(plan);
        setUsage(currentUsage);


        // --------------------------------
        // LIMIT CHECK
        // --------------------------------

        if (
          currentUsage >= limit
        ) {

          if (plan === "free") {

            setShowUpgradeModal(true);

          } else {

            // Pro is unlimited.
            // This is only a safety fallback.
            alert(
              "⚠️ Job Guidance is temporarily unavailable. Please try again."
            );

          }

          return;

        }


        setLoading(true);

        setGuidance(null);


        // --------------------------------
        // USER PROFILE
        // --------------------------------

        const aiCareerData =
          JSON.parse(
            localStorage.getItem(
              "aiCareerData"
            ) || "{}"
          );


        const userProfile = {

          targetRole,

          experienceLevel,

          workType,

          workMode,

          location,

          skills:
            skills ||
            "Not specified",

          targetCompanies:
            companies ||
            "Not specified",

          expectedStipendSalary:
            stipendSalary ||
            "Not specified",

          previousCareerGoal:
            aiCareerData.careerMatch ||
            "Not available",

        };


        // --------------------------------
        // AI PROMPT
        // --------------------------------

        const userPrompt = `

USER JOB & INTERNSHIP GUIDANCE REQUEST

Target Role:
${userProfile.targetRole}

Experience Level:
${userProfile.experienceLevel}

Opportunity Type:
${userProfile.workType}

Preferred Work Mode:
${userProfile.workMode}

Preferred Location:
${userProfile.location}

Current Skills:
${userProfile.skills}

Target Companies:
${userProfile.targetCompanies}

Expected Stipend / Salary:
${userProfile.expectedStipendSalary}

Previous Career Goal:
${userProfile.previousCareerGoal}

Provide a personalized job and internship strategy.

Remember:

- Do not invent current job openings.
- Do not claim that a company is currently hiring.
- Do not create fake application links.
- Focus on realistic career guidance.
- Prioritize entry-level opportunities.

`;


        // --------------------------------
        // CALL AI
        // --------------------------------

        const response =
          await askAI(
            jobGuidancePrompt,
            userPrompt
          );


        // --------------------------------
        // PARSE JSON
        // --------------------------------

        const jsonStart =
          response.indexOf("{");

        const jsonEnd =
          response.lastIndexOf("}") + 1;


        if (
          jsonStart === -1 ||
          jsonEnd === 0
        ) {

          throw new Error(
            "Invalid AI response."
          );

        }


        const cleanResponse =
          response
            .slice(
              jsonStart,
              jsonEnd
            )
            .trim();


        const data =
          JSON.parse(
            cleanResponse
          );


        // --------------------------------
        // SHOW RESULT
        // --------------------------------

        setGuidance(data);


        // --------------------------------
        // COUNT ONLY SUCCESSFUL GUIDANCE
        // --------------------------------

        await updateDoc(
          userRef,
          {
            "usage.jobGuidance":
              increment(1),
          }
        );


        // Update local usage
        setUserPlan(plan);

        setUsage(
          currentUsage + 1
        );


      } catch (error) {

        console.error(
          "Job Guidance Error:",
          error
        );

        alert(
          "Job guidance generation failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <>
      <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10">

        <div className="max-w-6xl mx-auto">


          {/* HEADER */}

          <div className="text-center mb-12">

            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-semibold mb-5">

              💼 AI Career Intelligence

            </div>


            <h1 className="text-4xl md:text-6xl font-black text-cyan-400">

              Job & Internship Guidance

            </h1>


            <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-4">

              Tell WaveSights what you're looking for and get a
              personalized strategy for finding the right jobs,
              internships and companies.

            </p>

          </div>



          {/* INPUT CARD */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 mb-8">


            <h2 className="text-2xl font-bold mb-8">

              🎯 Tell us what you're looking for

            </h2>


            <div className="grid md:grid-cols-2 gap-6">


              {/* ROLE */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Target Role

                </label>

                <select
                  value={targetRole}
                  onChange={(e) =>
                    setTargetRole(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                >

                  {ROLE_OPTIONS.map(
                    (role) => (

                      <option
                        key={role}
                        value={role}
                      >
                        {role}
                      </option>

                    )
                  )}

                </select>

              </div>



              {/* EXPERIENCE */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Experience Level

                </label>

                <select
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                >

                  {EXPERIENCE_LEVELS.map(
                    (level) => (

                      <option
                        key={level}
                        value={level}
                      >
                        {level}
                      </option>

                    )
                  )}

                </select>

              </div>



              {/* WORK TYPE */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Opportunity Type

                </label>

                <select
                  value={workType}
                  onChange={(e) =>
                    setWorkType(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                >

                  {WORK_TYPES.map(
                    (type) => (

                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>

                    )
                  )}

                </select>

              </div>



              {/* WORK MODE */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Work Mode

                </label>

                <select
                  value={workMode}
                  onChange={(e) =>
                    setWorkMode(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                >

                  {WORK_MODES.map(
                    (mode) => (

                      <option
                        key={mode}
                        value={mode}
                      >
                        {mode}
                      </option>

                    )
                  )}

                </select>

              </div>



              {/* LOCATION */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Preferred Location

                </label>

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                >

                  {LOCATION_OPTIONS.map(
                    (item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    )
                  )}

                </select>

              </div>



              {/* STIPEND */}

              <div>

                <label className="block text-gray-400 mb-2">

                  Expected Stipend / Salary

                </label>

                <input
                  value={stipendSalary}
                  onChange={(e) =>
                    setStipendSalary(
                      e.target.value
                    )
                  }
                  placeholder="e.g. ₹15k/month or ₹6 LPA"
                  className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-cyan-400"
                />

              </div>

            </div>



            {/* SKILLS */}

            <div className="mt-6">

              <label className="block text-gray-400 mb-2">

                Current Skills

              </label>

              <textarea
                value={skills}
                onChange={(e) =>
                  setSkills(
                    e.target.value
                  )
                }
                placeholder="e.g. React, JavaScript, Python, SQL, Machine Learning..."
                rows={4}
                className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
              />

            </div>



            {/* COMPANIES */}

            <div className="mt-6">

              <label className="block text-gray-400 mb-2">

                Target Companies

              </label>

              <input
                value={companies}
                onChange={(e) =>
                  setCompanies(
                    e.target.value
                  )
                }
                placeholder="e.g. TCS, Accenture, Microsoft, startups..."
                className="w-full bg-[#07111f] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

            </div>



            {/* GENERATE */}

            <div className="text-center mt-10">

              <button
                onClick={
                  generateGuidance
                }
                disabled={loading}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-black font-black text-lg px-10 py-5 rounded-2xl transition-all shadow-xl"
              >

                {loading
                  ? "🤖 WaveSights AI is analyzing..."
                  : "🚀 Get My Job Guidance"}

              </button>


              <p className="text-gray-500 text-sm mt-3">

                Free users get 5 guidance sessions per month.
                Pro users get unlimited access.

              </p>

            </div>

          </div>



          {/* RESULTS */}

          {guidance && (

            <div className="space-y-6">


              {/* READINESS */}

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8">

                <p className="text-gray-400 text-sm">

                  CAREER READINESS

                </p>

                <div className="flex items-end gap-3 mt-2">

                  <h2 className="text-6xl font-black text-cyan-400">

                    {guidance.readinessScore || 0}

                  </h2>

                  <span className="text-gray-400 mb-2">

                    / 100

                  </span>

                </div>

                <p className="text-gray-300 mt-4">

                  {guidance.summary}

                </p>

              </div>



              {/* ROLES */}

              <ResultSection
                title="🎯 Recommended Roles"
                items={
                  guidance.recommendedRoles
                }
                renderItem={(item) => (

                  <div>

                    <h3 className="text-xl font-bold text-cyan-300">

                      {item.role}

                    </h3>

                    <p className="text-gray-300 mt-2">

                      {item.reason}

                    </p>

                    <p className="text-gray-400 text-sm mt-2">

                      Difficulty:{" "}

                      {item.difficulty}

                    </p>

                    {item.skillsNeeded?.length > 0 && (

                      <p className="text-gray-400 text-sm mt-2">

                        Skills:{" "}

                        {item.skillsNeeded.join(
                          ", "
                        )}

                      </p>

                    )}

                  </div>

                )}
              />



              {/* COMPANIES */}

              <ResultSection
                title="🏢 Companies to Target"
                items={
                  guidance.recommendedCompanies
                }
                renderItem={(item) => (

                  <div>

                    <h3 className="text-xl font-bold text-cyan-300">

                      {item.company}

                    </h3>

                    <p className="text-gray-300 mt-2">

                      {item.reason}

                    </p>

                    <p className="text-gray-400 text-sm mt-2">

                      Type:{" "}

                      {item.type}

                    </p>

                  </div>

                )}
              />



              {/* SKILL GAPS */}

              <ResultSection
                title="🛠️ Skill Gaps"
                items={
                  guidance.skillGaps
                }
                renderItem={(item) => (

                  <div>

                    <h3 className="text-xl font-bold text-cyan-300">

                      {item.skill}

                    </h3>

                    <p className="text-gray-400 text-sm mt-1">

                      Importance:{" "}

                      {item.importance}

                    </p>

                    <p className="text-gray-300 mt-2">

                      {item.why}

                    </p>

                    <p className="text-gray-300 mt-2">

                      <strong>
                        How to learn:
                      </strong>{" "}

                      {item.howToLearn}

                    </p>

                  </div>

                )}
              />



              {/* APPLICATION STRATEGY */}

              <TextListSection
                title="📈 Application Strategy"
                items={
                  guidance.applicationStrategy
                }
              />



              {/* RESUME */}

              <TextListSection
                title="📄 Resume Advice"
                items={
                  guidance.resumeAdvice
                }
              />



              {/* INTERVIEW */}

              <TextListSection
                title="🎤 Interview Preparation"
                items={
                  guidance.interviewPreparation
                }
              />



              {/* PLATFORMS */}

              <ResultSection
                title="🔎 Recommended Platforms"
                items={
                  guidance.recommendedPlatforms
                }
                renderItem={(item) => (

                  <div>

                    <h3 className="text-xl font-bold text-cyan-300">

                      {item.platform}

                    </h3>

                    <p className="text-gray-300 mt-2">

                      {item.purpose}

                    </p>

                  </div>

                )}
              />



              {/* NEXT ACTIONS */}

              <TextListSection
                title="🚀 Your Next Actions"
                items={
                  guidance.nextActions
                }
              />

            </div>

          )}

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
        feature="Job & Internship Guidance"
        currentUsage={usage}
        limit={
          userPlan === "free"
            ? 5
            : undefined
        }
      />

    </>

  );
}



/* ================================================= */
/* RESULT SECTION */
/* ================================================= */

function ResultSection({
  title,
  items,
  renderItem,
}) {

  if (!items?.length) {
    return null;
  }

  return (

    <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

      <h2 className="text-2xl font-bold text-white mb-6">

        {title}

      </h2>


      <div className="space-y-5">

        {items.map(
          (item, index) => (

            <div
              key={index}
              className="bg-black/20 border border-white/10 rounded-2xl p-5"
            >

              {renderItem(item)}

            </div>

          )
        )}

      </div>

    </section>

  );

}



/* ================================================= */
/* TEXT LIST SECTION */
/* ================================================= */

function TextListSection({
  title,
  items,
}) {

  if (!items?.length) {
    return null;
  }

  return (

    <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">

      <h2 className="text-2xl font-bold text-white mb-6">

        {title}

      </h2>


      <ul className="space-y-4">

        {items.map(
          (item, index) => (

            <li
              key={index}
              className="bg-black/20 border border-white/10 rounded-2xl p-5 text-gray-300"
            >

              <span className="text-cyan-400 font-bold mr-2">
                {index + 1}.
              </span>

              {item}

            </li>

          )
        )}

      </ul>

    </section>

  );

}