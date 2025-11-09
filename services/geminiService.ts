
import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysisResult, RiskLevel } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const riskAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: [RiskLevel.High, RiskLevel.Medium, RiskLevel.Low, RiskLevel.None],
      description: "The assessed risk level based on the text."
    },
    summary: {
      type: Type.STRING,
      description: "A brief, neutral, one-sentence explanation of why the risk level was assigned."
    }
  },
  required: ["riskLevel", "summary"]
};

export const analyzeTextForRisk = async (text: string): Promise<RiskAnalysisResult> => {
  if (!API_KEY) {
    // Return a default low-risk response if API key is not available
    return {
      riskLevel: RiskLevel.None,
      summary: "AI analysis is currently unavailable.",
    };
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
          parts: [{ text: `Analyze the following text for signs of immediate danger, abuse, or self-harm and return a risk assessment. Text: "${text}"` }]
      },
      config: {
        systemInstruction: "You are a highly sensitive AI assistant for a safety platform. Your task is to analyze user-submitted text for signs of immediate danger, such as human trafficking, abuse, or self-harm. Respond ONLY with a JSON object matching the provided schema. Prioritize identifying keywords related to coercion, violence, confinement, and threats. Be cautious and err on the side of safety.",
        responseMimeType: "application/json",
        responseSchema: riskAnalysisSchema,
      }
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation to ensure the result matches the expected structure
    if (result.riskLevel && result.summary && Object.values(RiskLevel).includes(result.riskLevel)) {
        return result as RiskAnalysisResult;
    } else {
        throw new Error("Invalid response format from AI.");
    }

  } catch (error) {
    console.error("Error analyzing text with Gemini:", error);
    return {
      riskLevel: RiskLevel.None,
      summary: "Could not perform AI risk analysis due to an error.",
    };
  }
};
