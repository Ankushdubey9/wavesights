export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative flex flex-col items-center">

        {/* Spinner */}

        <div className="relative w-24 h-24">

          <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>

          <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-blue-500 animate-spin [animation-duration:1.5s]"></div>

          <div className="absolute inset-6 rounded-full bg-cyan-400/20 backdrop-blur-md flex items-center justify-center">

            <span className="text-2xl">
              🚀
            </span>

          </div>

        </div>

        {/* Text */}

        <h2 className="mt-8 text-3xl font-black text-white">

          Loading Dashboard...

        </h2>

        <p className="mt-2 text-gray-400">

          Fetching latest platform analytics

        </p>

        {/* Progress Bar */}

        <div className="mt-8 w-72 h-2 rounded-full bg-white/10 overflow-hidden">

          <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse"></div>

        </div>

      </div>

    </div>
  );
}