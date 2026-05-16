export default function App() {
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
      description:
        "Identify missing skills and understand what to learn next.",
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
      description:
        "Follow structured AI-based learning roadmaps step-by-step.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Guided" },
    { number: "500+", label: "Career Paths" },
    { number: "24/7", label: "AI Guidance" },
    { number: "100+", label: "Skill Recommendations" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden selection:bg-cyan-400 selection:text-black scroll-smooth">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#020817]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-wide text-cyan-400">
              WaveSights
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              AI Career Guidance Platform
            </p>
          </div>

          <div className="hidden md:flex items-center gap-10 text-gray-300 text-lg">
            <a href="#journey" className="hover:text-cyan-400 transition duration-300">
              Journey
            </a>
            <a href="#features" className="hover:text-cyan-400 transition duration-300">
              Features
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition duration-300">
              Pricing
            </a>
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold transition duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-10 pt-24 pb-20 text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm md:text-base mb-8">
            ✨ AI-Powered Personalized Guidance
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            Choose Your <span className="text-cyan-400">Future</span>
            <br />
            With AI Guidance
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
            WaveSights helps students and graduates discover the right career,
            roadmap, skills, internships, and opportunities using AI.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/20">
              Start Your Journey
            </button>

            <button className="border border-white/20 hover:border-cyan-400 hover:bg-white/5 px-8 py-4 rounded-2xl text-lg transition duration-300">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-10 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-cyan-400/40 transition duration-300"
            >
              <h2 className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">
                {item.number}
              </h2>
              <p className="text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Cards */}
      <section
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

              <button className="w-full bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500 hover:text-black px-6 py-3 rounded-2xl font-bold transition duration-300">
                Continue
              </button>
            </div>
          ))}
        </div>
      </section>

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

      {/* Pricing Section */}
      <section id="pricing" className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Simple <span className="text-cyan-400">Pricing</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-16">
            Start free and upgrade when you need advanced AI guidance.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-left hover:border-cyan-400/30 transition duration-300">
              <h3 className="text-3xl font-bold mb-4">Free Plan</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Perfect for students getting started.
              </p>

              <h4 className="text-6xl font-black mb-8">₹0</h4>

              <ul className="space-y-5 text-gray-300 mb-10 text-lg">
                <li>✔ Basic Career Guidance</li>
                <li>✔ Stream Recommendations</li>
                <li>✔ Limited AI Access</li>
                <li>✔ Career Suggestions</li>
              </ul>

              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold transition duration-300 hover:scale-[1.02]">
                Start Free
              </button>
            </div>

            <div className="relative bg-cyan-500/10 border border-cyan-400 rounded-3xl p-10 text-left shadow-2xl shadow-cyan-500/10 hover:scale-[1.01] transition duration-300">
              <div className="absolute top-5 right-5 bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-black">
                MOST POPULAR
              </div>

              <h3 className="text-3xl font-bold mb-4">Pro AI Plan</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Advanced personalized AI career planning.
              </p>

              <h4 className="text-6xl font-black mb-8">₹299</h4>
              <p className="text-gray-400 mb-8">per month</p>

              <ul className="space-y-5 text-gray-200 mb-10 text-lg">
                <li>✔ Full AI Career Roadmaps</li>
                <li>✔ Resume Guidance</li>
                <li>✔ Internship Recommendations</li>
                <li>✔ Personalized Skill Plans</li>
                <li>✔ AI Career Predictions</li>
              </ul>

              <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-2xl font-bold transition duration-300 hover:scale-[1.02]">
                Upgrade Now
              </button>
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
            Join WaveSights and get AI-powered career guidance tailored to your goals, skills, and dreams.
          </p>

          <button className="mt-10 bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-2xl text-lg font-black transition duration-300 hover:scale-105 shadow-xl shadow-cyan-500/20">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 md:px-10 py-16 text-gray-400 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-4xl font-black text-cyan-400 mb-4">
              WaveSights
            </h2>

            <p className="leading-relaxed text-gray-400 text-lg">
              AI-powered career guidance platform helping students and graduates discover the right future path.
            </p>

            <div className="flex gap-4 mt-6 text-2xl">
              <button className="hover:scale-110 transition duration-300 hover:text-cyan-400">
                🌐
              </button>
              <button className="hover:scale-110 transition duration-300 hover:text-cyan-400">
                📸
              </button>
              <button className="hover:scale-110 transition duration-300 hover:text-cyan-400">
                💼
              </button>
              <button className="hover:scale-110 transition duration-300 hover:text-cyan-400">
                🧠
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-lg">
              <a href="#journey" className="hover:text-cyan-400 transition duration-300">
                Journey
              </a>
              <a href="#features" className="hover:text-cyan-400 transition duration-300">
                Features
              </a>
              <a href="#pricing" className="hover:text-cyan-400 transition duration-300">
                Pricing
              </a>
              <a href="#" className="hover:text-cyan-400 transition duration-300">
                About Us
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Resources
            </h3>

            <div className="flex flex-col gap-4 text-lg">
              <a href="#" className="hover:text-cyan-400 transition duration-300">
                AI Career Roadmaps
              </a>
              <a href="#" className="hover:text-cyan-400 transition duration-300">
                Internship Guidance
              </a>
              <a href="#" className="hover:text-cyan-400 transition duration-300">
                Resume Builder
              </a>
              <a href="#" className="hover:text-cyan-400 transition duration-300">
                Blog & Updates
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-lg">
              <p>📧 wavesights.ai@gmail.com</p>
              <p>🌍 India</p>
              <p>🤖 AI Career Platform</p>

              <button className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold transition duration-300 hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base">
          <p className="text-gray-500">
            © 2026 WaveSights. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
