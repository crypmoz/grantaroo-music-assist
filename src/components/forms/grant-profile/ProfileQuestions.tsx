
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { careerStages, musicGenres, projectTypes } from "@/data/grantsData";

export type QuestionType = {
  id: "careerStage" | "genre" | "streamingNumbers" | "previousGrants" | "projectType" | "projectBudget";
  question: string;
  required: boolean;
  component: React.ReactNode;
};

type ProfileQuestionsProps = {
  handleChange: (field: string, value: string) => void;
};

export const getProfileQuestions = ({ handleChange }: ProfileQuestionsProps): QuestionType[] => {
  return [
    {
      id: "careerStage",
      question: "What stage are you at in your music career?",
      required: true,
      component: (
        <Select 
          onValueChange={(value) => handleChange("careerStage", value)} 
          required
        >
          <SelectTrigger id="careerStage">
            <SelectValue placeholder="Select career stage" />
          </SelectTrigger>
          <SelectContent>
            {careerStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      id: "genre",
      question: "What's your primary music genre?",
      required: false,
      component: (
        <Select 
          onValueChange={(value) => handleChange("genre", value)}
        >
          <SelectTrigger id="genre">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {musicGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      id: "streamingNumbers",
      question: "Approximately how many monthly streams do you have across all platforms?",
      required: false,
      component: (
        <Input
          id="streamingNumbers"
          placeholder="e.g., 10000"
          onChange={(e) => handleChange("streamingNumbers", e.target.value)}
        />
      )
    },
    {
      id: "previousGrants",
      question: "Have you received any grants before? If yes, please list them.",
      required: false,
      component: (
        <Input
          id="previousGrants"
          placeholder="List any previous grants received"
          onChange={(e) => handleChange("previousGrants", e.target.value)}
        />
      )
    },
    {
      id: "projectType",
      question: "What type of project are you seeking funding for?",
      required: true,
      component: (
        <Select 
          onValueChange={(value) => handleChange("projectType", value)}
          required
        >
          <SelectTrigger id="projectType">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      id: "projectBudget",
      question: "What's your estimated project budget in CAD?",
      required: true,
      component: (
        <Input
          id="projectBudget"
          placeholder="e.g., 10000"
          onChange={(e) => handleChange("projectBudget", e.target.value)}
          required
        />
      )
    }
  ];
};
