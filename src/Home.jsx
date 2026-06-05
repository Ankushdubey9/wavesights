import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";

// import { useState } from "react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "./firebase";

export default function App() {
  const userName = localStorage.getItem("name");
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const [joining, setJoining] = useState(false);

  const joinNewsletter = async () => {
    if (!subscriberEmail) {
      return alert("Enter email");
    }

    try {
      setJoining(true);

      await addDoc(collection(db, "subscribers"), {
        email: subscriberEmail,

        createdAt: serverTimestamp(),
      });

      alert("Joined successfully 🚀");

      setSubscriberEmail("");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setJoining(false);
    }
  };

  const [mobileMenu, setMobileMenu] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        window.location.href = "/admin";
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const journeys = [
    {
      icon: "🎓",
      title: "School Student",
      description:
        "Discover your interests, strengths, and ideal future career direction.",
    },
    {
      icon: "📘",
      title: "Intermediate Student",
      description:
        "Choose the right stream, degree, and career roadmap for your future.",
    },
    {
      icon: "💻",
      title: "B.Tech Student",
      description:
        "Get personalized guidance for placements, internships, and tech careers.",
    },
    {
      icon: "🔬",
      title: "B.Sc Student",
      description:
        "Explore careers in science, research, healthcare, analytics, and higher studies.",
    },
    {
      icon: "📊",
      title: "Commerce Student",
      description:
        "Get guidance for finance, CA, CS, banking, business, and management careers.",
    },
    {
      icon: "🎨",
      title: "Arts Student",
      description:
        "Discover opportunities in design, psychology, media, literature, and humanities.",
    },
    {
      icon: "🎯",
      title: "Graduate",
      description:
        "Find the best career opportunities, upskilling paths, and job preparation roadmap.",
    },
    {
      icon: "🚀",
      title: "Career Switcher",
      description:
        "Transition into new industries like AI, tech, design, business, and remote careers.",
    },
    {
      icon: "🏛️",
      title: "Government Exam Aspirant",
      description:
        "Get AI guidance for UPSC, SSC, Banking, Railways, and other competitive exams.",
    },
  ];

  const features = [
    {
      title: "AI Career Roadmaps",
      description:
        "Get personalized AI-generated career paths based on your goals and skills.",
    },
    {
      title: "Skill Gap Analysis",
      description: "Identify missing skills and understand what to learn next.",
    },
    {
      title: "Internship Guidance",
      description:
        "Find the right internships, projects, and preparation strategies.",
    },
    {
      title: "Resume & Portfolio Suggestions",
      description:
        "Build strong resumes and portfolios that improve job opportunities.",
    },
    {
      title: "AI Future Prediction",
      description:
        "Understand future industry trends, demand, and salary growth.",
    },
    {
      title: "Learning Paths",
      description: "Follow structured AI-based learning roadmaps step-by-step.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Guided" },
    { number: "500+", label: "Career Paths" },
    { number: "24/7", label: "AI Guidance" },
    { number: "100+", label: "Skill Recommendations" },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden selection:bg-cyan-400 selection:text-black scroll-smooth">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Navbar */}
        {/* PREMIUM NAVBAR */}
        {mobileMenu && (
          <div className="md:hidden fixed top-24 left-4 right-4 bg-[#020817] border border-white/10 rounded-3xl p-6 z-50 shadow-2xl">
            <div className="flex flex-col gap-5 text-lg">
              <a href="#journey">Journey</a>

              <a href="#features">Features</a>

              <a href="#pricing">Pricing</a>

              {userName ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>

                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth">Login</Link>
              )}
            </div>
          </div>
        )}

        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] rounded-3xl z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2">
            {/* Logo */}

            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => {
                const newCount = logoClicks + 1;

                setLogoClicks(newCount);

                if (newCount >= 5) {
                  window.location.href = "/admin";

                  setLogoClicks(0);
                }
              }}
            >
              <img
                src={logo}
                alt="WaveSights Logo"
                className="w-14 h-14 object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  WaveSights
                </h1>

                <p className="text-gray-400 text-sm md:text-sm">
                  Your AI Career Mentor
                </p>
              </div>
            </div>

            {/* Desktop Menu */}

            <div className="hidden md:flex items-center gap-10 text-gray-300 text-lg font-medium">
              <a
                href="#journey"
                className="relative hover:text-cyan-400 transition duration-300 group"
              >
                Journey
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#features"
                className="relative hover:text-cyan-400 transition duration-300 group"
              >
                Features
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>

              <a
                href="#pricing"
                className="relative hover:text-cyan-400 transition duration-300 group"
              >
                Pricing
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Right Side */}

            <div className="hidden md:flex items-center gap-5">
              {/* AI Badge */}

              {/* Login */}
              {userName ? (
                <>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 px-5 py-3 rounded-2xl text-cyan-300 font-semibold hover:scale-105 transition"
                  >
                    Dashboard 🚀
                  </Link>

                  <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-xl font-black text-white">
                      {userName?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold">{userName}</span>

                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.href = "/";
                        }}
                        className="text-xs text-red-400 hover:text-red-300 text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="text-white hover:text-cyan-400 font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 text-black px-7 py-3 rounded-2xl font-black text-lg transition"
                  >
                    Get Started 🚀
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-4xl text-white"
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Hero Section */}

        <section className="relative px-6 md:px-10 pt-24 pb-20 text-center">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm md:text-base mb-8 mt-10">
              ✨ AI-Powered Career Intelligence
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
              Build Your <span className="text-cyan-400">Future</span>
              <br />
              With AI Guidance
            </h1>

            <TypeAnimation
              sequence={[
                "AI Career Guidance 🚀",
                2000,

                "Personalized Roadmaps 🤖",
                2000,

                "Internship Preparation 💼",
                2000,

                "Resume Analysis 📄",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block mt-6 text-cyan-400 text-2xl md:text-4xl font-bold"
            />

            <p className="mt-8 text-lg md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              WaveSights helps students and graduates discover career paths,
              in-demand skills, internships, and personalized roadmaps using AI.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="#journey"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/20"
              >
                Start Your Journey
              </a>

              <button className="border border-white/20 hover:border-cyan-400 hover:bg-white/5 px-8 py-4 rounded-2xl text-lg transition duration-300">
                Explore Features
              </button>
            </div>

            {/* Ultra Modern 3D Hero Section */}

            <div className="relative mt-24 flex justify-center items-center">
              {/* Massive Glow Effects */}

              <div className="absolute w-[900px] h-[900px] bg-cyan-500/10 rounded-full blur-[180px]"></div>

              <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

              <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>

              {/* Main 3D Container */}

              <div className="relative max-w-7xl w-full">
                {/* Floating AI Orb */}

                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-2xl opacity-70 animate-pulse"></div>

                {/* Main Glass Card */}

                <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[50px] overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.08)]">
                  {/* Grid Overlay */}

                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                  </div>

                  <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 md:p-14">
                    {/* LEFT SIDE */}

                    <div className="relative z-10 pt-40">
                      {/* AI Badge */}

                      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold mb-8 shadow-lg shadow-cyan-500/10">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
                        AI Powered Career Intelligence
                      </div>

                      {/* Heading */}

                      <h2 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                        The Future Of
                        <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                          Career Growth
                        </span>
                      </h2>

                      {/* Description */}

                      <p className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                        Discover personalized AI roadmaps, internships, skill
                        analysis, mock interviews, and future career
                        opportunities with an immersive next-generation
                        platform.
                      </p>

                      {/* Buttons */}

                      <div className="mt-10 flex flex-wrap gap-5">
                        <Link
                          to={userName ? "/dashboard" : "/auth"}
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 hover:shadow-cyan-500/40 shadow-2xl text-black px-8 py-4 rounded-2xl font-black text-lg transition duration-300"
                        >
                          Launch Career 🚀
                        </Link>

                        <Link
                          to="/ai-chat"
                          className="bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-2xl text-lg transition duration-300 text-center"
                        >
                          Explore AI 🤖
                        </Link>
                      </div>

                      {/* Floating Stats

                      <div className="mt-14 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8">
                        <h3 className="text-3xl font-black text-cyan-400 mb-4">
                          🚀 Your AI Career Partner
                        </h3>

                        <p className="text-gray-300 text-lg leading-relaxed">
                          Get personalized roadmaps, resume analysis, mock
                          interviews, internship guidance and AI-powered career
                          mentoring — all in one place.
                        </p>
                      </div> */}
                    </div>

                    {/* RIGHT SIDE */}

                    <div className="relative flex justify-center items-center min-h-[500px]">
                      {/* Rotating Rings */}

                      <div className="absolute w-[500px] h-[500px] border border-cyan-400/20 rounded-full animate-spin [animation-duration:20s]"></div>

                      <div className="absolute w-[400px] h-[400px] border border-blue-400/20 rounded-full animate-spin [animation-duration:15s]"></div>

                      <div className="absolute w-[300px] h-[300px] border border-purple-400/20 rounded-full animate-spin [animation-duration:10s]"></div>

                      {/* Center AI Core */}

                      <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_100px_rgba(0,255,255,0.4)] flex items-center justify-center">
                        <div className="absolute inset-4 rounded-full bg-[#020817] flex items-center justify-center text-7xl">
                          🤖
                        </div>
                      </div>

                      {/* Floating Cards */}

                      <div className="absolute top-10 left-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-6 py-5 shadow-2xl rotate-[-8deg] hover:rotate-0 transition duration-500">
                        <h4 className="font-bold text-xl">AI Roadmaps</h4>

                        <p className="text-gray-400 mt-2 text-sm">
                          Personalized Learning Paths
                        </p>
                      </div>

                      <div className="absolute bottom-20 left-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-6 py-5 shadow-2xl rotate-[6deg] hover:rotate-0 transition duration-500">
                        <h4 className="font-bold text-xl">Mock Interviews</h4>

                        <p className="text-gray-400 mt-2 text-sm">
                          AI Voice Feedback
                        </p>
                      </div>

                      <div className="absolute top-24 right-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-6 py-5 shadow-2xl rotate-[8deg] hover:rotate-0 transition duration-500">
                        <h4 className="font-bold text-xl">Resume AI</h4>

                        <p className="text-gray-400 mt-2 text-sm">
                          ATS Optimization
                        </p>
                      </div>

                      <div className="absolute bottom-10 right-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-6 py-5 shadow-2xl rotate-[-5deg] hover:rotate-0 transition duration-500">
                        <h4 className="font-bold text-xl">Skill Analysis</h4>

                        <p className="text-gray-400 mt-2 text-sm">
                          AI Recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Accelerator */}

        <section className="px-6 md:px-10 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 mb-6">
              Trusted AI Tools For Students & Graduates
            </div>

            <h2 className="text-4xl md:text-6xl font-black">
              🚀 Accelerate Your Career
            </h2>

            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Everything you need to become internship and job ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link
              to="/resume-analyzer"
              className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">📄</div>

              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                🔥 Most Popular
              </span>

              <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                Resume Analyzer
              </h3>

              <p className="text-gray-400 text-lg">
                Get ATS score, missing skills, project feedback and resume
                improvements.
              </p>
            </Link>

            <Link
              to="/mock-interview"
              className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-8 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🎤</div>

              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                ⭐ Recommended
              </span>

              <h3 className="text-3xl font-bold text-purple-400 mb-4">
                AI Mock Interview
              </h3>

              <p className="text-gray-400 text-lg">
                Practice HR and Technical interviews with AI feedback.
              </p>
            </Link>

            <Link
              to="/ai-roadmap"
              className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-3xl p-8 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🗺️</div>

              <h3 className="text-3xl font-bold text-green-400 mb-4">
                Career Roadmap
              </h3>

              <p className="text-gray-400 text-lg">
                Get a personalized roadmap based on your goals and skills.
              </p>
            </Link>

            <Link
              to="/ai-chat"
              className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-3xl p-8 hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4">🤖</div>

              <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                WaveSights AI Coach
              </h3>

              <p className="text-gray-400 text-lg">
                Ask anything about career growth, skills and learning.
              </p>
            </Link>
          </div>
        </section>

        {/* Trust Bar

        <section className="px-6 md:px-10 py-10">
          <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center text-gray-400 text-lg md:text-xl font-semibold">
              <span className="hover:text-cyan-400 transition">
                🎓 B.Tech Students
              </span>

              <span className="hover:text-cyan-400 transition">
                💼 Career Switchers
              </span>

              <span className="hover:text-cyan-400 transition">
                🏛️ Government Aspirants
              </span>

              <span className="hover:text-cyan-400 transition">
                🚀 AI Learners
              </span>

              <span className="hover:text-cyan-400 transition">
                📊 Commerce Students
              </span>
            </div>
          </div>
        </section> */}

        {/* Journey Cards */}
        <motion.section
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
          id="journey"
          className="px-6 md:px-10 py-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black">
              Explore Your <span className="text-cyan-400">Journey</span>
            </h2>

            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              WaveSights supports students from every educational background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {journeys.map((item, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 transition duration-300 shadow-xl backdrop-blur-lg"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition duration-300">
                  {item.icon}
                </div>

                <h2 className="text-3xl font-bold mb-4">{item.title}</h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-8 min-h-[120px]">
                  {item.description}
                </p>

                <button
                  onClick={() => {
                    const isLoggedIn = localStorage.getItem("email");

                    if (isLoggedIn) {
                      localStorage.setItem("previewUserType", item.title);

                      window.location.href = "/explore-careers";
                    } else {
                      localStorage.setItem("userType", item.title);

                      window.location.href = "/auth";
                    }
                  }}
                  className="block w-full text-center bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500 hover:text-black px-6 py-3 rounded-2xl font-bold transition duration-300"
                >
                  Get Started 🚀
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="px-6 md:px-10 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black">
              Why Choose <span className="text-cyan-400">WaveSights?</span>
            </h2>

            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Designed to help students make smarter career decisions using AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-8 hover:border-cyan-400/40 transition duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl mb-6">
                  ✨
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                <p className="text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Testimonials */}

        <section className="px-6 md:px-10 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black">
              Students Love
              <span className="text-cyan-400"> WaveSights</span>
            </h2>

            <p className="mt-6 text-gray-400 text-lg">
              Real students. Real career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">👨‍💻</div>

              <p className="text-gray-300 text-lg leading-relaxed">
                “WaveSights helped me understand frontend development roadmap
                clearly.”
              </p>

              <h4 className="mt-8 text-cyan-400 font-bold text-xl">
                Ankush • B.Tech Student
              </h4>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">🎯</div>

              <p className="text-gray-300 text-lg leading-relaxed">
                “Mock interviews and AI suggestions improved my confidence
                massively.”
              </p>

              <h4 className="mt-8 text-cyan-400 font-bold text-xl">
                Priya • Career Switcher
              </h4>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">🚀</div>

              <p className="text-gray-300 text-lg leading-relaxed">
                “Best AI platform for career guidance and personalized learning
                paths.”
              </p>

              <h4 className="mt-8 text-cyan-400 font-bold text-xl">
                Rahul • AI Learner
              </h4>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 md:px-10 py-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Simple <span className="text-cyan-400">Pricing</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl mb-16">
              Start free and unlock advanced AI career guidance as WaveSights
              grows.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* FREE PLAN */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-left hover:border-cyan-400/30 transition duration-300">
                <h3 className="text-3xl font-bold mb-4">Free Plan</h3>

                <p className="text-gray-400 mb-8 text-lg">
                  Discover the right career path with AI-powered guidance.
                </p>

                <h4 className="text-6xl font-black mb-8">₹0</h4>

                <ul className="space-y-5 text-gray-300 mb-10 text-lg">
                  <li>✔ AI Career Assessment</li>
                  <li>✔ Personalized Career Suggestions</li>
                  <li>✔ Resume Score Check</li>
                  <li>✔ 3 Mock Interviews / Month</li>
                  <li>✔ Career Roadmap Preview</li>
                  <li>✔ Internship Recommendations</li>
                  <li>✔ Limited AI Mentor Access</li>
                </ul>

                <Link
                  to="/auth"
                  className="block w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold transition duration-300 hover:scale-[1.02] text-center"
                >
                  Start Free
                </Link>
              </div>

              {/* PRO PLAN */}
              <div className="relative bg-cyan-500/10 border border-cyan-400 rounded-3xl p-10 text-left shadow-2xl shadow-cyan-500/10 hover:scale-[1.01] transition duration-300">
                <div className="absolute top-5 right-5 bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-black">
                  ⭐ RECOMMENDED
                </div>

                <h3 className="text-3xl font-bold mb-4">Pro AI Plan</h3>

                <p className="text-gray-300 mb-8 text-lg">
                  Advanced personalized AI career planning.
                </p>

                <h4 className="text-5xl font-black mb-2">
                  Free for Early Users
                </h4>

                <p className="text-gray-400 mb-8">
                  Join early and unlock premium features at no cost.
                </p>

                <ul className="space-y-5 text-gray-200 mb-10 text-lg">
                  <li>🔥 Everything in Free</li>
                  <li>✔ Unlimited AI Career Mentor</li>
                  <li>✔ Unlimited Mock Interviews</li>
                  <li>✔ Complete Career Roadmaps</li>
                  <li>✔ Resume Optimization & ATS Analysis</li>
                  <li>✔ Personalized Skill Development Plans</li>
                  <li>✔ Internship Recommendations</li>
                  <li>✔ Progress Tracking Dashboard</li>
                  <li>✔ Priority Feature Access</li>
                </ul>

                <Link
                  to="/auth"
                  className="block w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-2xl font-bold transition duration-300 hover:scale-[1.02] text-center"
                >
                  Unlock Premium Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-[40px] p-10 md:p-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Start Building Your <span className="text-cyan-400">Future</span>
            </h2>

            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Join WaveSights and get AI-powered career guidance tailored to
              your goals, skills, and dreams.
            </p>

            <Link
              to="/auth"
              className="inline-block mt-10 bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-2xl text-lg font-black transition duration-300 hover:scale-105 shadow-xl shadow-cyan-500/20"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Footer */}

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
        <footer className="border-t border-white/10 px-6 md:px-10 py-16 text-gray-400 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">
                  🚀
                </div>

                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    WaveSights
                  </h2>

                  <p className="text-gray-500 text-sm">
                    AI Career Intelligence
                  </p>
                </div>
              </div>

              <p className="leading-relaxed text-gray-400 text-lg">
                Helping students and graduates make smarter career decisions
                through AI-powered guidance, personalized roadmaps, and skill
                development plans.
              </p>

              <div className="flex gap-4 mt-8">
                {["🌐", "📸", "💼", "🎥"].map((icon, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 text-2xl flex items-center justify-center transition duration-300 hover:scale-110"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Quick Links
              </h3>

              <div className="flex flex-col gap-4 text-lg">
                <a
                  href="#journey"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Journey
                </a>
                <a
                  href="#features"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Pricing
                </a>
                <Link
                  to="/about"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Resources */}

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Resources</h3>

              <div className="flex flex-col gap-4 text-lg">
                <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  AI Career Roadmaps
                </span>

                <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Resume Analysis
                </span>

                <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Mock Interviews
                </span>

                <span className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Career Assessments
                </span>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact</h3>

              <div className="flex flex-col gap-4 text-lg">
                <p>📧 wavesights.ai@gmail.com</p>
                <p>🌍 India</p>
                <p>🚀 Built for Students & Graduates</p>
                <p>🤖 AI-Powered Career Intelligence</p>

                <Link
                  to="/contact"
                  className="inline-block mt-4 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold transition duration-300 hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-[35px] p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">
                Stay Updated 🚀
              </h2>

              <p className="text-gray-400 mt-3 text-lg">
                Get AI career tips, roadmap updates, and future opportunities.
              </p>
            </div>

            <div className="flex w-full lg:w-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-cyan-400 w-full lg:w-[320px]"
              />

              <button
                onClick={joinNewsletter}
                disabled={joining}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold transition duration-300 hover:scale-105"
              >
                {joining ? "Joining..." : "Join"}
              </button>
            </div>
          </div>

          {/* Bottom Footer */}

          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © 2026 WaveSights. All rights reserved.
              </p>

              <div className="flex gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Terms & Conditions
                </Link>

                <Link
                  to="/support"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Support
                </Link>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm mt-4">
              Empowering students with AI-driven career guidance.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
