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

  // Prompt focused on Name Meaning + Name Matches + Life Lessons + Spiritual Nemesis
  const prompt = `
    User Name: "${name}"
    User Birth Date: ${monthName} ${day}
    User Traits: ${traits.join(', ')}
    
    Preferences:
    - Status: ${preference === 'all' ? 'Any' : preference}
    - Gender: ${genderPreference === 'any' ? 'Any' : genderPreference}
    - Region: ${regionPreference === 'global' ? 'Anywhere in the world' : regionPreference.replace('_', ' ')}

    **Objective**:
    1. Analyze the User's Name ("${name}"): 
       - Provide its **Specific Origin** (e.g., 'Igbo, Nigeria', 'Ancient Sanskrit', 'Medieval French').
       - Provide its Meaning and a "Soul Vibration" (a mystical interpretation).
    2. Identify 3 Celebrities/Famous Figures who **SHARE THE SAME FIRST NAME** (or a close cultural variation/spelling) as "${name}".
       
       **Selection Criteria**:
       - **Priority 1 (Name Match)**: Must share the name "${name}" (e.g., if user is "Michael", find "Michael Jackson", "Michael Jordan", etc.).
       - **Priority 2 (Region & Gender)**: Filter these name-twins by the selected Region (${regionPreference}) and Gender (${genderPreference}) IF possible. If no name-twins exist in that specific region, widen the region but keep the name match.
       - **Priority 3 (Fallback)**: If the name is extremely unique and has NO famous matches, find a celebrity whose name has the *exact same meaning* or is known as a "Spirit Twin" born on the user's birthday (${monthName} ${day}).
       - **Status Preference**: Respect ${preference} if possible.

    **Content Generation**:
    For each celebrity, provide a deep mystical analysis connecting to the User's Name Meaning AND the User's Birthday.
    
    - **Match Reason**: How does this celebrity embody the user's personality traits?
    - **Destiny Prediction**: Incorporate the user's birthday (${monthName} ${day}) into the prediction.
    - **Shadow Wisdom (Educational Mistakes)**: Identify 2 specific mistakes, failures, bad decisions, or controversies this person faced. 
      - Describe the **Mistake**.
      - Provide the **Lesson** the user should learn to avoid a similar fate.
    - **Spiritual Nemesis (The Force Fighting Potential)**:
      - Based on the specific energy/vibration of the name "${name}", identify a metaphorical "Spiritual Force" or "Entity" that constantly tries to fight or block this person's potential.
      - Give it a creative, dramatic title (e.g., "The Whisperer of Doubt", "The Siren of Complacency", "The Void of Isolation").
      - Explain how this force manifests in their life to stop them from reaching greatness.
    - **Fun Facts**:
      - Provide **exactly 5 distinct, lesser-known, and engaging fun facts** about this person. Avoid generic facts. Focus on quirks, hidden talents, or strange coincidences.

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
                origin: { type: Type.STRING, description: "Specific country, ethnicity, or cultural origin (e.g. 'Yoruba, Nigeria')" },
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
                    },
                    description: "Two key life lessons based on mistakes."
                  },
                  spiritualNemesis: { type: Type.STRING, description: "A dramatic name for the force fighting their potential." },
                  nemesisManifestation: { type: Type.STRING, description: "How this force blocks their path." },
                  funFacts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly 5 lesser-known and engaging fun facts."
                  },
                },
                required: ["id", "name", "birthDate", "occupation", "status", "matchReason", "alignmentTraits", "destinyPrediction", "predictedLegacyYear", "legacyLabel", "lifeLessons", "spiritualNemesis", "nemesisManifestation", "funFacts"]
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