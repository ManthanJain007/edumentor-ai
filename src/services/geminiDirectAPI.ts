// Direct API call version for AI Studio
import { GEMINI_LEARNING_PROMPTS } from "../utils/geminiPrompts";
import { LearningLevel } from "../types";

class GeminiDirectAPI {
  private apiKey: string;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key not found");
    }
    this.apiKey = apiKey;
  }

  async sendMessage(
    message: string, 
    learningLevel: LearningLevel
  ): Promise<string> {
    try {
      const systemPrompt = GEMINI_LEARNING_PROMPTS[learningLevel];
      const fullPrompt = `${systemPrompt}\n\nStudent: ${message}\n\nAssistant:`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: fullPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      
    } catch (error: any) {
      console.error('Direct API error:', error);
      throw new Error(`Gemini API: ${error.message}`);
    }
  }
}

export const geminiDirectAPI = new GeminiDirectAPI();