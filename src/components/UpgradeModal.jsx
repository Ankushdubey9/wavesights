import { useNavigate } from "react-router-dom";

export default function UpgradeModal({
  isOpen,
  onClose,
  feature = "this feature",
  currentUsage,
  limit,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose?.();
    navigate("/pricing");
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#07111f] border border-cyan-400/30 rounded-3xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-3xl mb-6">
          🔒
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Free Limit Reached
        </h2>

        <p className="text-gray-400 mt-3 leading-relaxed">
          You've reached your Free plan limit for{" "}
          <span className="text-cyan-400 font-semibold">
            {feature}
          </span>
          .
        </p>

        {/* Usage */}
        {typeof currentUsage === "number" &&
          typeof limit === "number" && (
            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">
                  Monthly usage
                </span>

                <span className="text-white font-bold">
                  {currentUsage} / {limit}
                </span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (currentUsage / limit) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

        {/* Pro Card */}
        <div className="mt-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-black text-cyan-400">
                ⭐ Pro AI
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Unlock the complete WaveSights experience
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-white">
                ₹99
              </div>

              <div className="text-gray-500 text-xs">
                /month
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 text-gray-300 text-sm">
            <div>✓ Unlimited AI Mentor</div>
            <div>✓ Unlimited Mock Interviews</div>
            <div>✓ Unlimited Resume Analysis</div>
            <div>✓ Unlimited Career Roadmaps</div>
            <div>✓ Unlimited Job & Internship Guidance</div>
            <div>✓ Advanced AI Career Features</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-7">
          <button
            onClick={handleUpgrade}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-2xl transition hover:scale-[1.02]"
          >
            Upgrade to Pro AI →
          </button>

          <button
            onClick={onClose}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-semibold py-4 rounded-2xl transition"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-gray-600 text-xs text-center mt-5">
          You can continue using your Free plan or upgrade whenever
          you're ready.
        </p>
      </div>
    </div>
  );
}