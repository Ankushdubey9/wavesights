import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const googleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,

          email: user.email,

          xp: 0,

          streak: 1,

          badge: "🌱 Starter Badge",

          userType: "",

          educationStream: "",

          interest: "",

          goal: "",

          skillLevel: "",

          timeCommitment: "",

          createdAt: new Date(),
        });

        navigate("/onboarding/user-type");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("FULL ERROR:", error);

      alert(error.code + "\n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">
        {/* Logo */}

        <h1 className="text-6xl font-black text-cyan-400 mb-6 text-center">
          WaveSights
        </h1>

        <p className="text-center text-gray-400 text-lg mb-12 leading-relaxed">
          Your AI-powered career growth platform 🚀
        </p>

        {/* Buttons */}

        <div className="space-y-5">
          <button
            onClick={googleLogin}
            className="w-full bg-white text-black font-bold text-xl py-5 rounded-2xl hover:scale-[1.02] transition-all shadow-lg"
          >
            {loading ? "Connecting..." : "🚀 Continue with Google"}
          </button>
        </div>

        {/* Footer */}

        <p className="text-center text-gray-500 mt-10 text-sm">
          Continue your AI career journey with WaveSights
        </p>
      </div>
    </div>
  );
}
