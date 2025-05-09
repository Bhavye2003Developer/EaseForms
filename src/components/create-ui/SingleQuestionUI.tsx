import { QuestionType } from "@/utils/types";
import QuestionCard from "./QuestionCard";
import { useState } from "react";

export default function SingleQuestionUI({
  questions,
}: {
  questions: QuestionType[];
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        {questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onPrev={handlePrev}
            onNext={handleNext}
            buttonsActivity={{
              prev: !isFirst,
              next: !isLast,
            }}
          />
        )}
        <div className="text-center mt-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
