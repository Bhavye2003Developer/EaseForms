"use client";

import { useEffect } from "react";
import QuestionsView from "./create-ui/QuestionsView";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Scene } from "@/utils/types";
import FormSubmissionPage from "./create-ui/FormSubmissionPage";

export default function FormFillingView() {
  const { form, setForm, isFormSubmitted } = useFormFillingStore();

  async function fetchFormStruct() {
    const res = await fetch("/api/create-form");
    const formStructResponse = await res.json();
    if (formStructResponse.data) {
      console.log("Form got: ", formStructResponse.data);
      setForm(formStructResponse.data.form);
    }
  }

  useEffect(() => {
    fetchFormStruct();
  }, []);

  return (
    <div className="flex-1 p-8 rounded-xl shadow-lg relative bg-gradient-to-br w-screen h-screen">
      {isFormSubmitted ? (
        <FormSubmissionPage />
      ) : form === null ? (
        "Loading..."
      ) : (
        <div>
          <div className="relative mb-8">
            <h1 className="text-3xl font-bold italic text-center text-indigo-700 drop-shadow-sm">
              {form.formData.formHeader.title || "Untitled Form"}
            </h1>

            {form.settings.isTimerEnabled && (
              <span className="absolute right-0 top-2 text-xs font-medium bg-white text-indigo-700 px-3 py-1 rounded-full shadow-md border border-indigo-300">
                ⏱ {form.settings.timer}
              </span>
            )}
          </div>

          <div className="rounded-lg shadow-md p-6">
            <QuestionsView
              scene={Scene.Live}
              questions={form.formData.questions}
              UIMode={form.settings.UIMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
