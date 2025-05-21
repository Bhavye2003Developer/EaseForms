"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionsView from "./QuestionsView";
import { Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { useEffect } from "react";
import Timer from "./Timer";

const FormPreviewer = () => {
  const { form, setForm } = useFormFillingStore();
  const { form: buildForm } = useFormStore();

  useEffect(() => {
    setForm(buildForm);
  }, [buildForm]);

  return (
    <div className="flex-1 p-8 rounded-xl shadow-lg relative bg-gradient-to-br h-screen">
      {form === null ? (
        "Loading..."
      ) : (
        <div>
          <div className="relative mb-8">
            <h1 className="text-3xl font-bold italic text-center text-indigo-700 drop-shadow-sm">
              {form.formData.formHeader.title || "Untitled Form"}
            </h1>

            <Timer {...form.settings} scene={Scene.Preview} />
          </div>

          <div className="rounded-lg shadow-md p-6">
            <QuestionsView
              scene={Scene.Preview}
              questions={form.formData.questions}
              UIMode={form.settings.UIMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPreviewer;
