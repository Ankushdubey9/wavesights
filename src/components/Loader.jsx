export default function Loader() {

  return (

    <div className="fixed inset-0 z-[9999] bg-[#020817] flex flex-col items-center justify-center overflow-hidden">

      {/* Glow Background */}

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] animate-pulse"></div>

      {/* Rotating Rings */}

      <div className="absolute w-[300px] h-[300px] border border-cyan-400/20 rounded-full animate-spin [animation-duration:8s]"></div>

      <div className="absolute w-[220px] h-[220px] border border-blue-400/20 rounded-full animate-spin [animation-duration:6s]"></div>

      <div className="absolute w-[150px] h-[150px] border border-purple-400/20 rounded-full animate-spin [animation-duration:4s]"></div>

      {/* Logo */}

      <div className="relative z-10 flex flex-col items-center">

        <div className="w-28 h-28 rounded-[30px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_80px_rgba(0,255,255,0.4)] flex items-center justify-center text-6xl mb-8 animate-pulse">

          🚀

        </div>

        {/* Brand */}

        <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

          WaveSights

        </h1>

        {/* AI Loading */}

        <p className="mt-6 text-cyan-300 text-xl md:text-2xl font-semibold animate-pulse">

          Initializing AI Career Intelligence...

        </p>

        {/* Loading Bar */}

        <div className="mt-10 w-[320px] h-3 bg-white/10 rounded-full overflow-hidden">

          <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-[loading_3s_linear_infinite]"></div>

        </div>

      </div>

    </div>
  );
}