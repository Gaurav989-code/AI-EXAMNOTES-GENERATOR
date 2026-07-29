const MODEL = "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateGeminiResponse = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Gemini Request Attempt ${attempt}`);

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
            temperature: 0.6, // Lowered slightly to improve factual accuracy and focus
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                notes: {
                  type: "STRING",
                  description:
                    "Comprehensive, detailed educational revision notes written in thorough markdown format for the given topic.",
                },
                revisionPoints: {
                  type: "array",
                  description:
                    "A list of critical, high-yield bullet points summarizing the absolute core concepts of the topic for quick revision.",
                  items: { type: "string" },
                },
                diagram: {
                  type: "OBJECT",
                  description: "Mermaid.js diagram configuration.",
                  properties: {
                    type: {
                      type: "STRING",
                      description: "e.g., flowchart, sequence, block",
                    },
                    data: {
                      type: "STRING",
                      description:
                        "The actual Mermaid code structure starting with graph TD or similar.",
                    },
                  },
                  required: ["type", "data"],
                },
                charts: {
                  type: "ARRAY",
                  description: "List of relevant analytical charts or tables.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      title: { type: "STRING" },
                      headers: { type: "ARRAY", items: { type: "STRING" } },
                      rows: {
                        type: "ARRAY",
                        items: { type: "ARRAY", items: { type: "STRING" } },
                      },
                    },
                    required: ["title", "headers", "rows"],
                  },
                },
                questions: {
                  type: "OBJECT",
                  properties: {
                    short: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description:
                        "Short answer questions strictly about the requested topic.",
                    },
                    long: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description:
                        "Long/derivation questions strictly about the requested topic.",
                    },
                    diagram: {
                      type: "STRING",
                      description: "A diagram-based practice question.",
                    },
                  },
                  required: ["short", "long", "diagram"],
                },
                subTopics: {
                  type: "OBJECT",
                  description:
                    "Subtopics grouped systematically by priority or importance levels.",
                  properties: {
                    Imp1: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description: "Most important core topics.",
                    },
                    Imp2: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description: "Secondary crucial topics.",
                    },
                    Imp3: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description: "Supplementary topics.",
                    },
                  },
                  required: ["Imp1", "Imp2", "Imp3"],
                },
              },
              required: [
                "notes",
                "diagram",
                "charts",
                "questions",
                "subTopics",
              ],
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data?.error?.message || "Gemini API returned an error.";
        console.log("Gemini Error:", message);

        if (
          message.toLowerCase().includes("high demand") ||
          message.toLowerCase().includes("overloaded") ||
          message.toLowerCase().includes("resource exhausted") ||
          response.status === 429 ||
          response.status === 503
        ) {
          if (attempt < MAX_RETRIES) {
            console.log(`Retrying in ${attempt * 3000}ms...`);
            await sleep(attempt * 3000);
            continue;
          }
        }

        throw new Error(message);
      }

      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Gemini returned an empty response.");
      }

      return JSON.parse(rawText);
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw error;
      }

      console.log(`Attempt ${attempt} failed. Retrying...`);
      await sleep(attempt * 3000);
    }
  }
};
