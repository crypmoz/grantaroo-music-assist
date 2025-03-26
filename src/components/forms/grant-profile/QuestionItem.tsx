
import { ReactNode } from "react";

type QuestionItemProps = {
  question: string;
  required: boolean;
  children: ReactNode;
};

export const QuestionItem = ({ question, required, children }: QuestionItemProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">{question}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {required ? "* Required" : "Optional"}
        </p>
      </div>
      
      <div>{children}</div>
    </div>
  );
};
