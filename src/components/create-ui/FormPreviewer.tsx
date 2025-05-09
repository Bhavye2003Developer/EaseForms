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
    <div className="flex-1 p-8 rounded-xl shadow-lg relative bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative mb-8">
        <h1 className="text-3xl font-bold italic text-center text-indigo-700 drop-shadow-sm">
          {formHeader.title || "Untitled Form"}
        </h1>

        {isTimerEnabled && (
          <span className="absolute right-0 top-2 text-xs font-medium bg-white text-indigo-700 px-3 py-1 rounded-full shadow-md border border-indigo-300">
            ⏱ {timer}
          </span>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <QuestionsView />
      </div>
    </div>
  );
};

export default FormPreviewer;
