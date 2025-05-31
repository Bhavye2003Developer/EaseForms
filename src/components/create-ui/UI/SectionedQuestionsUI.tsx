import { DivStructType, QuestionType, Scene } from "@/utils/types";
import { useEffect, useState } from "react";
import MultipleQuestionsCard from "../MultipleQuestionsCard";

export default function SectionedQuestionsUI({
  scene,
  questions,
}: {
  questions: DivStructType;
  scene: Scene;
}) {
  const [sectionedQuestionsArray, setSectionedQuestionsArray] = useState<
    QuestionType[][]
  >([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === sectionedQuestionsArray.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentSectionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const sectioned: QuestionType[][] = [];
    let buffer: QuestionType[] = [];

    let startIndex = 0;
    let endIndex = questions.length - 1;

    while (!("ans" in questions[startIndex]) && startIndex < questions.length)
      ++startIndex;

    while (!("ans" in questions[endIndex]) && endIndex >= 0) --endIndex;

    // console.log("before everything", questions, startIndex, endIndex);

    questions.slice(startIndex, endIndex + 1).forEach((q) => {
      if ("ans" in q) {
        buffer.push(q);
      } else {
        if (buffer.length) sectioned.push(buffer);
        buffer = [];
      }
    });

    if (buffer.length) sectioned.push(buffer);
    setSectionedQuestionsArray(sectioned);
  }, [questions]);

  return (
    <div className="w-full space-y-6">
      {sectionedQuestionsArray.length > 0 && (
        <MultipleQuestionsCard
          scene={scene}
          questions={sectionedQuestionsArray[currentSectionIndex]}
          onPrev={handlePrev}
          onNext={handleNext}
          buttonsActivity={{
            prev: !isFirst,
            next: !isLast,
          }}
        />
      )}

      <div className="text-center text-sm text-muted-foreground font-medium pt-2">
        Section {currentSectionIndex + 1} of {sectionedQuestionsArray.length}
      </div>
    </div>
  );
}
