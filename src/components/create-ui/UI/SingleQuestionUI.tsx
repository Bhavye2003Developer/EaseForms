import { DivStructType, QuestionType, Scene, SectionType } from "@/utils/types";
import { useState } from "react";
import SingleQuestionCard from "../SingleQuestionCard";

export default function SingleQuestionUI({
  scene,
  questions,
}: {
  scene: Scene;
  questions: DivStructType;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const onlyQuestions = questions.filter((question) => "title" in question);

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
        {onlyQuestions.length > 0 && (
          <SingleQuestionCard
            scene={scene}
            question={onlyQuestions[currentQuestionIndex]}
            onPrev={handlePrev}
            onNext={handleNext}
            buttonsActivity={{
              prev: !isFirst,
              next: !isLast,
            }}
          />
        )}
        <div className="text-center mt-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {onlyQuestions.length}
        </div>
      </div>
    </div>
  );
}
