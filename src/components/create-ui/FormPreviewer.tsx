"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionsView from "./QuestionsView";

const FormPreviewer = () => {
  const {
    form: {
      formData: { formHeader },
      settings: { timer, isTimerEnabled },
    },
  } = useFormStore();

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-md shadow-sm relative">
      <div className="relative mb-6">
        <h1 className="text-2xl font-semibold italic text-center text-blue-700">
          {formHeader.title || "Untitled Form"}
        </h1>
        {isTimerEnabled && (
          <span className="absolute right-0 top-1 text-sm text-gray-600 bg-white px-3 py-1 rounded shadow-sm border">
            ⏱ {timer}
          </span>
        )}
      </div>
      <QuestionsView />
    </div>
  );
};

export default FormPreviewer;
