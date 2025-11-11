import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { GEMINI_LEARNING_PROMPTS, GEMINI_EMOTION_PROMPTS } from "../utils/geminiPrompts";
import { LearningLevel, EmotionType } from "../types";

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private availableModels = [
    "gemini-flash-latest",
    "gemini-2.5-pro-exp-03-25",  // Latest Gemini 2.5 Pro experimental
    "gemini-2.0-flash-exp",      // Gemini 2.0 Flash experimental
    "gemini-1.5-flash",          // Fallback to 1.5 Flash
    "gemini-1.5-pro",            // Fallback to 1.5 Pro
  ];

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key not found in environment variables");
    }
    
    console.log('🔑 Initializing Gemini with AI Studio API key');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async sendMessage(
    message: string, 
    learningLevel: LearningLevel, 
    emotion?: EmotionType,
    imageFile?: File
  ): Promise<string> {
    let lastError: Error | null = null;

    // Try each model until one works
    for (const modelName of this.availableModels) {
      try {
        console.log(`🔄 Trying AI Studio model: ${modelName}`);
        
        const model = this.genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        let systemPrompt = GEMINI_LEARNING_PROMPTS[learningLevel];
        
        if (emotion && GEMINI_EMOTION_PROMPTS[emotion]) {
          systemPrompt += `\n\n${GEMINI_EMOTION_PROMPTS[emotion]}`;
        }

        const fullPrompt = `${systemPrompt}\n\nStudent's question: ${message}\n\nPlease provide a helpful, engaging response that matches the selected learning level.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ Success with AI Studio model: ${modelName}`);
        return text;
        
      } catch (error: any) {
        console.log(`❌ AI Studio model ${modelName} failed:`, error.message);
        lastError = error;
        continue; // Try next model
      }
    }

    // If all models failed
    throw new Error(
      `No Gemini models available with your AI Studio API key.\n` +
      `Please check:\n` +
      `1. Your API key is from Google AI Studio (not Google Cloud)\n` +
      `2. You're in a supported region\n` +
      `3. Try using the model directly in AI Studio playground\n` +
      `Last error: ${lastError?.message || 'Unknown error'}`
    );
  }

  // Enhanced model testing with current models
  async testAvailableModels(): Promise<string[]> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const workingModels: string[] = [];

    try {
      // Test direct API call to list models
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('📋 Available models from API:', data.models?.map((m: any) => m.name));
        
        // Test current generation models first
        const currentModels = [
	  "gemini-flash-latest",


          "gemini-2.5-pro-exp-03-25",
          "gemini-2.0-flash-exp", 
          "gemini-1.5-flash",
          "gemini-1.5-pro",
          "gemini-1.5-flash-001",
          "gemini-1.0-pro"
        ];

        for (const modelName of currentModels) {
          try {
            const model = this.genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test");
            await result.response;
            workingModels.push(modelName);
            console.log(`✅ Model ${modelName} is available`);
          } catch (error) {
            console.log(`❌ Model ${modelName} not available`);
          }
        }
      }
    } catch (error) {
      console.error('Error testing models:', error);
    }

    return workingModels;
  }
}

export const geminiService = new GeminiService(); 
