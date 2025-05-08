"use client";

import useFormStore from "@/utils/useFormStore";
import AnswerBox from "./AnswerBox";
import SingleQuestionUI from "./SingleQuestionUI";
import { QuestionsUIMode } from "@/utils/types";

export default function QuestionsView() {
  const {
    form: {
      formData: { questions },
      settings: { UIMode },
    },
  } = useFormStore();

  return (
    <div className="space-y-4">
      {UIMode === QuestionsUIMode.Simple ? (
        questions.map((question) => (
          <div
            key={question.id}
            className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
          >
            <h2 className="text-lg font-medium text-gray-800">
              {question.title}
            </h2>
            <AnswerBox
              isInteractive={true}
              data={question.ans.data}
              questionId={question.id}
              option={question.ans.type}
            />
          </div>
        ))
      ) : (
        <SingleQuestionUI questions={questions} />
      )}
    </div>
  );
}
