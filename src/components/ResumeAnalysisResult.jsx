export default function ResumeAnalysisResult({ analysis }) {
  return (
    <div className="space-y-8 mt-10">

      {/* HERO */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 rounded-3xl border border-cyan-500/30">

        <h1 className="text-4xl font-black mb-4">
          📄 Resume Analysis Report
        </h1>

        <p className="text-gray-300">
          Powered by WaveSights AI
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">
              📊 ATS Score
            </p>

            <p className="text-3xl font-bold">
              {analysis.atsScore}/100
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">
              🎓 Internship Ready
            </p>

            <p className="text-3xl font-bold">
             {analysis.industryReadiness?.internshipReadiness || 0}%
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">
              💼 Job Ready
            </p>

            <p className="text-3xl font-bold">
             {analysis.industryReadiness?.jobReadiness || 0}%
            </p>
          </div>

        </div>
      </div>

      {/* STRENGTHS */}

      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          💪 Strengths
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.strongSkills?.map((item, i) => (
            <div
              key={i}
              className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full"
            >
              ✅ {item}
            </div>
          ))}

        </div>

      </div>

      {/* MISSING SKILLS */}

      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          ⚠️ Missing Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.roleSpecificAnalysis?.missingCriticalSkills?.map((item, i) => (
            <div
              key={i}
              className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full"
            >
              🔸 {item}
            </div>
          ))}

        </div>

      </div>

      <div className="bg-white/5 p-6 rounded-3xl">
  <h2 className="text-3xl font-black mb-4">
    🎯 Role Match Analysis
  </h2>

  <p className="text-cyan-300 text-xl font-bold">
    Match Score:
    {analysis.roleSpecificAnalysis?.roleMatch}%
  </p>

  <div className="mt-4">
    <h3 className="font-bold mb-2">
      ✅ Existing Skills
    </h3>

    {analysis.roleSpecificAnalysis?.goodExistingSkills?.map((item,i)=>(
      <div key={i}>✔ {item}</div>
    ))}
  </div>

  <div className="mt-4">
    <h3 className="font-bold mb-2">
      📚 Next Skills To Learn
    </h3>

    {analysis.roleSpecificAnalysis?.nextSkillsToLearn?.map((item,i)=>(
      <div key={i}>🚀 {item}</div>
    ))}
  </div>
</div>

{/* INTERNSHIP BLOCKERS */}

<div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    🚨 Why You're Not Getting Internships
  </h2>

  <div className="space-y-3">

    {analysis.internshipBlockers?.map((item, i) => (
      <div key={i}>
        ❌ {item}
      </div>
    ))}

  </div>

</div>

{/* ATS KEYWORDS */}

<div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    🔍 Missing ATS Keywords
  </h2>

  <div className="flex flex-wrap gap-3">

    {analysis.missingKeywords?.map((item, i) => (
      <div
        key={i}
        className="bg-yellow-500/20 px-4 py-2 rounded-full"
      >
        {item}
      </div>
    ))}

  </div>

</div>

{/* PROJECTS TO BUILD */}

<div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    💻 Projects You Should Build
  </h2>

  <div className="space-y-3">

    {analysis.recommendedProjects?.map((item, i) => (
      <div key={i}>
        🚀 {item}
      </div>
    ))}

  </div>

</div>

{/* WEAKNESS IMPACT */}

<div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    📊 Weakness Impact Analysis
  </h2>

  <div className="space-y-4">

    {analysis.weaknessImpact?.map((item, i) => (

      <div
        key={i}
        className="bg-white/5 p-4 rounded-2xl"
      >

        <h3 className="font-bold">
          ⚠ {item.skill}
        </h3>

        <p>
          Impact: {item.impact}
        </p>

        <p className="text-gray-400 mt-2">
          {item.reason}
        </p>

      </div>

    ))}

  </div>

</div>

{/* FIX TODAY */}

<div className="bg-green-500/10 border border-green-500/20 p-6 rounded-3xl">

  <h2 className="text-3xl font-black mb-4">
    ⚡ Fix These Today
  </h2>

  <div className="space-y-3">

    {analysis.resumeFixToday?.map((item, i) => (
      <div key={i}>
        ☑ {item}
      </div>
    ))}

  </div>

</div>


      {/* CAREER ROLES */}

      <div>

        <h2 className="text-3xl font-black mb-6">
          🚀 Best Career Roles
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {analysis.bestRoles?.map((role, i) => (

            <div
              key={i}
              className="bg-white/5 p-5 rounded-3xl"
            >

              <h3 className="font-bold text-xl">
                {role.role}
              </h3>

              <p className="text-cyan-300 mt-2">
                {role.match}
              </p>

              <p className="mt-3 text-gray-300">
                {role.reason}
              </p>

              <p className="mt-3">
                🎯 {role.readiness}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* IMPROVEMENTS */}

      <div className="bg-white/5 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          📈 Resume Improvements
        </h2>

        <div className="space-y-3">

          {analysis.resumeImprovements?.map((item, i) => (
            <div key={i}>
              ☑ {item}
            </div>
          ))}

        </div>

      </div>

      {/* ROADMAP */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-cyan-500/10 p-5 rounded-3xl">

          <h3 className="font-bold text-xl mb-3">
            📅 Next 30 Days
          </h3>

          {analysis.careerGrowthPlan?.next30Days?.map((item, i) => (
            <div key={i}>☑ {item}</div>
          ))}

        </div>

        <div className="bg-blue-500/10 p-5 rounded-3xl">

          <h3 className="font-bold text-xl mb-3">
            📅 Next 90 Days
          </h3>

          {analysis.careerGrowthPlan?.next90Days?.map((item, i) => (
            <div key={i}>☑ {item}</div>
          ))}

        </div>

        <div className="bg-purple-500/10 p-5 rounded-3xl">

          <h3 className="font-bold text-xl mb-3">
            📅 Next 6 Months
          </h3>

          {analysis.careerGrowthPlan?.next6Months?.map((item, i) => (
            <div key={i}>☑ {item}</div>
          ))}

        </div>

      </div>

      {/* FINAL ADVICE */}

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-3xl">

        <h2 className="text-3xl font-black mb-4">
          🌟 AI Career Coach
        </h2>

        <p className="text-gray-300 leading-relaxed">
          {analysis.finalAdvice}
        </p>

      </div>

    </div>
  );
}