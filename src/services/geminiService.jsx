import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateStudentReport = async (scores) => {
  // 1. Initialize the model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2500,
    }
  });

  const prompt = `
    Act as "Mr. Physic," a human behavior evaluation engine. Analyze these Big Five scores: 
    - O: ${scores.openness || 0}, C: ${scores.conscientiousness || 0}, E: ${scores.extraversion || 0}, A: ${scores.agreeableness || 0}, N: ${scores.neuroticism || 0}.

    Provide a concise, 3-paragraph academic report:
    1. **Profile:** Synthesize dominant traits into a professional personality sketch.
    2. **Stress Response:** Predict behaviors and cognitive hurdles during high-stake situations.
    3. **Intervention:** Recommend one evidence-based study technique tailored to this profile.

    Tone: Empathetic, scholarly, and motivating. Max 150 words.
  `;

  try {
    // 2. Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("SDK Error:", error);
    throw error;
  }
};