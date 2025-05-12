"use client";

import { useEffect } from "react";
import QuestionsView from "./create-ui/QuestionsView";
import useFormFillingStore from "@/utils/useFormFillingStore";

export default function FormFillingView() {
  const { form, setForm } = useFormFillingStore();

  async function fetchFormStruct() {
    const res = await fetch("/api/create-form");
    const formStructResponse = (await res.json()).data;
    console.log("Form got: ", formStructResponse);
    setForm(formStructResponse.form);
  }

  useEffect(() => {
    fetchFormStruct();
  }, []);

  return (
    <div className="flex-1 p-8 rounded-xl shadow-lg relative bg-gradient-to-br from-blue-50 to-indigo-100 w-screen h-screen">
      {form === null ? (
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
              questions={form.formData.questions}
              UIMode={form.settings.UIMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
