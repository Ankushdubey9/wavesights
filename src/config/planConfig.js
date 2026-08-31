export const PLAN_CONFIG = {
  free: {
    name: "Free",
    limits: {
      careerAssessment: 5,
      careerMentor: 5,
      mockInterview: 5,
      resumeAnalysis: 5,
      careerRoadmap: 5,
      jobGuidance: 5,
    },
  },

  pro: {
    name: "Pro AI",
    limits: {
      careerAssessment: 30,
      careerMentor: 30,
      mockInterview: 30,
      resumeAnalysis: 30,
      careerRoadmap: 30,
      jobGuidance: 30,
    },
  },
};

export const FEATURE_NAMES = {
  careerAssessment: "AI Career Assessment",
  careerMentor: "AI Career Mentor",
  mockInterview: "Mock Interview",
  resumeAnalysis: "Resume Analysis",
  careerRoadmap: "Career Roadmap",
  jobGuidance: "Job & Internship Guidance",
};

export const getFeatureLimit = (plan, feature) => {
  return PLAN_CONFIG[plan]?.limits?.[feature] ?? 0;
};