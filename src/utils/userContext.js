export function getUserContext(messages = []) {
  const interest = localStorage.getItem("interest") || "";

  const goal = localStorage.getItem("goal") || "";

  const skillLevel = localStorage.getItem("skillLevel") || "";

  const stream = localStorage.getItem("educationStream") || "";

  const xp = localStorage.getItem("xp") || 0;

  const streak = localStorage.getItem("streak") || 0;

  const completedSkills =
    JSON.parse(localStorage.getItem("completedSkills")) || [];

  const timeCommitment =
    localStorage.getItem("timeCommitment") || "";

  const conversationHistory = messages
    .slice(-5)
    .map(
      (msg) =>
        `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`
    )
    .join("\n");

  return `
USER PROFILE

Background : ${stream}

Interest : ${interest}

Goal : ${goal}

Skill Level : ${skillLevel}

XP : ${xp}

Learning Streak : ${streak}

Completed Skills : ${completedSkills.join(", ")}

Daily Time : ${timeCommitment}

Conversation History

${conversationHistory}
`;
}