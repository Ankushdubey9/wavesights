import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function TimeCommitment() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const times = ["1 Hour / Day", "2-3 Hours / Day", "5+ Hours / Day"];

  const handleFinish = async () => {

  if (!selected) return;

  localStorage.setItem(
    "timeCommitment",
    selected
  );

  try {

    const user = auth.currentUser;

    if (user) {

      await setDoc(
        doc(db, "users", user.uid),
        {
          userType:
            localStorage.getItem("userType"),

          educationStream:
            localStorage.getItem("educationStream"),

          interest:
            localStorage.getItem("interest"),

          goal:
            localStorage.getItem("goal"),

          skillLevel:
            localStorage.getItem("skillLevel"),

          timeCommitment: selected,
        }
      );

      console.log("User profile saved");

    } else {

      console.log("No user logged in");

    }

  } catch (error) {

    console.log(error);

  }

  navigate("/dashboard");

};

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">Daily Time Commitment</h1>

        <p className="text-gray-400 mb-10">
          We generate realistic plans based on your time.
        </p>

        <div className="space-y-6">
          {times.map((time, index) => (
            <div
              key={index}
              onClick={() => setSelected(time)}
              className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300

              ${
                selected === time
                  ? "border-cyan-400 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-white/5 hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              <h2 className="text-2xl font-semibold">{time}</h2>
            </div>
          ))}
        </div>

        <button
          onClick={handleFinish}
          disabled={!selected}
          className={`w-full mt-12 py-5 rounded-2xl font-bold text-lg transition-all

          ${
            selected
              ? "bg-cyan-500 hover:bg-cyan-400 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
}
