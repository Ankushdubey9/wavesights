export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center bg-white/5 border border-white/10 rounded-3xl p-10">
        <div className="text-6xl mb-6">🚀</div>

        <h1 className="text-4xl font-black text-cyan-400 mb-4">
          Internship Guidance Coming Soon
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          Thank you for exploring WaveSights.
          <br />
          <br />
          We are currently building this feature to help students find
          internships, projects, and preparation strategies.
          <br />
          <br />
          Stay tuned — it will be available soon.
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}