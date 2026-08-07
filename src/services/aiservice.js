import axios from "axios";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export async function askAI(
  systemPrompt,
  userPrompt,
  options = {}
) {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 2048,
    topP = 0.95,
  } = options;

  try {
    const response = await axios.post(
      API_URL,
      {
        model,
        temperature,
        max_tokens: maxTokens,
        top_p: topP,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !response.data ||
      !response.data.choices ||
      response.data.choices.length === 0
    ) {
      throw new Error("No response received from AI.");
    }

    return response.data.choices[0].message.content.trim();

  } catch (err) {

    console.error("WaveSights AI Error");

    console.error(err.response?.data || err.message);

    throw new Error(
      err.response?.data?.error?.message ||
      "WaveSights AI is temporarily unavailable."
    );
  }
}