"use client";

import useFormStore from "@/utils/useFormStore";
import AnswerBox from "./AnswerBox";

const FormPreviewer = () => {
  const {
    form: {
      formData: { formHeader, questions },
      settings: { timer },
    },
  } = useFormStore();

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-md shadow-sm relative">
      <div className="relative mb-6">
        <h1 className="text-2xl font-semibold italic text-center text-blue-700">
          {formHeader.title || "Untitled Form"}
        </h1>
        {timer && (
          <span className="absolute right-0 top-1 text-sm text-gray-600 bg-white px-3 py-1 rounded shadow-sm border">
            ⏱ {timer}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {questions.map((question) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default FormPreviewer;
