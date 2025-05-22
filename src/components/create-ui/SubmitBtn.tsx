import { Scene } from "@/utils/types";
import { useState } from "react";
import { toast } from "sonner";
import { BtnCss } from "./SingleQuestionCard";
import useFormFillingStore from "@/utils/useFormFillingStore";

export default function SubmitBtn({ scene }: { scene: Scene }) {
  const formSubmittingLoadingMsg = `Submitting the ${
    scene === Scene.Preview ? "example" : ""
  } form...`;

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const { form, setFormSubmitted, formId } = useFormFillingStore();

  async function submitForm() {
    const req = await fetch("/api/submit-answers", {
      method: "POST",
      body: JSON.stringify({
        formId,
        form,
      }),
    });
    const res = await req.json();
    return res;
  }

  return (
    <>
      <button
        className={
          isBtnDisabled
            ? `${BtnCss.disabled} opacity-60 cursor-not-allowed`
            : BtnCss.enabled
        }
        disabled={isBtnDisabled}
        onClick={async () => {
          setIsBtnDisabled(true);
          console.log("scene: ", scene);

          if (
            Array.isArray(form?.formData.questions) &&
            form.formData.questions.some((question) => "ans" in question)
          ) {
            const answerNotFilledIds: number[] = [];
            form?.formData.questions.forEach((question) => {
              if ("ans" in question && question.ans.isAnswerFilled === false) {
                answerNotFilledIds.push(question.id);
              }
            });
            if (answerNotFilledIds.length > 0) {
              toast.error("You havn't attended all the questions yet");
              setIsBtnDisabled(false);
            } else {
              if (scene === Scene.Preview) {
                console.log("msg: ", formSubmittingLoadingMsg);
                toast.loading(formSubmittingLoadingMsg, {
                  id: "exampleMsg",
                });
                setTimeout(() => {
                  toast.dismiss("exampleMsg");
                  setIsBtnDisabled(false);
                }, 3000);
              } else {
                toast.loading(formSubmittingLoadingMsg, {
                  id: "submittingForm",
                });
                await submitForm();
                toast.dismiss("submittingForm");
                toast.success("Form Submitted Successfully");
                setFormSubmitted();
              }
            }
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
