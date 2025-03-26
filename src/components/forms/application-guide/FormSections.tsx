
import { ReactNode } from "react";
import { Template } from "./FormSectionCard";
import { Award, Brush, Briefcase, Lightbulb, Search, Target, Users, Sparkles, Calendar, DollarSign, FileText } from "lucide-react";

export type Section = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  examples?: Template[];
  tips?: string[];
  advice?: string;
};

export const formSections: Section[] = [
  {
    id: "artist-bio",
    title: "Artist Biography",
    description: "Introduce yourself and your background",
    icon: <Users className="h-5 w-5 text-blue-600" />,
    tips: [
      "Keep it concise (200-300 words)",
      "Highlight relevant achievements",
      "Mention your artistic style/approach",
      "Include relevant education or training"
    ],
    advice: "Focus on what makes your artistic journey unique. Connect your background to the specific project you're seeking funding for. Reviewers want to understand both your qualifications and your artistic vision.",
    examples: [
      {
        id: "bio-1",
        quality: "excellent",
        title: "Professional Jazz Composer Bio",
        content: "Jane Smith is an award-winning jazz composer and pianist based in Toronto. With over 15 years of performance experience, she has released four critically acclaimed albums and performed at major venues including Koerner Hall and the Montreal Jazz Festival. Her innovative approach blends traditional jazz with electronic elements, creating a distinctive sound that has earned recognition from the Canada Council for the Arts and the SOCAN Foundation. Jane holds a Master's degree in Jazz Performance from York University and teaches composition at Humber College.",
        tags: ["jazz", "established artist"]
      },
      {
        id: "bio-2",
        quality: "good",
        title: "Emerging Folk Artist Bio",
        content: "Michael Chen is a folk singer-songwriter from Windsor, Ontario. Since beginning his musical journey five years ago, he has independently released two EPs and built a growing following through intimate venue performances across Southern Ontario. His songwriting draws inspiration from Canadian landscapes and personal narratives, emphasizing authentic storytelling. Michael graduated from the University of Windsor's Music program in 2020 and has since been focusing on developing his unique voice in the folk scene.",
        tags: ["folk", "emerging artist"]
      }
    ]
  },
  {
    id: "project-summary",
    title: "Project Summary",
    description: "Brief overview of your proposed project",
    icon: <Lightbulb className="h-5 w-5 text-purple-600" />,
    tips: [
      "State your project clearly (1-2 sentences)",
      "Explain why it matters",
      "Mention target audience",
      "Include timeline and key outputs"
    ]
  },
  {
    id: "project-details",
    title: "Project Details",
    description: "Comprehensive explanation of your project",
    icon: <FileText className="h-5 w-5 text-teal-600" />,
    tips: [
      "Be specific about methodology",
      "Explain unique aspects",
      "Detail your creative process",
      "Connect to your artistic development"
    ]
  },
  {
    id: "artistic-vision",
    title: "Artistic Vision",
    description: "Your creative goals and inspiration",
    icon: <Brush className="h-5 w-5 text-indigo-600" />,
    tips: [
      "Articulate your artistic values",
      "Explain influences and inspiration",
      "Connect to broader artistic movements",
      "Highlight innovative elements"
    ]
  },
  {
    id: "budget",
    title: "Budget",
    description: "Detailed financial plan for your project",
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    tips: [
      "Be realistic and detailed",
      "Include all expense categories",
      "Show multiple revenue sources",
      "Include in-kind contributions"
    ]
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "Project schedule and key milestones",
    icon: <Calendar className="h-5 w-5 text-orange-600" />,
    tips: [
      "Create a month-by-month breakdown",
      "Include preparation and follow-up phases",
      "Add key milestones and deliverables",
      "Consider potential delays"
    ]
  },
  {
    id: "audience-impact",
    title: "Audience & Impact",
    description: "Who will benefit and how you'll reach them",
    icon: <Target className="h-5 w-5 text-red-600" />,
    tips: [
      "Define your audience specifically",
      "Explain engagement strategies",
      "Discuss marketing approach",
      "Describe intended impact"
    ]
  },
  {
    id: "evaluation",
    title: "Evaluation Plan",
    description: "How you'll measure project success",
    icon: <Search className="h-5 w-5 text-amber-600" />,
    tips: [
      "Include both quantitative and qualitative metrics",
      "Explain your data collection methods",
      "Set realistic success indicators",
      "Describe how you'll share results"
    ]
  },
  {
    id: "career-advancement",
    title: "Career Advancement",
    description: "How this project will further your career",
    icon: <Briefcase className="h-5 w-5 text-blue-600" />,
    tips: [
      "Connect to long-term career goals",
      "Explain new skills or opportunities",
      "Discuss potential future projects",
      "Highlight professional relationships"
    ]
  },
  {
    id: "innovation",
    title: "Innovation & Contribution",
    description: "What makes your project unique and valuable",
    icon: <Sparkles className="h-5 w-5 text-purple-600" />,
    tips: [
      "Describe what's new or different",
      "Explain relevance to current music landscape",
      "Discuss contribution to your genre",
      "Highlight technical or artistic innovations"
    ]
  },
  {
    id: "support-materials",
    title: "Support Materials",
    description: "Additional assets to strengthen your application",
    icon: <Award className="h-5 w-5 text-yellow-600" />,
    tips: [
      "Include high-quality audio/video samples",
      "Add relevant press or testimonials",
      "Provide letters of support/collaboration",
      "Include visual materials if relevant"
    ]
  }
];
