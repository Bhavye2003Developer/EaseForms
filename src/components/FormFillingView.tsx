"use client";

import { useEffect, useState } from "react";
import QuestionsView from "./create-ui/QuestionsView";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Scene } from "@/utils/types";
import FormSubmissionPage from "./create-ui/FormSubmissionPage";
import Timer from "./create-ui/Timer";
import TimeBasedIntroPage from "./create-ui/UI/TimeBasedIntroPage";

export default function FormFillingView({ formId }: { formId: string }) {
  const { form, setForm, isFormSubmitted, setFormId } = useFormFillingStore();
  const [TimerIntroPageShown, setTimerIntroPageShown] = useState(false);
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
        const isTimerEnabled =
          formStructResponse.form.FormStruct.settings.isTimerEnabled;
        setTimerIntroPageShown(isTimerEnabled);
      } else setError(true);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }

  useEffect(() => {
    fetchFormStruct();
    setFormId(formId);
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
      ) : TimerIntroPageShown ? (
        <TimeBasedIntroPage
          hhmmss={form.settings.timer}
          startForm={() => setTimerIntroPageShown(false)}
        />
      ) : (
        <div>
          <div className="relative mb-8">
            <h1 className="text-3xl font-bold italic text-center text-indigo-700 drop-shadow-sm">
              {form.formData.formHeader.title || "Untitled Form"}
            </h1>

            <Timer {...form.settings} scene={Scene.Live} />
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
