
import { FileText, BarChartHorizontal, Clock, DollarSign } from "lucide-react";

export const FORM_SECTIONS = [
  {
    id: "project-summary",
    title: "Project Summary",
    description: "A concise overview of your music project.",
    icon: FileText
  },
  {
    id: "artist-background",
    title: "Artist Background",
    description: "Your musical history, accomplishments, and career trajectory.",
    icon: BarChartHorizontal
  },
  {
    id: "project-timeline",
    title: "Project Timeline",
    description: "Key milestones and deadlines for your project.",
    icon: Clock
  },
  {
    id: "budget",
    title: "Budget Breakdown",
    description: "Detailed allocation of funds for your project.",
    icon: DollarSign
  },
  {
    id: "impact",
    title: "Expected Impact",
    description: "How this project will advance your career and contribute to the music community.",
    icon: BarChartHorizontal
  }
];
