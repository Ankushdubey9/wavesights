import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import AIRoadmap from "./pages/AIRoadmap";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import UserType from "./pages/onboarding/UserType";
import EducationStream from "./pages/onboarding/EducationStream";
import InterestSelection from "./pages/onboarding/InterestSelection";
import GoalSelection from "./pages/onboarding/GoalSelection";
import SkillLevel from "./pages/onboarding/SkillLevel";
import TimeCommitment from "./pages/onboarding/TimeCommitment";

function App() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai-roadmap" element={<AIRoadmap />} />
      <Route
  path="/resume-analyzer"
  element={<ResumeAnalyzer />}
/>

      {/* Onboarding Flow */}
      <Route path="/onboarding/user-type" element={<UserType />} />
      
      <Route
        path="/onboarding/education"
        element={<EducationStream />}
      />

      <Route
        path="/onboarding/interests"
        element={<InterestSelection />}
      />

      <Route
        path="/onboarding/goals"
        element={<GoalSelection />}
      />

      <Route
        path="/onboarding/skill-level"
        element={<SkillLevel />}
      />

      <Route
        path="/onboarding/time"
        element={<TimeCommitment />}
      />
      
      <Route path="/ai-chat"
       element={<AIChat />}
        />

    </Routes>
  );
}

export default App;