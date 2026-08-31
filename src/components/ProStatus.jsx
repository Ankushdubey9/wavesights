import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

export default function ProStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);

        if (!currentUser) {
          setIsPro(false);
          setExpiresAt(null);
          setLoading(false);
          return;
        }

        const userRef = doc(db, "users", currentUser.uid);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setIsPro(false);
          setExpiresAt(null);
          setLoading(false);
          return;
        }

        const data = userSnap.data();

        const plan = data.plan || "free";
        const expiry = data.proExpiresAt;

        let active = false;

        if (plan === "pro" && expiry) {
          const expiryDate = expiry.toDate
            ? expiry.toDate()
            : new Date(expiry);

          active = expiryDate.getTime() > Date.now();

          setExpiresAt(expiryDate);
        }

        setIsPro(active);

      } catch (error) {
        console.error("ProStatus error:", error);

        setIsPro(false);
        setExpiresAt(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Firebase auth loading
  if (loading) {
    return null;
  }

  // User not logged in
  if (!user) {
    return null;
  }

  // FREE USER
  if (!isPro) {
    return (
      <div className="mb-4 flex justify-end">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-bold">
          FREE PLAN
        </span>
      </div>
    );
  }

  // PRO USER
  const formattedExpiry = expiresAt
    ? expiresAt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="mb-6">
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/40 rounded-3xl px-6 py-5 shadow-2xl shadow-cyan-500/10">

        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-2xl">
              ⭐
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">

                <h3 className="text-xl md:text-2xl font-black text-cyan-300">
                  PRO AI ACTIVE
                </h3>

                <span className="px-3 py-1 rounded-full bg-cyan-400 text-black text-xs font-black">
                  PRO
                </span>

              </div>

              <p className="text-gray-300 text-sm mt-1">
                You have successfully unlocked WaveSights Pro AI.
              </p>
            </div>

          </div>

          <div className="text-left md:text-right">

            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Access valid until
            </p>

            <p className="text-cyan-300 font-black text-lg">
              {formattedExpiry}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}