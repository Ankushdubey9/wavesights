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
        <p className="text-gray-300 mt-3 max-w-3xl">
  {roadmap.careerSummary?.careerDescription}
</p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">🎯 Career Path</p>
            <p className="font-bold text-lg">{roadmap.careerSummary?.careerTitle}</p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">💼 Career Match</p>
            <p className="font-bold text-lg">{roadmap.careerSummary?.careerMatchScore}%</p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">📈 Current Level</p>
            <p className="font-bold text-lg">{roadmap.currentAssessment?.currentLevel}</p>
          </div>

        </div>
      </div>

      {/* READINESS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl">
          <h3 className="font-bold text-xl mb-2">
            🎓 Internship Readiness
          </h3>
          <p>{roadmap.currentAssessment?.internshipReadiness}%</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl">
          <h3 className="font-bold text-xl mb-2">
            💼 Job Readiness
          </h3>
          <p>{roadmap.currentAssessment?.jobReadiness}%</p>
        </div>

      </div>

      {/* STRENGTHS */}
      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-5">
          🔥 Your Strengths
        </h2>

      <div className="space-y-3">

  {roadmap.currentAssessment?.strengths?.length > 0 ? (

    roadmap.currentAssessment.strengths.map((item, index) => (

      <div
        key={index}
        className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl"
      >
        ✅ {item}
      </div>

    ))

  ) : (

    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-gray-300">
      💡 Your strengths will become clearer as you complete projects,
      assessments, and skill-building activities.
    </div>

  )}

</div>

      </div>

      {/* SKILL GAPS */}
      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-5">
          ⚠️ Skill Gaps To Fix
        </h2>

        <div className="space-y-3">
        {roadmap.currentAssessment?.skillGaps?.map((item, index) => (
            <div
              key={index}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
            >
              🔸 {item}
            </div>
          ))}
        </div>

      </div>
{/* AI RECOMMENDATIONS */}
<div>

  <h2 className="text-3xl font-black mb-6">
    🎯 AI Recommendations
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {roadmap.technicalSkills?.map((skill, index) => (

      <div
        key={index}
        className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl"
      >

        <h3 className="text-xl font-bold mb-2">
          🧠 {skill.skill}
        </h3>

        <p className="text-gray-300">
          {skill.learningReason}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">

          <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-sm">
            Priority: {skill.priority}
          </span>

          <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
            Difficulty: {skill.difficulty}
          </span>

          <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm">
            Importance: {skill.industryImportance}
          </span>

        </div>

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

          {roadmap.careerRoadmap?.map((phase, index) => (

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
{phase.project && (
  <div className="mt-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">

    <h4 className="font-bold text-lg mb-2">
      💡 Project: {phase.project.title}
    </h4>

    <p className="text-gray-300">
      {phase.project.description}
    </p>

    <p className="mt-2">
      <span className="font-semibold">Difficulty:</span>{" "}
      {phase.project.difficulty}
    </p>

    {phase.project.techStack && (
      <div className="flex flex-wrap gap-2 mt-3">
        {phase.project.techStack.map((tech, i) => (
          <span
            key={i}
            className="bg-purple-500/20 px-3 py-1 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    )}

  </div>
)}

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

    {roadmap.projectPortfolio?.map((project, index) => (

      <div
        key={index}
        className="bg-white/5 border border-white/10 p-6 rounded-2xl"
      >

        <h3 className="font-bold text-xl">
          {project.title}
        </h3>

        <p className="mt-2 text-cyan-300">
          🎯 Difficulty: {project.difficulty}
        </p>

        <p className="mt-2 text-gray-400">
          🏭 Industry Relevance: {project.industryRelevance}
        </p>

        <p className="mt-2 text-gray-400">
          📄 Resume Impact: {project.resumeImpact}
        </p>

        <p className="mt-2 text-gray-400">
          🐙 GitHub Impact: {project.githubImpact}
        </p>

        <p className="mt-2 text-gray-400">
          ⏱️ Estimated Time: {project.estimatedTime}
        </p>

        {project.skillsCovered?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">

            {project.skillsCovered.map((skill, i) => (

              <span
                key={i}
                className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>

            ))}

          </div>
        )}

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
      <p>{roadmap.salaryRoadmap?.internship}</p>
    </div>

    <div className="bg-cyan-500/10 p-5 rounded-2xl">
      <p className="font-bold">💼 Entry Level</p>
      <p>{roadmap.salaryRoadmap?.entryLevel}</p>
    </div>

    <div className="bg-purple-500/10 p-5 rounded-2xl">
      <p className="font-bold">🚀 After 2 Years</p>
      <p>{roadmap.salaryRoadmap?.after2Years}</p>
    </div>

  </div>

</div>
{/* NEXT ACTION */}
<div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    ⚡ Your Next Action
  </h2>

  <h3 className="text-xl font-bold">
    Start with: {roadmap.currentAssessment?.skillGaps?.[0] || "your highest-priority skill"}
  </h3>

  <p className="text-gray-300 mt-2">
    Focus on this skill first because it is one of the current gaps identified
    by WaveSights AI.
  </p>

</div>

   {/* MOTIVATION */}
<div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    🌟 AI Motivation
  </h2>

  <p className="text-xl font-semibold text-white italic">
    "Your career is built one skill, one project, and one consistent step at a time."
  </p>

  <p className="text-gray-300 mt-3">
    Use this roadmap as your guide, but focus on completing each milestone
    instead of trying to learn everything at once.
  </p>

</div>
  


    </div>
  );
}