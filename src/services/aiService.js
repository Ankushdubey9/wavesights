import axios from "axios";

const API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODEL =
  "openai/gpt-oss-120b";

export async function askAI(
  systemPrompt,
  userPrompt,
  options = {}
) {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.2,
    maxTokens = 6000,
    topP = 0.9,
  } = options;

  const apiKey =
    import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Groq API key is missing. Check your .env file."
    );
  }

  try {
    console.log(
      "🤖 Sending request to Groq..."
    );

    const response = await axios.post(
      API_URL,
      {
        model,

        temperature,

        max_completion_tokens: maxTokens,

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
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },

        timeout: 60000,
      }
    );

    console.log(
      "✅ Groq response received:",
      response.data
    );

    // IMPORTANT DEBUG INFORMATION
    console.log(
      "📊 Groq usage:",
      response.data?.usage
    );

    console.log(
      "🛑 Finish reason:",
      response.data?.choices?.[0]?.finish_reason
    );

    const content =
      response?.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(
        "AI returned an empty response."
      );
    }

    return content.trim();

  } catch (error) {

    console.error(
      "❌ WaveSights AI Error:"
    );

    if (error.response) {

      console.error(
        "Status:",
        error.response.status
      );

      console.error(
        "Data:",
        error.response.data
      );

    } else {

      console.error(
        "Message:",
        error.message
      );
    }

    throw new Error(
      error.response?.data?.error?.message ||
      error.message ||
      "WaveSights AI is temporarily unavailable."
    );
  }
}