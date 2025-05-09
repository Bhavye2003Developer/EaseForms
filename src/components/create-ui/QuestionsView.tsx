"use client";

import useFormStore from "@/utils/useFormStore";
import SingleQuestionUI from "./SingleQuestionUI";
import { QuestionsUIMode } from "@/utils/types";
import SimpleQuestionUI from "./Options/SimpleQuestionUI";

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
        <SimpleQuestionUI questions={questions} />
      ) : (
        <SingleQuestionUI questions={questions} />
      )}
    </div>
  );
}
