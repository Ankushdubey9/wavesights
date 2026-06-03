export default function RoadmapResult({ roadmap }) {
  return (
    <div className="space-y-8 mt-10">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 rounded-3xl border border-cyan-500/30">

        <h1 className="text-4xl md:text-5xl font-black mb-4">
          🚀 Your Career Blueprint
        </h1>

        <p className="text-gray-300 text-lg">
          Personalized by WaveSights AI
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">🎯 Career Path</p>
            <p className="font-bold text-lg">{roadmap.careerPath}</p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">💼 Career Match</p>
            <p className="font-bold text-lg">{roadmap.careerMatch}</p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">📈 Current Level</p>
            <p className="font-bold text-lg">{roadmap.currentLevel}</p>
          </div>

        </div>
      </div>

      {/* READINESS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl">
          <h3 className="font-bold text-xl mb-2">
            🎓 Internship Readiness
          </h3>
          <p>{roadmap.internshipReadiness}</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl">
          <h3 className="font-bold text-xl mb-2">
            💼 Job Readiness
          </h3>
          <p>{roadmap.jobReadiness}</p>
        </div>

      </div>

      {/* STRENGTHS */}
      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-5">
          🔥 Your Strengths
        </h2>

        <div className="space-y-3">
          {roadmap.strengths?.map((item, index) => (
            <div
              key={index}
              className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl"
            >
              ✅ {item}
            </div>
          ))}
        </div>

      </div>

      {/* SKILL GAPS */}
      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-5">
          ⚠️ Skill Gaps To Fix
        </h2>

        <div className="space-y-3">
          {roadmap.skillGaps?.map((item, index) => (
            <div
              key={index}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
            >
              🔸 {item}
            </div>
          ))}
        </div>

      </div>

      {/* RECOMMENDATIONS */}
      <div>

        <h2 className="text-3xl font-black mb-6">
          🎯 AI Recommendations
        </h2>

        <div className="grid gap-5">

          {roadmap.recommendations?.map((rec, index) => (

            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl"
            >

              <h3 className="text-xl font-bold mb-2">
                {rec.title}
              </h3>

              <p className="text-gray-300">
                {rec.description}
              </p>

              <p className="mt-3 text-yellow-300 font-semibold">
                🔥 Priority: {rec.priority}
              </p>

              <p className="mt-2 text-gray-400">
                {rec.whyItMatters}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* ROADMAP */}
      <div>

        <h2 className="text-3xl font-black mb-6">
          🛣️ Career Roadmap
        </h2>

        <div className="space-y-6">

          {roadmap.roadmap?.map((phase, index) => (

            <div
              key={index}
              className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6"
            >

              <div className="flex justify-between flex-wrap gap-2">

                <h3 className="text-2xl font-bold text-cyan-400">
                  🚀 {phase.title}
                </h3>

                <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-sm">
                  {phase.duration}
                </span>

              </div>

              <p className="mt-4 text-gray-300">
                🎯 {phase.goal}
              </p>

              {/* Skills */}
              <div className="mt-5">

                <h4 className="font-bold mb-3">
                  🧠 Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {phase.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              {/* Tasks */}
              <div className="mt-6">

                <h4 className="font-bold mb-3">
                  ✅ Action Plan
                </h4>

                <div className="space-y-2">

                  {phase.tasks?.map((task, i) => (
                    <div key={i}>
                      ☑ {task}
                    </div>
                  ))}

                </div>

              </div>

              {/* Project */}
              <div className="mt-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                💡 <strong>Project:</strong> {phase.project}
              </div>

              {/* Milestone */}
              <div className="mt-4 bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                🏆 <strong>Milestone:</strong> {phase.milestone}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* PROJECTS */}
      <div>

        <h2 className="text-3xl font-black mb-6">
          💻 Portfolio Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {roadmap.projects?.map((project, index) => (

            <div
              key={index}
              className="bg-white/5 p-5 rounded-2xl"
            >

              <h3 className="font-bold text-xl">
                {project.title}
              </h3>

              <p className="mt-2 text-cyan-300">
                {project.difficulty}
              </p>

              <p className="mt-3 text-gray-400">
                {project.impact}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* SALARY */}
      <div>

        <h2 className="text-3xl font-black mb-6">
          💰 Salary Potential
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-green-500/10 p-5 rounded-2xl">
            <p className="font-bold">🎓 Internship</p>
            <p>{roadmap.salaryPotential?.internship}</p>
          </div>

          <div className="bg-cyan-500/10 p-5 rounded-2xl">
            <p className="font-bold">💼 Entry Level</p>
            <p>{roadmap.salaryPotential?.entryLevel}</p>
          </div>

          <div className="bg-purple-500/10 p-5 rounded-2xl">
            <p className="font-bold">🚀 After 2 Years</p>
            <p>{roadmap.salaryPotential?.after2Years}</p>
          </div>

        </div>

      </div>

      {/* NEXT ACTION */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          ⚡ Next Action
        </h2>

        <h3 className="text-xl font-bold">
          {roadmap.nextAction?.title}
        </h3>

        <p className="text-gray-300 mt-2">
          {roadmap.nextAction?.reason}
        </p>

      </div>

      {/* MOTIVATION */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          🌟 AI Motivation
        </h2>

        <p className="italic text-gray-300">
          "{roadmap.motivation}"
        </p>

      </div>

    </div>
  );
}