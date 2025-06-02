import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export default function QuestionCasing({
  children,
  questionId,
  isAnswerFilled,
}: {
  children: ReactNode;
  questionId: number;
  isAnswerFilled: boolean;
}) {
  return (
    <Card
      className={`relative p-1 transition-all ${
        isAnswerFilled ? "border-border" : "border-destructive/30"
      }`}
    >
      {children}

      {!isAnswerFilled && (
        <p className="absolute bottom-2 right-4 text-sm text-destructive">
          ⚠️ You haven’t attempted this question
        </p>
      )}
    </Card>
  );
}
