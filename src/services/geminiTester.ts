// services/geminiTester.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiTester {
  static async testAvailableModels(apiKey: string): Promise<string[]> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelsToTest = [
      "gemini-pro",
      "gemini-1.0-pro",
      "gemini-1.0-pro-001",
      "models/gemini-pro",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ];

    const workingModels: string[] = [];

    for (const modelName of modelsToTest) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent("Say 'Hello World'");
        const response = await result.response;
        const text = response.text();
        
        if (text) {
          workingModels.push(modelName);
          console.log(`✅ ${modelName} WORKS!`);
        }
      } catch (error: any) {
        console.log(`❌ ${modelName} failed:`, error.message);
      }
    }

    return workingModels;
  }
}