
import { GrantType } from "@/context/ChatbotContext";

export const availableGrants: GrantType[] = [
  {
    id: "factor-jsp",
    name: "Juried Sound Recording",
    provider: "FACTOR",
    deadline: "May 30, 2024",
    maxAmount: "$25,000",
    eligibility: [
      "Canadian citizen or permanent resident",
      "Professional musician with commercial releases",
      "Minimum streaming history required"
    ],
    url: "https://www.factor.ca/programs/juried-sound-recording/"
  },
  {
    id: "factor-comp",
    name: "Comprehensive Artist",
    provider: "FACTOR",
    deadline: "June 15, 2024",
    maxAmount: "$45,000",
    eligibility: [
      "Established Canadian artists",
      "Minimum 1,500 units sold or streamed",
      "Commercial track record"
    ],
    url: "https://www.factor.ca/programs/comprehensive-artist/"
  },
  {
    id: "tac-music",
    name: "Music Creation and Audio Recording",
    provider: "Toronto Arts Council",
    deadline: "July 1, 2024",
    maxAmount: "$15,000",
    eligibility: [
      "Toronto-based musician or ensemble",
      "Professional artist",
      "Original music"
    ],
    url: "https://torontoartscouncil.org/grant-programs/music-creation-and-audio-recording"
  },
  {
    id: "oac-recording",
    name: "Popular Music Recording",
    provider: "Ontario Arts Council",
    deadline: "August 20, 2024",
    maxAmount: "$10,000",
    eligibility: [
      "Ontario-based musicians",
      "Professional artist",
      "Minimum of one prior release"
    ],
    url: "https://www.arts.on.ca/grants/popular-music-recording"
  },
  {
    id: "canada-council",
    name: "Music: Production Grants",
    provider: "Canada Council for the Arts",
    deadline: "September 15, 2024",
    maxAmount: "$20,000",
    eligibility: [
      "Canadian professional musicians",
      "Artistic excellence",
      "National/international impact"
    ],
    url: "https://canadacouncil.ca/funding/grants/arts-abroad/music-production"
  }
];

export const careerStages = [
  "Emerging artist (0-3 years)",
  "Mid-career artist (3-10 years)",
  "Established artist (10+ years)",
  "Grant writer for multiple artists"
];

export const musicGenres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Classical",
  "Folk",
  "Country",
  "World",
  "Experimental",
  "Other"
];

export const projectTypes = [
  "Album recording",
  "Music video production",
  "Tour support",
  "Marketing and promotion",
  "Professional development",
  "Digital content creation",
  "Live performance production"
];

// Simple grant matching algorithm
export const findMatchingGrants = (profile: {
  careerStage: string;
  genre: string;
  streamingNumbers: string;
  projectType: string;
  projectBudget: string;
}): GrantType[] => {
  // In a real app, this would have a more sophisticated matching algorithm
  
  // For this example, let's do some basic filtering
  let matches = [...availableGrants];
  
  // Filter by career stage
  if (profile.careerStage.includes("Emerging")) {
    // Emerging artists might be better suited for TAC and smaller grants
    matches = matches.filter(grant => 
      grant.provider.includes("Toronto") || 
      parseInt(grant.maxAmount.replace(/\D/g, '')) < 20000);
  }
  
  if (profile.careerStage.includes("Established")) {
    // Established artists qualify for the comprehensive programs
    matches = matches.filter(grant => 
      grant.name.includes("Comprehensive") || 
      grant.eligibility.some(e => e.includes("Established") || e.includes("track record")));
  }
  
  // Filter by project type
  if (profile.projectType.includes("Album") || profile.projectType.includes("recording")) {
    matches = matches.filter(grant => 
      grant.name.includes("Recording") || 
      grant.name.includes("Sound") ||
      grant.eligibility.some(e => e.includes("release")));
  }
  
  // Budget considerations (simple check)
  const budget = parseInt(profile.projectBudget.replace(/\D/g, ''));
  if (budget > 0) {
    matches = matches.filter(grant => {
      const maxAmount = parseInt(grant.maxAmount.replace(/\D/g, ''));
      return maxAmount >= budget * 0.7; // Grant should cover at least 70% of budget
    });
  }
  
  return matches.length > 0 ? matches : availableGrants.slice(0, 2);
};
