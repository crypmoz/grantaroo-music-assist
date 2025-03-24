
import { GrantType } from "@/context/ChatbotContext";

export type SuccessfulGrantApplication = {
  id: string;
  grantId: string;  // references the grant in grantsData.ts
  applicantType: string;
  projectDescription: string;
  budgetHighlights: string;
  artistBackground: string;
  successFactors: string[];
  yearAwarded: string;
  amountAwarded: string;
};

// Sample successful grant applications from Ontario artists
// In a real implementation, this would be fetched from an API or database
export const successfulApplications: SuccessfulGrantApplication[] = [
  {
    id: "app-1",
    grantId: "factor-jsp",
    applicantType: "Emerging artist (0-3 years)",
    projectDescription: "Recording of a 6-song EP exploring themes of urban life in Toronto with jazz-influenced production techniques",
    budgetHighlights: "Allocated 60% to professional studio time and mixing, 20% to session musicians, 20% to marketing",
    artistBackground: "Toronto-based indie artist with growing local following and previous EP release with 100,000+ streams",
    successFactors: [
      "Clear artistic vision with well-defined audience",
      "Realistic timeline with detailed milestones",
      "Specific marketing plan targeting niche audience",
      "Previous self-funded release showing commitment"
    ],
    yearAwarded: "2023",
    amountAwarded: "$12,000"
  },
  {
    id: "app-2",
    grantId: "tac-music",
    applicantType: "Mid-career artist (3-10 years)",
    projectDescription: "Creation and recording of a cross-cultural musical collaboration between classical Western instruments and traditional Chinese music forms",
    budgetHighlights: "40% to artist fees, 35% to recording and production, 25% to community workshop series",
    artistBackground: "Chinese-Canadian composer with two previous albums and performances at major Toronto venues",
    successFactors: [
      "Strong focus on cultural expression and community engagement",
      "Clearly articulated artistic merit and innovation",
      "Demonstrated community impact through free workshops",
      "Partnerships with local cultural organizations"
    ],
    yearAwarded: "2022",
    amountAwarded: "$14,500"
  },
  {
    id: "app-3",
    grantId: "oac-recording",
    applicantType: "Established artist (10+ years)",
    projectDescription: "Recording of an album featuring intergenerational collaborations between established Ontario musicians and emerging artists",
    budgetHighlights: "45% to artist fees (ensuring fair payment to all collaborators), 40% to studio and production, 15% to documentation",
    artistBackground: "Award-winning folk musician with 5 previous releases and extensive touring history across Canada",
    successFactors: [
      "Mentorship component showing sector development",
      "Innovative artistic approach with clear social impact",
      "Realistic budget with fair compensation practices",
      "Strong letters of support from music industry professionals"
    ],
    yearAwarded: "2023",
    amountAwarded: "$9,800"
  },
  {
    id: "app-4",
    grantId: "factor-comp",
    applicantType: "Established artist (10+ years)",
    projectDescription: "Recording, marketing and international tour support for a concept album exploring environmental themes with multimedia components",
    budgetHighlights: "30% to recording, 40% to marketing and PR, 30% to tour support and video production",
    artistBackground: "Electronic music producer with 500,000+ monthly listeners and previous sync placements in major productions",
    successFactors: [
      "Comprehensive business plan with clear ROI projections",
      "Established team including label, publicist, and booking agent",
      "Innovative cross-platform marketing strategy",
      "Strong digital presence and proven track record"
    ],
    yearAwarded: "2022",
    amountAwarded: "$38,000"
  },
  {
    id: "app-5",
    grantId: "canada-council",
    applicantType: "Mid-career artist (3-10 years)",
    projectDescription: "Creation of an experimental sound installation exploring Indigenous and electronic music traditions with accompanying community workshops",
    budgetHighlights: "50% to artist fees and elder honoraria, 25% to technical equipment, 25% to workshop facilitation and documentation",
    artistBackground: "Anishinaabe musician and sound artist with previous exhibitions at AGYU and performances at international festivals",
    successFactors: [
      "Strong cultural significance and representation",
      "Innovative artistic practice pushing boundaries",
      "Meaningful community engagement component",
      "Clear articulation of artistic excellence and impact"
    ],
    yearAwarded: "2023",
    amountAwarded: "$18,000"
  }
];

// Helper function to find successful applications for a specific grant
export const findSuccessfulApplications = (grantId: string): SuccessfulGrantApplication[] => {
  return successfulApplications.filter(app => app.grantId === grantId);
};

// Helper function to get applicable success factors based on profile
export const getRelevantSuccessFactors = (
  careerStage: string, 
  projectType: string
): string[] => {
  // Filter applications based on career stage and project type
  const relevantApps = successfulApplications.filter(app => {
    const matchesCareerStage = app.applicantType.toLowerCase().includes(
      careerStage.toLowerCase().split(' ')[0]
    );
    const matchesProjectType = app.projectDescription.toLowerCase().includes(
      projectType.toLowerCase().split(' ')[0]
    );
    
    return matchesCareerStage || matchesProjectType;
  });
  
  // Extract and combine all success factors from relevant applications
  const allFactors = relevantApps.flatMap(app => app.successFactors);
  
  // Remove duplicates
  return [...new Set(allFactors)];
};
