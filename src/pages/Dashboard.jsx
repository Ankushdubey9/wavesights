import { useState } from "react";
import Confetti from "react-confetti";
const interest = localStorage.getItem("interest");
const goal = localStorage.getItem("goal");
const skillLevel = localStorage.getItem("skillLevel");
const timeCommitment = localStorage.getItem("timeCommitment");

import roadmapData from "../data/roadmapData";

export default function Dashboard() {
  const userType = localStorage.getItem("userType");
  const careerGoal = localStorage.getItem("goal") || "Select Your Goal";
  const interest = localStorage.getItem("interest");

  const skillLevel = localStorage.getItem("skillLevel")?.toLowerCase();
  const [completedSteps, setCompletedSteps] = useState([]);

  const selectedRoadmap = roadmapData[interest]?.[skillLevel] || [];

  console.log(careerGoal);

  let dashboardTitle = "";
  let recommendations = [];

  if (userType === "School Student") {
    dashboardTitle = "Student Discovery Dashboard";

    recommendations = [
      "Discover your strengths and interests",
      "Explore science, commerce, and arts careers",
      "Build communication and computer skills",
      "Learn future technologies and AI basics",
    ];
  }

  if (userType === "Intermediate Student") {
    dashboardTitle = "Career Direction Dashboard";

    recommendations = [
      "Choose the right degree and career path",
      "Explore entrance exams and opportunities",
      "Build learning consistency and discipline",
      "Research future-demand careers",
    ];
  }

  if (userType === "B.Tech Student") {
    dashboardTitle = "Tech Career Dashboard";

    recommendations = [
      "Learn React & modern web development",
      "Practice DSA and coding interviews",
      "Build real-world portfolio projects",
      "Apply for internships and hackathons",
    ];
  }

  if (userType === "B.Sc Student") {
    dashboardTitle = "Science & Research Dashboard";

    recommendations = [
      "Explore data science and analytics",
      "Build scientific research skills",
      "Learn technical tools and software",
      "Prepare for higher studies or research roles",
    ];
  }

  if (userType === "Commerce Student") {
    dashboardTitle = "Finance & Business Dashboard";

    recommendations = [
      "Learn financial analysis and Excel",
      "Explore banking and investment careers",
      "Build communication and business skills",
      "Research CA, MBA, and finance pathways",
    ];
  }

  if (userType === "Arts Student") {
    dashboardTitle = "Creative Career Dashboard";

    recommendations = [
      "Explore psychology and media careers",
      "Build creative portfolio projects",
      "Learn content creation and storytelling",
      "Develop communication and design skills",
    ];
  }

  if (userType === "Graduate") {
    dashboardTitle = "Career Growth Dashboard";

    recommendations = [
      "Build industry-ready technical skills",
      "Improve resume and interview preparation",
      "Apply for jobs and internships regularly",
      "Develop networking and LinkedIn presence",
    ];
  }

  if (userType === "Career Switcher") {
    dashboardTitle = "Career Transition Dashboard";

    recommendations = [
      "Identify transferable skills",
      "Choose a focused new career path",
      "Build practical projects and portfolio",
      "Learn modern in-demand technologies",
    ];
  }

  if (userType === "Government Exam Aspirant") {
    dashboardTitle = "Government Exam Dashboard";

    recommendations = [
      "Practice daily current affairs",
      "Build strong revision strategy",
      "Attempt mock tests regularly",
      "Track government exam notifications",
    ];
  }
  let roadmapCards = [];

  if (userType === "School Student") {
    roadmapCards = [
      {
        title: "Career Discovery",
        description: "Explore different future career opportunities.",
        progress: "15% Complete",
        icon: "🎓",
      },
      {
        title: "Communication Skills",
        description: "Build confidence and speaking abilities.",
        progress: "25% Complete",
        icon: "🗣️",
      },
      {
        title: "Computer Basics",
        description: "Learn digital and technology fundamentals.",
        progress: "20% Complete",
        icon: "💻",
      },
    ];
  }

  if (userType === "Intermediate Student") {
    roadmapCards = [
      {
        title: "Career Exploration",
        description: "Discover the right stream and future career paths.",
        progress: "20% Complete",
        icon: "📘",
      },
      {
        title: "Skill Building",
        description: "Develop communication and analytical skills.",
        progress: "30% Complete",
        icon: "🧠",
      },
      {
        title: "Future Planning",
        description: "Research colleges and career opportunities.",
        progress: "15% Complete",
        icon: "🚀",
      },
    ];
  }

  if (userType === "B.Tech Student") {
    roadmapCards = [
      {
        title: "AI Engineer Roadmap",
        description: "Step-by-step roadmap to become an AI Engineer.",
        progress: "45% Complete",
        icon: "🤖",
      },
      {
        title: "Frontend Development",
        description: "React, Tailwind, APIs, and modern UI development.",
        progress: "30% Complete",
        icon: "💻",
      },
      {
        title: "DSA Preparation",
        description: "Improve problem-solving and coding interview skills.",
        progress: "20% Complete",
        icon: "🧠",
      },
    ];
  }

  if (userType === "B.Sc Student") {
    roadmapCards = [
      {
        title: "Research Skills",
        description: "Build scientific research and analytical thinking.",
        progress: "35% Complete",
        icon: "🔬",
      },
      {
        title: "Data Science Basics",
        description: "Learn analytics and data interpretation.",
        progress: "25% Complete",
        icon: "📊",
      },
      {
        title: "Higher Studies Planning",
        description: "Prepare for masters and research opportunities.",
        progress: "20% Complete",
        icon: "🎓",
      },
    ];
  }

  if (userType === "Commerce Student") {
    roadmapCards = [
      {
        title: "Finance Fundamentals",
        description: "Learn accounting and financial management.",
        progress: "40% Complete",
        icon: "💰",
      },
      {
        title: "Marketing Skills",
        description: "Understand branding and digital marketing.",
        progress: "30% Complete",
        icon: "📈",
      },
      {
        title: "Business Analytics",
        description: "Analyze business trends and opportunities.",
        progress: "20% Complete",
        icon: "📊",
      },
    ];
  }

  if (userType === "Arts Student") {
    roadmapCards = [
      {
        title: "Psychology Career Path",
        description: "Understand psychology and human behavior.",
        progress: "35% Complete",
        icon: "🧠",
      },
      {
        title: "Content Creation",
        description: "Build writing and storytelling skills.",
        progress: "25% Complete",
        icon: "✍️",
      },
      {
        title: "Design Fundamentals",
        description: "Learn creative and visual design principles.",
        progress: "20% Complete",
        icon: "🎨",
      },
    ];
  }

  if (userType === "Graduate") {
    roadmapCards = [
      {
        title: "Job Preparation",
        description: "Build interview and placement readiness.",
        progress: "50% Complete",
        icon: "💼",
      },
      {
        title: "Industry Skills",
        description: "Learn high-demand professional skills.",
        progress: "35% Complete",
        icon: "🚀",
      },
      {
        title: "Networking Growth",
        description: "Build LinkedIn and professional connections.",
        progress: "25% Complete",
        icon: "🌐",
      },
    ];
  }

  if (userType === "Career Switcher") {
    roadmapCards = [
      {
        title: "Career Transition",
        description: "Identify and plan your new career direction.",
        progress: "30% Complete",
        icon: "🔄",
      },
      {
        title: "Modern Skills",
        description: "Learn industry-relevant technologies and tools.",
        progress: "35% Complete",
        icon: "💻",
      },
      {
        title: "Portfolio Building",
        description: "Build projects and practical experience.",
        progress: "20% Complete",
        icon: "📂",
      },
    ];
  }

  if (userType === "Government Exam Aspirant") {
    roadmapCards = [
      {
        title: "Current Affairs",
        description: "Stay updated with daily national and world events.",
        progress: "40% Complete",
        icon: "📰",
      },
      {
        title: "Mock Test Practice",
        description: "Improve exam performance with regular tests.",
        progress: "30% Complete",
        icon: "📝",
      },
      {
        title: "Revision Strategy",
        description: "Build smart preparation and revision plans.",
        progress: "25% Complete",
        icon: "🎯",
      },
    ];
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 flex-col">
        <h1 className="text-4xl font-black text-cyan-400 mb-10">WaveSights</h1>

        <div className="space-y-4">
          <button className="w-full text-left px-5 py-4 rounded-2xl bg-cyan-500 text-black font-bold">
            Dashboard
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300">
            AI Roadmaps
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300">
            Skill Tracker
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300">
            Internship Guidance
          </button>

          <button className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300">
            Resume Analyzer
          </button>
          <button
            onClick={() => (window.location.href = "/ai-chat")}
            className="w-full text-left px-5 py-4 rounded-2xl hover:bg-white/5 transition duration-300"
          >
            WaveSights AI
          </button>
        </div>
      </aside>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between w-full p-5 border-b border-white/10 bg-[#020817]">
        <h1 className="text-3xl font-black text-cyan-400">WaveSights</h1>

        <button className="text-4xl text-white">☰</button>
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

          <div className="w-full md:w-auto bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Current Goal</p>
            <h2 className="text-xl md:text-2xl font-bold text-cyan-400 break-words">{careerGoal}</h2>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-3xl md:text-4xl font-black text-cyan-400">12</h2>
            <p className="text-gray-400 mt-2">Skills Learned</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-3xl md:text-4xl font-black text-cyan-400">5</h2>
            <p className="text-gray-400 mt-2">Projects Completed</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-3xl md:text-4xl font-black text-cyan-400">78%</h2>
            <p className="text-gray-400 mt-2">Career Progress</p>
          </div>
        </div>

        {/* Roadmap Cards */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-4xl font-black mb-8">
  AI Career Roadmaps
</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapCards.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br hover:shadow-cyan-500/20 hover:shadow-2xl from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-5 md:p-8 hover:border-cyan-400/40 transition duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl md:text-6xl mb-6">{card.icon}</div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">{card.title}</h3>

                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {card.description}
                </p>

                <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
                  <div className="bg-cyan-400 h-3 w-1/2 rounded-full"></div>
                </div>

                <p className="text-cyan-400 font-semibold">{card.progress}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-2xl md:text-4xl font-black mb-8">
  AI Recommendations
</h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="space-y-5">
              {recommendations.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/5 rounded-2xl px-4 md:px-5 py-4 hover:bg-cyan-500/10 transition duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl">
                    ✨
                  </div>

                  <p className="text-base md:text-lg text-gray-200">
  {item}
</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
        <h2 className="text-2xl md:text-4xl font-black mb-8">
  Personalized Career Roadmap
</h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">
              {interest} Roadmap
            </h3>

            <div className="space-y-5">
              {selectedRoadmap.map((step, index) => (
                <div
                  key={index}
                 className="flex flex-col md:flex-row items-start md:items-center gap-5 bg-white/5 rounded-2xl px-4 md:px-6 py-5 hover:bg-cyan-500/10 transition duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">
                    {index + 1}
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <p className="text-base md:text-lg break-words">
  {step}
</p>

                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-cyan-400"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCompletedSteps((prev) => [...prev, step]);
                        } else {
                          setCompletedSteps((prev) =>
                            prev.filter((item) => item !== step),
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
}
