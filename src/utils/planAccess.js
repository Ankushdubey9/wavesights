// WaveSights Free & Pro Plan Configuration

export const PLAN_LIMITS = {
  free: {
    // Free users get limited monthly usage
    aiMessages: 200,
    mockInterviews: 5,
    resumeAnalyses: 5,
    careerAssessments: 5,
    careerRoadmaps: 5,
    jobGuidance: 5,

    // Pro-only features
    completeRoadmap: false,
    advancedResumeAnalysis: false,
   skillTracking: false,
  },

  pro: {
    // Pro users get unlimited usage
    aiMessages: Infinity,
    mockInterviews: Infinity,
    resumeAnalyses: Infinity,
    careerAssessments: Infinity,
    careerRoadmaps: Infinity,
    jobGuidance: Infinity,

    // Pro features
    completeRoadmap: true,
    advancedResumeAnalysis: true,
    skillTracking: true,
  },
};


// Check whether user is a Pro user
export const isProUser = (user) => {
  return user?.plan === "pro";
};


// Get user's current plan
export const getUserPlan = (user) => {
  return user?.plan === "pro" ? "pro" : "free";
};


// Get limits for the user's plan
export const getPlanLimits = (user) => {
  const plan = getUserPlan(user);

  return PLAN_LIMITS[plan];
};


// Check whether user has access to a Pro feature
export const hasFeatureAccess = (user, feature) => {
  const limits = getPlanLimits(user);

  return limits?.[feature] === true;
};


// Check whether the user has reached a usage limit
export const hasReachedLimit = (
  user,
  feature,
  currentUsage = 0
) => {
  const limits = getPlanLimits(user);

  const limit = limits?.[feature];

  // Unlimited feature
  if (limit === Infinity) {
    return false;
  }

  // No numeric limit
  if (typeof limit !== "number") {
    return false;
  }

  return currentUsage >= limit;
};


// Get remaining usage
export const getRemainingUsage = (
  user,
  feature,
  currentUsage = 0
) => {
  const limits = getPlanLimits(user);

  const limit = limits?.[feature];

  // Pro = unlimited
  if (limit === Infinity) {
    return Infinity;
  }

  if (typeof limit !== "number") {
    return null;
  }

  return Math.max(limit - currentUsage, 0);
};