import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AISuggestionsProps {
  section: string;
}

const suggestions: Record<string, string[]> = {
  projectDescription: [
    "Include specific musical genres and styles you'll explore",
    "Mention any collaborators or featured artists",
    "Describe your target audience",
    "Explain how this project advances your artistic practice",
  ],
  budget: [
    "Break down costs into categories (e.g., studio time, musicians, marketing)",
    "Include quotes from vendors when possible",
    "Don't forget to budget for promotion and distribution",
    "Consider including a contingency amount",
  ],
  timeline: [
    "Include specific milestones and deadlines",
    "Account for pre-production and rehearsal time",
    "Consider seasonal factors that might affect your project",
    "Include time for marketing and promotion",
  ],
  impact: [
    "Describe how your project will benefit the local music scene",
    "Include plans for community engagement",
    "Mention any educational or workshop components",
    "Discuss long-term benefits to Toronto's cultural landscape",
  ],
};

export const AISuggestions = ({ section }: AISuggestionsProps) => {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-primary">AI Writing Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Suggestions for {section.replace(/([A-Z])/g, ' $1').toLowerCase()}:
          </p>
          <ul className="space-y-2">
            {suggestions[section]?.map((suggestion, index) => (
              <li key={index} className="text-sm flex gap-2">
                <span className="text-accent">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};