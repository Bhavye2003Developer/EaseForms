"use client";

import { useEffect, useState } from "react";
import QuestionsView from "./create-ui/QuestionsView";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Scene } from "@/utils/types";
import FormSubmissionPage from "./create-ui/FormSubmissionPage";
import { toast } from "sonner";

export default function FormFillingView({ formId }: { formId: string }) {
  const { form, setForm, isFormSubmitted } = useFormFillingStore();
  const [error, setError] = useState(false);

  async function fetchFormStruct() {
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: JSON.stringify({ formId }),
      });
      const formStructResponse = await res.json();

      if (formStructResponse?.form) {
        console.log("Form got: ", formStructResponse.form);
        setForm(formStructResponse.form.FormStruct);
      } else setError(true);
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchFormStruct();
  }, []);

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center p-6 shadow-lg rounded-lg">
          <h1 className="text-xl font-semibold text-red-600 mb-2">
            Form Not Found
          </h1>
          <p className="text-gray-600">Please check the URL</p>
        </div>
      </div>
    );
  }

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
