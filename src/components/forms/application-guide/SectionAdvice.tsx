
import { SuccessfulAppDataType } from "@/context/ChatbotContext";

export const getSectionAdvice = (sectionId: string, successfulAppData: SuccessfulAppDataType) => {
  // Base advice for each section
  const baseAdvice: Record<string, string> = {
    "project-summary": "Keep your summary brief (150-250 words) and compelling. Clearly state what you're creating, why it matters, and how the grant will help achieve your goals.",
    "artist-background": "Highlight relevant achievements that demonstrate your ability to complete this project. Include streaming numbers, press coverage, previous grants, and collaborations.",
    "project-timeline": "Create a realistic schedule with clear milestones. Show that you've thought through each phase of the project and allocated sufficient time.",
    "budget": "Be detailed and realistic. Include quotes from professionals where possible. Ensure the grant request aligns with the program's funding limits.",
    "impact": "Discuss both personal career advancement and broader community benefit. How will this project help you reach new audiences or contribute to the local music scene?"
  };
  
  // If we have success factors from real applications, incorporate them
  if (successfulAppData.appliedFactors.length > 0) {
    // Filter success factors relevant to this section
    const relevantFactors = filterRelevantFactors(sectionId, successfulAppData.appliedFactors);
    
    if (relevantFactors.length > 0) {
      return `${baseAdvice[sectionId]}\n\n**Tips from successful applications:**\n${relevantFactors.map(f => `• ${f}`).join('\n')}`;
    }
  }
  
  return baseAdvice[sectionId];
};

export const filterRelevantFactors = (sectionId: string, factors: string[]) => {
  // Map section IDs to keywords to match against success factors
  const sectionKeywords: Record<string, string[]> = {
    "project-summary": ["vision", "audience", "clear", "concept", "idea", "purpose"],
    "artist-background": ["previous", "experience", "background", "track record", "history"],
    "project-timeline": ["timeline", "milestone", "schedule", "realistic", "plan"],
    "budget": ["budget", "cost", "financial", "fund", "allocation", "payment"],
    "impact": ["impact", "community", "audience", "outreach", "benefit", "engagement"]
  };
  
  // Filter factors that contain any of the keywords for this section
  return factors.filter(factor => 
    sectionKeywords[sectionId]?.some(keyword => 
      factor.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};
