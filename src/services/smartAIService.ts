// services/smartAIService.ts
import { LearningLevel, EmotionType } from "../types";

class SmartAIService {
  private mockResponses = {
    child: [
      "That's a wonderful question! 🌟 Let me explain it in a fun and simple way...",
      "You're such a curious learner! 🦸 Here's how that works in a way you'll understand...",
      "I love your question! 🎯 Let me tell you an interesting story about this...",
      "What a great question! 🎉 Here's a simple explanation that will make perfect sense..."
    ],
    teen: [
      "That's actually a really interesting topic. Here's how it works in the real world...",
      "Good thinking! This concept is used in many modern apps and technologies...",
      "I remember learning this too. The key thing to understand is...",
      "That's a smart question! Let me break it down in a way that makes sense..."
    ],
    college: [
      "From an academic perspective, this involves some fascinating concepts...",
      "The theoretical framework for this is quite interesting when examined closely...",
      "This topic has some compelling research behind it that's worth exploring...",
      "In academic settings, we approach this by considering multiple aspects..."
    ],
    expert: [
      "At a research level, this involves some sophisticated concepts and interactions...",
      "The current research in this area reveals some nuanced considerations...",
      "From a technical standpoint, this requires understanding some advanced principles...",
      "When we examine this at an expert level, we find several complex factors at play..."
    ]
  };

  async sendMessage(
    message: string, 
    learningLevel: LearningLevel, 
    emotion?: EmotionType,
    imageFile?: File
  ): Promise<string> {
    // Smart mock response with learning level adaptation
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const levelResponses = this.mockResponses[learningLevel];
    const randomResponse = levelResponses[Math.floor(Math.random() * levelResponses.length)];
    
    return `${randomResponse}\n\nYou asked: "${message}"\n\n[Note: Currently using enhanced mock responses - Gemini API will be used when configured properly]`;
  }
}

export const smartAIService = new SmartAIService();