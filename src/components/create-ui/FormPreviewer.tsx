"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionsView from "./QuestionsView";
import { Scene } from "@/utils/types";

const FormPreviewer = () => {
  const { form: formStruct } = useFormStore();

  return (
    <div className="flex-1 p-8 rounded-xl shadow-lg relative bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative mb-8">
        <h1 className="text-3xl font-bold italic text-center text-indigo-700 drop-shadow-sm">
          {formStruct.formData.formHeader.title || "Untitled Form"}
        </h1>

        {formStruct.settings.isTimerEnabled && (
          <span className="absolute right-0 top-2 text-xs font-medium bg-white text-indigo-700 px-3 py-1 rounded-full shadow-md border border-indigo-300">
            ⏱ {formStruct.settings.timer}
          </span>
        )}
      </div>

      <div className="rounded-lg shadow-md p-6">
        <QuestionsView
          scene={Scene.Preview}
          questions={formStruct.formData.questions}
          UIMode={formStruct.settings.UIMode}
        />
      </div>
    </div>
  );
};

export default FormPreviewer;
