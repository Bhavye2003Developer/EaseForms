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
    if (!isFirst) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // console.log("questions updated: ", questions);
    const sectionedQuestionsArray: QuestionType[][] = [];
    let sectionTempArray: QuestionType[] = [];
    questions.forEach((question) => {
      if ("ans" in question) sectionTempArray.push(question);
      else {
        if (sectionTempArray.length > 0)
          sectionedQuestionsArray.push(sectionTempArray);
        sectionTempArray = [];
      }
    });
    if (sectionTempArray.length > 0)
      sectionedQuestionsArray.push(sectionTempArray);
    setSectionedQuestionsArray(sectionedQuestionsArray);
  }, [questions]);

  return (
    <div className="w-full">
      <div className="w-full">
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
        <div className="text-center mt-4 text-sm text-gray-500">
          Section {currentSectionIndex + 1} of {sectionedQuestionsArray.length}
        </div>
      </div>
    </div>
  );
}
