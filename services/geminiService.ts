import { GoogleGenAI, Type } from "@google/genai";
import { MatchResponse } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please add 'API_KEY' to your Vercel Environment Variables in Settings.");
  }
  return new GoogleGenAI({ apiKey });
};

export const findCelebrityMatches = async (
  birthDate: string,
  name: string,
  traits: string[],
  preference: 'living' | 'deceased' | 'all',
  genderPreference: 'male' | 'female' | 'any',
  regionPreference: 'africa' | 'asia' | 'europe' | 'north_america' | 'south_america' | 'oceania' | 'global'
): Promise<MatchResponse> => {
  const ai = getClient();
  
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const monthIndex = parseInt(monthStr, 10) - 1; 
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  
  const dateObj = new Date(year, monthIndex, day);
  const monthName = dateObj.toLocaleString('default', { month: 'long' });

  // Prompt focused on Name Meaning + Name Matches + Life Lessons + Spiritual Nemesis + Lifespan Mystery
  const prompt = `
    User Name: "${name}"
    User Birth Date: ${monthName} ${day}
    User Traits: ${traits.join(', ')}
    
    Preferences:
    - Status: ${preference === 'all' ? 'Any' : preference}
    - Gender: ${genderPreference === 'any' ? 'Any' : genderPreference}
    - Region: ${regionPreference === 'global' ? 'Anywhere in the world' : regionPreference.replace('_', ' ')}

    **Objective**:
    1. Analyze the User's Name ("${name}"): Provide its origin, meaning, and soul vibration.
    2. **Generate a list of 6 Celebrity Matches** based on the hierarchy below.
    
    **Scope & Diversity Instructions (CRITICAL)**:
    - **Expand the 'Database'**: Do NOT limit results to mainstream Hollywood actors/singers. Actively search for **scientists, philosophers, inventors, historical leaders, visual artists, authors, athletes, activists, and niche cultural icons**.
    - **Era Diversity**: Ensure a mix of contemporary figures (20th-21st century) and historical legends (pre-20th century) if the 'Status' preference allows.
    - **Global Representation**: If a specific region is requested, strictly prioritize figures from that region. If 'Global' is selected, ensure a diverse mix of nationalities.

    **Selection Hierarchy (Strict Priority)**:
    - **TIER 1 (Perfect Match)**: A celebrity who shares BOTH the **User's First Name** AND the **User's Birthday** (${monthName} ${day}). This is the holy grail.
    - **TIER 2 (Birthday Twin)**: A celebrity born strictly on **${monthName} ${day}**. (Year does not matter).
    - **TIER 3 (Name Twin)**: A celebrity who shares the **User's First Name** (or close variant).
    - **TIER 4 (Soul Match)**: If exact name/birthday matches are impossible in the requested region/gender, find a "Soul Twin" with very similar personality traits.

    *IMPORTANT*: Try to find at least 1 or 2 matches that share the specific birthday (${monthName} ${day}), regardless of name.
    
    **Content Generation per Match**:
    For each celebrity, provide a deep mystical analysis.
    - **Match Type**: Label them as 'Perfect Match', 'Birthday Twin', 'Name Twin', or 'Soul Match'.
    - **Match Reason**: Explain the connection (e.g. "Born on your exact day...", "Shares your name...").
    - **Destiny Prediction**: Incorporate the user's birthday (${monthName} ${day}) into the prediction.
    - **Shadow Wisdom**: 2 specific mistakes/lessons.
    - **Spiritual Nemesis**: A dramatic force/entity name fighting their potential.
    - **Fun Facts**: 5 engaging, lesser-known facts.
    - **Cosmic Lifespan & Mystery Note**: Predicted lifespan and a mysterious/witty condition.

    Return JSON format only.
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
            analysis: {
              type: Type.OBJECT,
              properties: {
                origin: { type: Type.STRING, description: "Specific country, ethnicity, or cultural origin" },
                meaning: { type: Type.STRING, description: "Literal meaning of the name" },
                soulVibration: { type: Type.STRING, description: "Mystical energy description of the name" }
              },
              required: ["origin", "meaning", "soulVibration"]
            },
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  birthDate: { type: Type.STRING },
                  occupation: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["living", "deceased"] },
                  matchType: { type: Type.STRING, enum: ["Perfect Match", "Birthday Twin", "Name Twin", "Soul Match"] },
                  eraContext: { type: Type.STRING },
                  matchReason: { type: Type.STRING },
                  alignmentTraits: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        trait: { type: Type.STRING },
                        connection: { type: Type.STRING }
                      }
                    }
                  },
                  destinyPrediction: { type: Type.STRING },
                  predictedLegacyYear: { type: Type.INTEGER },
                  legacyLabel: { type: Type.STRING },
                  lifeLessons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        mistake: { type: Type.STRING },
                        lesson: { type: Type.STRING }
                      }
                    }
                  },
                  spiritualNemesis: { type: Type.STRING },
                  nemesisManifestation: { type: Type.STRING },
                  funFacts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  cosmicLifespan: { type: Type.STRING },
                  mysteryNote: { type: Type.STRING }
                },
                required: ["id", "name", "birthDate", "occupation", "status", "matchType", "matchReason", "alignmentTraits", "destinyPrediction", "predictedLegacyYear", "legacyLabel", "lifeLessons", "spiritualNemesis", "nemesisManifestation", "funFacts", "cosmicLifespan", "mysteryNote"]
              }
            }
          },
          required: ["analysis", "matches"]
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as MatchResponse;
    } else {
      throw new Error("No response text from Gemini");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};