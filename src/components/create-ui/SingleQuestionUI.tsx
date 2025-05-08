import { QuestionType } from "@/utils/types";
import AnswerBox from "./AnswerBox";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

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
    <div className="flex flex-col justify-between items-center h-[80vh] max-w-xl w-full mx-auto p-6 rounded-2xl shadow-lg bg-white">
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
    </div>
  );
}
