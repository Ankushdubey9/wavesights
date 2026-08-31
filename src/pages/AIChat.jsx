import { useState, useEffect } from "react";
import { askAI } from "../services/aiService";
import { chatPrompt } from "../prompts/chatPrompt";
import { getUserContext } from "../utils/userContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import {
  getPlanLimits,
  getUserPlan,
} from "../utils/planAccess";

import { initializeUserPlan } from "../services/userPlanManager";

import UpgradeModal from "../components/UpgradeModal";

console.log(import.meta.env);

export default function AIChat() {
  const [messages, setMessages] = useState(() => {
    const savedMessages =
      localStorage.getItem("wavesights-chat");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: "ai",
            text: "Hello 👋 I am WaveSights AI. Ask me anything about careers, skills, internships, or roadmap guidance.",
          },
        ];
  });

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // Current Firebase user
  const [currentUser, setCurrentUser] =
    useState(null);

  // User plan
  const [userPlan, setUserPlan] =
    useState("free");

  // Current monthly AI Mentor usage
  const [mentorUsage, setMentorUsage] =
    useState(0);

  // Upgrade Modal
  const [showUpgradeModal, setShowUpgradeModal] =
    useState(false);

  // Load Firebase user
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          setCurrentUser(user);

          if (!user) {
            setUserPlan("free");
            setMentorUsage(0);
            return;
          }

          try {
            // Initialize plan and monthly usage
            await initializeUserPlan(
              user.uid
            );

            const userRef = doc(
              db,
              "users",
              user.uid
            );

            const userSnap =
              await getDoc(userRef);

            if (!userSnap.exists()) {
              return;
            }

            const userData =
              userSnap.data();

            const plan =
              getUserPlan(userData);

            const usage =
              userData.usage || {};

            setUserPlan(plan);

            setMentorUsage(
              usage.careerMentor || 0
            );
          } catch (error) {
            console.error(
              "Error loading user plan:",
              error
            );
          }
        }
      );

    return () => unsubscribe();
  }, []);

  // Save chat locally
  useEffect(() => {
    localStorage.setItem(
      "wavesights-chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Make sure user is logged in
    if (!currentUser) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Please login to use WaveSights AI.",
        },
      ]);

      return;
    }

    try {
      // Initialize/reset monthly usage if needed
      await initializeUserPlan(
        currentUser.uid
      );

      // Get latest user data
      const userRef = doc(
        db,
        "users",
        currentUser.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (!userSnap.exists()) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "⚠️ Your account information could not be found.",
          },
        ]);

        return;
      }

      const userData =
        userSnap.data();

      // Current plan
      const plan =
        getUserPlan(userData);

      // Plan limits
      const limits =
        getPlanLimits(userData);

      // Current monthly usage
      const currentUsage =
        userData.usage?.careerMentor || 0;

      // AI Mentor limit
      const mentorLimit =
        limits.aiMessages;

      // ----------------------------------
      // FREE / PRO LIMIT CHECK
      // ----------------------------------

      if (
        currentUsage >= mentorLimit
      ) {
        setUserPlan(plan);
        setMentorUsage(currentUsage);

        // Show upgrade modal for Free users
        if (plan === "free") {
          setShowUpgradeModal(true);
        } else {
          // This should normally never happen
          // because Pro is unlimited.
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text:
                "⚠️ AI Mentor is temporarily unavailable. Please try again.",
            },
          ]);
        }

        return;
      }

      // ----------------------------------
      // USER MESSAGE
      // ----------------------------------

      const userMessage = {
        sender: "user",
        text: input,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      setLoading(true);

      const context =
        getUserContext(messages);

      const userPrompt = `
${context}

User Question:

${input}
`;

      // ----------------------------------
      // CALL AI
      // ----------------------------------

      const text = await askAI(
        chatPrompt,
        userPrompt
      );

      // ----------------------------------
      // AI RESPONSE
      // ----------------------------------

      const aiMessage = {
        sender: "ai",
        text,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      // ----------------------------------
      // COUNT ONLY SUCCESSFUL RESPONSE
      // ----------------------------------

      await updateDoc(userRef, {
        "usage.careerMentor":
          increment(1),
      });

      // Update local usage
      setUserPlan(plan);

      setMentorUsage(
        currentUsage + 1
      );
    } catch (error) {
      console.error(
        error.response?.data ||
          error.message
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            error.response?.data
              ?.error?.message ||
            "⚠️ AI is temporarily unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const clearChat = () => {
    localStorage.removeItem(
      "wavesights-chat"
    );

    setMessages([
      {
        sender: "ai",
        text: "Hello 👋 I am WaveSights AI. Ask me anything about careers, skills, internships, or roadmap guidance.",
      },
    ]);
  };

  return (
    <>
      <div className="min-h-screen bg-[#020817] text-white flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 px-4 md:px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-cyan-400">
              WaveSights AI
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Your Personalized AI Career Assistant
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-2xl text-sm">
              AI Online
            </div>

            <button
              onClick={clearChat}
              className="bg-red-500/20 text-red-400 px-4 py-2 rounded-2xl text-sm hover:bg-red-500/30 transition"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-6">
          {messages.map(
            (message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-2xl px-5 md:px-6 py-4 md:py-5 rounded-3xl break-words text-base md:text-lg leading-relaxed shadow-lg
                  
                  ${
                    message.sender ===
                    "user"
                      ? "bg-cyan-500 text-black self-end"
                      : "bg-white/5 border border-white/10 text-white"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[
                      remarkGfm,
                    ]}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-3xl flex items-center gap-2">
                <span className="text-cyan-400 font-semibold">
                  WaveSights AI
                </span>

                <div className="flex gap-1 text-cyan-400 text-2xl">
                  <span className="animate-bounce">
                    •
                  </span>

                  <span className="animate-bounce delay-100">
                    •
                  </span>

                  <span className="animate-bounce delay-200">
                    •
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 md:p-6 sticky bottom-0 bg-[#020817]">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ask WaveSights AI anything..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 md:px-6 py-4 outline-none focus:border-cyan-400 text-white w-full"
            />

            <button
              onClick={handleSend}
              className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() =>
          setShowUpgradeModal(false)
        }
        feature="AI Mentor"
        currentUsage={mentorUsage}
        limit={
          userPlan === "free"
            ? 200
            : undefined
        }
      />
    </>
  );
}