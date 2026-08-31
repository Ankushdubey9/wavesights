import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/paymentService";

// ==========================================
// RAZORPAY TEST KEY ID
// ==========================================

const RAZORPAY_KEY_ID = "rzp_test_TSQUtlMXCzfMeW";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ==========================================
  // PRO UPGRADE
  // ==========================================

  const handleProUpgrade = async () => {
    if (loading) return;

    // ==========================================
    // STEP 0 — LOGIN CHECK
    // ==========================================

    if (!auth.currentUser) {
      alert("Please login first to upgrade to Pro AI.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // STEP 1 — CREATE ONE-TIME ₹99 ORDER
      // ==========================================

      console.log("Creating Razorpay order...");

      const data = await createRazorpayOrder();

      console.log(
        "Razorpay order response:",
        data
      );

      if (!data?.success || !data?.orderId) {
        throw new Error(
          "Unable to create Razorpay order."
        );
      }

      console.log(
        "Razorpay Order ID:",
        data.orderId
      );

      // ==========================================
      // STEP 2 — LOAD RAZORPAY CHECKOUT
      // ==========================================

      const loadRazorpay = () => {
        return new Promise((resolve) => {
          if (window.Razorpay) {
            resolve(true);
            return;
          }

          const script =
            document.createElement("script");

          script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

          script.onload = () => {
            console.log(
              "Razorpay Checkout loaded."
            );

            resolve(true);
          };

          script.onerror = () => {
            console.error(
              "Failed to load Razorpay Checkout."
            );

            resolve(false);
          };

          document.body.appendChild(script);
        });
      };

      const loaded =
        await loadRazorpay();

      if (!loaded) {
        throw new Error(
          "Razorpay Checkout could not be loaded."
        );
      }

      // ==========================================
      // STEP 3 — OPEN ONE-TIME PAYMENT CHECKOUT
      // ==========================================

      const options = {
        key: RAZORPAY_KEY_ID,

        // IMPORTANT:
        // ONE-TIME PAYMENT
        // Uses order_id
        // NOT subscription_id

        order_id: data.orderId,

        name: "WaveSights",

        description:
          "WaveSights Pro AI - ₹99 for 30 days",

        // Don't use localhost logo here.
        // It can cause Razorpay mixed-content/CORS
        // issues during local testing.

        prefill: {
          name:
            auth.currentUser?.displayName ||
            "",

          email:
            auth.currentUser?.email ||
            "",
        },

        theme: {
          color: "#22d3ee",
        },

        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        handler: async function (response) {
          console.log(
            "Razorpay payment successful:",
            response
          );

          try {
            // ======================================
            // STEP 4 — VERIFY PAYMENT ON BACKEND
            // ======================================

            console.log(
              "Verifying Razorpay payment..."
            );

            const verification =
              await verifyRazorpayPayment({
                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_signature:
                  response.razorpay_signature,
              });

            console.log(
              "Payment verification response:",
              verification
            );

            // ======================================
            // CHECK VERIFICATION RESULT
            // ======================================

            if (!verification?.success) {
              throw new Error(
                "Payment verification failed."
              );
            }

            // ======================================
            // SUCCESS
            // ======================================

            console.log(
              "PRO ACTIVATED SUCCESSFULLY"
            );

            alert(
              "Payment successful! 🎉\n\nPro AI is now active for 30 days."
            );

            // Go to dashboard
            navigate("/dashboard");

          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              error?.message ||
                "Payment was completed, but verification failed. Please contact support."
            );

          } finally {
            setLoading(false);
          }
        },

        // ==========================================
        // PAYMENT MODAL CLOSED
        // ==========================================

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed."
            );

            setLoading(false);
          },
        },
      };

      // ==========================================
      // STEP 5 — OPEN RAZORPAY
      // ==========================================

      console.log(
        "Opening Razorpay Checkout..."
      );

      const razorpay =
        new window.Razorpay(options);

      // Razorpay checkout error
      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          alert(
            response?.error?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "Pro upgrade error:",
        error
      );

      alert(
        error?.message ||
          "Unable to start payment."
      );

      setLoading(false);
    }
  };

  return (
    <section
      id="pricing"
      className="px-6 md:px-10 py-24"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* =====================================
            HEADER
        ====================================== */}

        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Choose{" "}
          <span className="text-cyan-400">
            Your Plan
          </span>
        </h2>

        <p className="text-gray-400 text-lg md:text-xl mb-16">
          Start free and upgrade to Pro AI
          whenever you need unlimited access.
        </p>

        {/* =====================================
            PLANS
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* =====================================
              FREE PLAN
          ====================================== */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-left">

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-3xl font-bold">
                Free
              </h3>

              <span className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-gray-300 text-sm font-semibold">
                Forever
              </span>

            </div>

            <p className="text-gray-400 mb-8 text-lg">
              Explore WaveSights with essential
              AI-powered career guidance.
            </p>

            {/* PRICE */}

            <div className="mb-8">

              <h4 className="text-6xl font-black">
                ₹0
              </h4>

              <p className="text-gray-500 mt-2">
                Forever
              </p>

            </div>

            {/* FEATURES */}

            <ul className="space-y-5 text-gray-300 mb-10 text-lg">

              <li>
                ✓ AI Career Assessment
              </li>

              <li>
                ✓ Personalized Career Suggestions
              </li>

              <li>
                ✓ Resume Analysis — 5/month
              </li>

              <li>
                ✓ Mock Interviews — 5/month
              </li>

              <li>
                ✓ Career Roadmap — 5/month
              </li>

              <li>
                ✓ Job & Internship Guidance — 5/month
              </li>

              <li>
                ✓ AI Mentor — 200 messages/month
              </li>

              <li>
                ✕ Advanced Resume & ATS Analysis
              </li>

              <li>
                ✕ Skill Tracking
              </li>

            </ul>

            {/* FREE BUTTON */}

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="block w-full bg-white/10 border border-white/10 hover:bg-cyan-500 hover:text-black py-4 rounded-2xl font-bold transition"
            >
              Current Plan
            </button>

          </div>

          {/* =====================================
              PRO PLAN
          ====================================== */}

          <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/60 rounded-3xl p-10 text-left shadow-2xl shadow-cyan-500/10">

            {/* RECOMMENDED */}

            <div className="absolute top-5 right-5 bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-black">
              ⭐ RECOMMENDED
            </div>

            {/* TITLE */}

            <div className="flex items-center gap-3 mb-4">

              <h3 className="text-3xl font-bold">
                Pro AI
              </h3>

              <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                FOUNDING PRICE
              </span>

            </div>

            <p className="text-gray-300 mb-8 text-lg">
              Unlock unlimited AI career
              guidance and advanced features.
            </p>

            {/* PRICE */}

            <div className="mb-8">

              <div className="flex items-end gap-2">

                <h4 className="text-6xl font-black">
                  ₹99
                </h4>

                <span className="text-gray-400 text-lg mb-2">
                  / 30 days
                </span>

              </div>

              <p className="text-cyan-300 mt-2 font-semibold">
                One-time payment
              </p>

            </div>

            {/* FEATURES */}

            <ul className="space-y-5 text-gray-200 mb-10 text-lg">

              <li>
                🔥 Everything in Free
              </li>

              <li>
                ✓ Unlimited AI Career Mentor
              </li>

              <li>
                ✓ Unlimited Mock Interviews
              </li>

              <li>
                ✓ Unlimited Resume Analysis
              </li>

              <li>
                ✓ Unlimited Career Roadmaps
              </li>

              <li>
                ✓ Unlimited Job & Internship Guidance
              </li>

              <li>
                ✓ Advanced Resume & ATS Analysis
              </li>

              <li>
                ✓ Complete Career Roadmaps
              </li>

              <li>
                ✓ Skill Tracking
              </li>

              <li className="text-cyan-300 font-semibold">
                ✓ No automatic monthly deduction
              </li>

            </ul>

            {/* =================================
                PAYMENT BUTTON
            ================================== */}

            <button
              onClick={handleProUpgrade}
              disabled={loading}
              className="block w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-bold transition hover:scale-[1.02]"
            >
              {loading
                ? "Processing Payment..."
                : "Get Pro AI — ₹99"}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              One-time payment • 30 days access • No auto-renewal
            </p>

          </div>

        </div>

        {/* =====================================
            FOOTER
        ====================================== */}

        <p className="text-gray-500 text-sm mt-10">
          Pay once and enjoy Pro AI for 30 days.
          Renew manually whenever you want.
        </p>

      </div>
    </section>
  );
}