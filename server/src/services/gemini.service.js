const MODEL = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export const generateGeminiResponse = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  try {
    // console.log("========== CALLING GEMINI ==========");
    // console.log("URL:", GEMINI_URL);

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey.trim(),
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 4096,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // console.error("\n========== GEMINI ERROR ==========");
      // console.error("Status:", response.status);
      // console.error(JSON.stringify(data, null, 2));
      // console.error("==================================\n");

      throw new Error(data.error?.message || "Gemini API Error");
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      // console.error("Gemini returned:");
      // console.dir(data, { depth: null });

      throw new Error("Gemini returned an empty response.");
    }

    // console.log("\n========== GEMINI RAW RESPONSE ==========");
    // console.log(rawText);
    // console.log("=========================================\n");

    const cleanText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanText);

      // console.log("\n========== PARSED JSON ==========");
      // console.dir(parsed, { depth: null });
      // console.log("=================================\n");

      return parsed;
    } catch {
      // console.warn("Response is not valid JSON.");

      return {
        notes: cleanText,
      };
    }
  } catch (error) {
    // console.error("\n========== GEMINI FAILURE ==========");
    // console.error(error);
    // console.error("====================================\n");

    throw error;
  }
};
