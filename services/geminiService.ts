
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const savedUser = localStorage.getItem('safe_space_user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const apiKey = user?.customApiKey || process.env.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export async function getPenguinResponse(message: string) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are Penny, a friendly, empathetic AI penguin assistant for Safe-Space. You support survivors of sexual assault and trauma. Be kind, non-judgmental, and warm. Use occasional penguin emojis 🐧. Never give medical advice. If a user is in immediate danger, tell them to press the SOS button to call the police.",
      },
    });
    return response.text || "I'm here for you, friend. 🐧";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm here and listening. 🐧";
  }
}

export async function analyzeTraumaDump(text: string) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following trauma report. Identify primary emotional states and provide empathetic support. Tone must be non-diagnostic. Text: ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            emotions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Detected emotional states"
            },
            encouragement: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { sentiment: "Deep", emotions: ["Anxiety"], encouragement: ["You are safe now.", "We are here."] };
  }
}

export async function analyzeVideoInsights(videoBase64: string, mimeType: string) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType, data: videoBase64 } },
          { text: "Analyze this survivor testimony video. Extract a summary of the events described for forensic purposes, and 3 reflection flashcards for their recovery journey. Focus on identifying physical descriptions, locations mentioned, and emotional state. Return as JSON." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return null;
  }
}

export async function analyzeImageInsights(imageBase64: string, mimeType: string) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType, data: imageBase64 } },
          { text: "Analyze this image for forensic documentation. Describe visible injuries, clothing damage, or environmental markers that could serve as evidence in a police investigation. Be objective and descriptive. Provide next steps for preservation. Return as JSON." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            findings: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return null;
  }
}

export async function generateJusticeReport(traumaData: string, imageFindings?: string, videoFindings?: string) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a structured 'Police Liaison Report' based on the following survivor data. This report is meant to help police understand the incident quickly and ensure the right charges are pressed. Include a Summary, Evidence Markers, and Recommended Legal Questions. Data: Trauma Testimony: ${traumaData}. Image Evidence Notes: ${imageFindings || 'N/A'}. Video Evidence Notes: ${videoFindings || 'N/A'}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caseSummary: { type: Type.STRING },
            forensicHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
            policeQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            legalProvisions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Relevant sections of law or rights like Zero FIR" }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Justice Report Error:", error);
    return null;
  }
}
