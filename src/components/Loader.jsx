
import logo from "../assets/logo.png";

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

       <div className="mb-8 relative">

  <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full animate-pulse"></div>

  <div className="relative w-36 h-36 rounded-3xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(0,255,255,0.25)]">

    <img
      src={logo}
      alt="WaveSights"
      className="w-28 h-28 object-contain"
    />

  </div>

</div>

        {/* Brand */}

        <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">

          WaveSights

        </h1>

        {/* AI Loading */}

        <p className="mt-6 text-cyan-300 text-xl md:text-2xl font-semibold animate-pulse">

          Preparing Your Career Journey...

        </p>

        {/* Loading Bar */}

        <div className="mt-10 w-[320px] h-3 bg-white/10 rounded-full overflow-hidden">

          <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-[loading_3s_linear_infinite]"></div>

        </div>

      </div>

    </div>
  );
}