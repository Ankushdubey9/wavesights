import { useState } from "react";
import Confetti from "react-confetti";
import DailyAITasks from "../components/DailyAITasks";
import roadmapData from "../data/roadmapData";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";

import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  saveProgress,
  loadProgress,
  updateLearningStreak,
} from "../firebase/progressService";

const interest = localStorage.getItem("interest");
const goal = localStorage.getItem("goal");
const skillLevel = localStorage.getItem("skillLevel");
const timeCommitment = localStorage.getItem("timeCommitment");

export default function Dashboard() {
  const userType = localStorage.getItem("userType");
  const careerGoal = localStorage.getItem("goal") || "Select Your Goal";
  const interest = localStorage.getItem("interest");

  const skillLevel = localStorage.getItem("skillLevel")?.toLowerCase();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [learningStreak, setLearningStreak] = useState(1);

  const userId = localStorage.getItem("userId") || "demoUser";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aiData = JSON.parse(localStorage.getItem("aiCareerData")) || {};

  const selectedRoadmap = aiData.roadmap || [];

  const recommendations = aiData.recommendations || [];

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const savedProgress = await loadProgress(userId);
        await updateLearningStreak(userId);
        const userRef = doc(db, "users", userId);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setLearningStreak(userSnap.data().learningStreak || 1);

          localStorage.setItem(
            "firebaseStreak",
            userSnap.data().learningStreak || 1,
          );
        }

        console.log("Loaded Progress:", savedProgress);

        const filteredProgress = savedProgress.filter((step) =>
          selectedRoadmap.some((roadmapStep) => roadmapStep.title === step),
        );

        setCompletedSteps(filteredProgress);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProgress();
  }, [userId]);

  console.log(careerGoal);

  let dashboardTitle = "";

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar */}

      <aside
        className={`fixed md:relative top-0 left-0 z-50 w-72 min-h-screen border-r border-white/10 bg-[#020817] p-6 flex-col transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
        } md:flex md:translate-x-0`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden text-white text-3xl mb-6"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />

          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              WaveSights
            </h1>

            <p className="text-gray-400 text-sm">AI Career Platform</p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left px-5 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-xl shadow-cyan-500/20">
            Dashboard
          </button>
          <Link
            to="/profile"
            className="block w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            👤 Profile
          </Link>
          {/* <button
            onClick={() => (window.location.href = "/ai-roadmap")}
            className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            AI Roadmaps
          </button> */}
          <Link
            to="/leaderboard"
            className="block w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            🏆 Leaderboard
          </Link>
          {/* <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300">
            Skill Tracker
          </button> */}

          <button
            onClick={() => navigate("/coming-soon")}
            className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            Internship Guidance
          </button>
          {/* <Link
            to="/resume-analyzer"
            className="block w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            Resume Analyzer
          </Link> */}
          {/* <Link
            to="/mock-interview"
            className="block w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            AI Mock Interview
          </Link> */}
          {/* <button
            onClick={() => (window.location.href = "/ai-chat")}
            className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            WaveSights AI
          </button> */}
          <Link
            to="/"
            className="block w-full text-center bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500 hover:text-black py-4 rounded-2xl font-bold transition duration-300"
          >
            🏠 Back to Home
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.clear();

            window.location.href = "/";
          }}
          className="mt-10 w-full bg-red-500/10 border border-red-400/20 hover:bg-red-500 hover:text-white text-red-300 py-4 rounded-2xl font-bold transition duration-300"
        >
          Logout
        </button>
      </aside>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between w-full p-5 border-b border-white/10 bg-[#020817]">
        <h1 className="text-3xl font-black text-cyan-400">WaveSights</h1>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-4xl text-white"
        >
          ☰
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 text-cyan-400 leading-tight">
              Welcome Future {interest} Expert 🚀
            </h1>

            <p className="text-gray-400 text-lg">
              Your AI-powered personalized career dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            {/* User Card */}

            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-cyan-500/30 border border-white/10">
                {localStorage.getItem("name")?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {localStorage.getItem("name")}
                </h3>

                <p className="text-gray-400 text-sm">AI Learner</p>
              </div>
            </div>

            {/* Goal Card */}

            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <p className="text-gray-400 text-sm">Current Goal</p>

              <h2 className="text-xl md:text-2xl font-bold text-cyan-400 break-words">
                {careerGoal}
              </h2>
            </div>
          </div>
        </div>

        {/* Continue Journey */}

        <div className="mb-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8">
          <h2 className="text-3xl font-black text-cyan-400 mb-4">
            🚀 Continue Your Journey
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400">Career Goal</p>
              <h3 className="text-xl font-bold">{careerGoal}</h3>
            </div>

            <div>
              <p className="text-gray-400">Progress</p>
              <h3 className="text-xl font-bold text-cyan-400">
                {selectedRoadmap.length > 0
                  ? Math.round(
                      (completedSteps.length / selectedRoadmap.length) * 100,
                    )
                  : 0}
                %
              </h3>
            </div>

            <div>
              <p className="text-gray-400">Current Streak</p>
              <h3 className="text-xl font-bold">🔥 {learningStreak} Days</h3>
            </div>
          </div>
        </div>

        {/* Career Accelerator */}

        <section className="mb-14">
          <h2 className="text-2xl md:text-4xl font-black mb-8">
            🚀 Career Accelerator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/resume-analyzer"
              className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-6 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">📄</div>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                🔥 Most Popular
              </span>

              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Resume Analyzer
              </h3>

              <p className="text-gray-400 text-sm">
                Improve ATS score and get personalized resume feedback.
              </p>
            </Link>

            <Link
              to="/mock-interview"
              className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-6 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🎤</div>
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                ⭐ Recommended
              </span>

              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Mock Interview
              </h3>

              <p className="text-gray-400 text-sm">
                Practice technical and HR interviews with AI.
              </p>
            </Link>

            <button
              onClick={() => (window.location.href = "/ai-roadmap")}
              className="text-left bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-3xl p-6 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🗺️</div>

              <h3 className="text-xl font-bold text-green-400 mb-2">
                Career Roadmap
              </h3>

              <p className="text-gray-400 text-sm">
                Follow your AI-generated learning roadmap.
              </p>
            </button>

            <button
              onClick={() => (window.location.href = "/ai-chat")}
              className="text-left bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-3xl p-6 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🤖</div>

              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                Wavesights AI
              </h3>

              <p className="text-gray-400 text-sm">
                Ask anything about career growth and learning.
              </p>
            </button>
          </div>
        </section>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Skills Learned */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-4xl font-black text-cyan-400">
              {completedSteps.length}
            </h2>

            <p className="text-gray-400 mt-2">Skills Learned</p>
          </div>

          {/* Progress */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-4xl font-black text-cyan-400">
              {selectedRoadmap.length > 0
                ? Math.min(
                    Math.round(
                      (completedSteps.length / selectedRoadmap.length) * 100,
                    ),
                    100,
                  )
                : 0}
              %
            </h2>

            <p className="text-gray-400 mt-2">Roadmap Progress</p>
          </div>

          {/* Learning Streak */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-4xl font-black text-cyan-400">
              🔥 {learningStreak}
            </h2>

            <p className="text-gray-400 mt-2">Day Learning Streak</p>
          </div>
        </div>

        {/* Roadmap Cards
        <section className="mb-14">
          <h2 className="text-2xl md:text-4xl font-black mb-8">
            AI Career Roadmaps
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400">
              Generate your personalized roadmap from the AI Roadmap page.
            </p>
          </div>
        </section> */}

        {/* Recommendations */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-4xl font-black mb-8">
            🤖 AI Recommendations
          </h2>

          {recommendations.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                🚀 No Recommendations Yet
              </h3>

              <p className="text-gray-400 mb-5">
                Generate your AI Roadmap first to unlock personalized
                recommendations.
              </p>

              <button
                onClick={() => (window.location.href = "/ai-roadmap")}
                className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold hover:scale-105 transition-all"
              >
                Generate Roadmap
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-6 hover:shadow-cyan-500/20 hover:shadow-xl transition duration-300 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">
                    {["🚀", "🔥", "💡", "🎯"][index % 4]}
                  </div>

                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-3">{item.description}</p>

                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm">
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* AI Motivation Section */}

        <div className="mb-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black text-cyan-400 mb-4">
            🔥 AI Progress Insight
          </h2>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            You completed{" "}
            <span className="text-cyan-400 font-bold">
              {completedSteps.length}
            </span>{" "}
            roadmap steps.
            {completedSteps.length > 0
              ? " Keep pushing toward your dream career 🚀"
              : " Start your first roadmap step today 🚀"}
          </p>
        </div>

        {selectedRoadmap.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl md:text-4xl font-black mb-8">
              🗺️ Personalized Career Roadmap
            </h2>

            <div className="bg-gradient-to-br from-white/5 to-cyan-500/5 border border-cyan-400/20 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">
                  {interest} Roadmap 🚀
                </h3>
              </div>
              <div className="space-y-6">
                {selectedRoadmap.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center font-black text-cyan-400 text-lg">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <h3 className="text-lg md:text-xl font-bold text-white">
                            {step.title}
                          </h3>

                          <p className="text-cyan-400 text-sm mt-1">
                            {step.phase} • {step.duration}
                          </p>

                          <p className="text-gray-400 mt-2">{step.goal}</p>

                          <div className="mt-3 space-y-1">
                            {step.tasks?.map((task, i) => (
                              <p key={i} className="text-sm text-gray-300">
                                ✅ {task}
                              </p>
                            ))}
                          </div>

                          <input
                            type="checkbox"
                            checked={completedSteps.includes(step.title)}
                            className="w-7 h-7 accent-cyan-400 cursor-pointer"
                            onChange={async () => {
                              let updatedSteps = [];

                              if (completedSteps.includes(step.title)) {
                                updatedSteps = completedSteps.filter(
                                  (item) => item !== step.title,
                                );
                              } else {
                                updatedSteps = [...completedSteps, step.title];
                              }

                              setCompletedSteps(updatedSteps);

                              try {
                                await saveProgress(userId, updatedSteps);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          />
                        </div>

                        <div className="mt-4">
                          {completedSteps.includes(step.title) ? (
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                              ✅ Completed
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                              ⏳ In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {completedSteps.length === selectedRoadmap.length &&
          selectedRoadmap.length > 0 && (
            <>
              <Confetti />

              <div className="mt-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl p-5 md:p-10 text-center animate-pulse">
                <h2 className="text-3xl md:text-6xl font-black text-cyan-400 mb-6">
                  🎉 Congratulations 🎉
                </h2>

                <div className="text-4xl md:text-6xl mb-6">🚀 🌸 🎊 ✨ 🏆</div>

                <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  You completed your {interest} roadmap successfully!
                  <br />
                  <br />
                  Keep building projects, improving consistency, and moving
                  toward your dream career 🚀
                </p>
              </div>
            </>
          )}

        <DailyAITasks />
      </main>
    </div>
  );
}
