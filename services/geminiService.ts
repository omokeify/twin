import { GoogleGenAI, Type } from "@google/genai";
import { CelebrityMatch } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please check your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const findCelebrityMatch = async (
  birthDate: string,
  traits: string[]
): Promise<CelebrityMatch> => {
  const ai = getClient();
  
  // Fix: Parse YYYY-MM-DD manually to avoid UTC timezone shifts causing off-by-one day errors
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const monthIndex = parseInt(monthStr, 10) - 1; // JS months are 0-indexed
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  
  // Create date object using local time components
  const dateObj = new Date(year, monthIndex, day);
  const monthName = dateObj.toLocaleString('default', { month: 'long' });

  const prompt = `
    The user was born on ${monthName} ${day}. 
    Their personality traits are: ${traits.join(', ')}.
    
    Task:
    1. Find a famous celebrity (actor, musician, historical figure, etc.) who was born on EXACTLY ${monthName} ${day}.
    2. Analyze the user's traits and select the celebrity born on this day who best matches these vibes.
    3. Generate a short, mystical bio for this celebrity.
    4. Explain why the user and this celebrity are "soul siblings" based on the personality traits.
    5. Playfully and mystically predict a "Legacy Year" or "End of Era" year for the user (not necessarily death, but a major transformation or conclusion of their current life path) based on astrological or numerological vibes of the celebrity's life path. Keep it mysterious but safe (PG-13).
    6. Provide 3 interesting, lesser-known facts about this celebrity to surprise the user.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            birthDate: { type: Type.STRING, description: "The celebrity's full birth date (Month Day, Year)" },
            occupation: { type: Type.STRING },
            bio: { type: Type.STRING, description: "A short 2-sentence bio." },
            matchReason: { type: Type.STRING, description: "Why the user's traits match this person." },
            destinyPrediction: { type: Type.STRING, description: "A mystical prediction about the 'end' or 'transformation' of their timeline." },
            predictedLegacyYear: { type: Type.INTEGER, description: "A specific future year for this major event." },
            funFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 interesting lesser-known facts about the celebrity."
            },
          },
          required: ["name", "birthDate", "occupation", "bio", "matchReason", "destinyPrediction", "predictedLegacyYear", "funFacts"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CelebrityMatch;
    } else {
      throw new Error("No response text from Gemini");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};