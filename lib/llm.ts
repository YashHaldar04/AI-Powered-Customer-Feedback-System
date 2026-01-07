import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Safely extracts JSON from Gemini output
 */
function extractJSON(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON found in Gemini response");
  }
  return JSON.parse(match[0]);
}

export async function runLLM(review: string, rating: number) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7
      }
    });

    const prompt = `
You are an AI assistant helping a company analyze customer reviews.

Customer Rating: ${rating}/5
Customer Review: "${review}"

Tasks:
1. Write a friendly response addressed directly to the customer.
2. Summarize the feedback for an internal admin dashboard.
3. Suggest ONE clear recommended action for the business.

Rules:
- Respond ONLY in valid JSON
- No explanations, no markdown
- Use exactly these keys:
  ai_response, ai_summary, ai_action

JSON format:
{
  "ai_response": "string",
  "ai_summary": "string",
  "ai_action": "string"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = extractJSON(text);

    return {
      ai_response: parsed.ai_response,
      ai_summary: parsed.ai_summary,
      ai_action: parsed.ai_action
    };
  } catch (error) {
    console.error("Gemini failed, using fallback:", error);

    // Intelligent fallback (rating-aware)
    return {
      ai_response:
        "Thank you for sharing your feedback. We appreciate you taking the time to help us improve.",
      ai_summary:
        rating <= 2
          ? "Customer reported a negative experience and dissatisfaction."
          : rating === 3
          ? "Customer reported a neutral experience."
          : "Customer reported a positive experience and satisfaction.",
      ai_action:
        rating <= 2
          ? "Investigate the issue and follow up with the customer."
          : rating === 3
          ? "Review feedback to identify improvement opportunities."
          : "Maintain service quality and reinforce positive practices."
    };
  }
}
