import { ReactNode } from "react";

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
    <div
      className={`relative rounded-xl p-1 transition-all ${
        !isAnswerFilled ? "border border-red-200" : "border border-gray-200"
      }`}
    >
      {children}

      {!isAnswerFilled && (
        <p className="absolute bottom-2 right-4 text-sm text-red-600">
          ⚠️ You haven’t attempted this question
        </p>
      )}
    </div>
  );
}
