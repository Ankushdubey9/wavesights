import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import AIRoadmap from "./pages/AIRoadmap";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import MockInterview from "./pages/MockInterview";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import UserType from "./pages/onboarding/UserType";
import EducationStream from "./pages/onboarding/EducationStream";
import InterestSelection from "./pages/onboarding/InterestSelection";
import GoalSelection from "./pages/onboarding/GoalSelection";
import SkillLevel from "./pages/onboarding/SkillLevel";
import TimeCommitment from "./pages/onboarding/TimeCommitment";
import FloatingAI from "./components/FloatingAI";
import ProtectedRoute from "./components/ProtectedRoute";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
  <FloatingAI />

  <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     <Route
  path="/dashboard"
  element={
    <ProtectedRoute>

      <Dashboard />

    </ProtectedRoute>
  }
/>
      <Route path="/ai-roadmap" element={<AIRoadmap />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mock-interview" element={<MockInterview />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />

      {/* Onboarding Flow */}
      <Route path="/onboarding" element={<UserType />} />
      <Route path="/onboarding/user-type" element={<UserType />} />

      <Route path="/onboarding/education" element={<EducationStream />} />

      <Route path="/onboarding/interests" element={<InterestSelection />} />

      <Route path="/onboarding/goals" element={<GoalSelection />} />

      <Route path="/onboarding/skill-level" element={<SkillLevel />} />

      <Route path="/onboarding/time" element={<TimeCommitment />} />

      <Route path="/ai-chat" element={<AIChat />} />


      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
</>
  );
}

export default App;
