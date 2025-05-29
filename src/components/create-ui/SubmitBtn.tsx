import { FetchedResponse, Scene } from "@/utils/types";
import { useState } from "react";
import { toast } from "sonner";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Button } from "@/components/ui/button";

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
    const res: FetchedResponse = await req.json();
    return res;
  }

  const handleSubmit = async () => {
    setIsBtnDisabled(true);

    if (
      Array.isArray(form?.formData.questions) &&
      form.formData.questions.some((question) => "ans" in question)
    ) {
      const answerNotFilledIds: number[] = [];

      form.formData.questions.forEach((question) => {
        if ("ans" in question && question.ans.isAnswerFilled === false) {
          answerNotFilledIds.push(question.id);
        }
      });

      if (answerNotFilledIds.length > 0) {
        toast.error("You haven’t attempted all the questions yet");
        setIsBtnDisabled(false);
        return;
      }

      if (scene === Scene.Preview) {
        toast.loading(formSubmittingLoadingMsg, { id: "exampleMsg" });
        setTimeout(() => {
          toast.dismiss("exampleMsg");
          setIsBtnDisabled(false);
        }, 3000);
      } else {
        toast.loading(formSubmittingLoadingMsg, { id: "submittingForm" });
        await submitForm();
        toast.dismiss("submittingForm");
        toast.success("Form Submitted Successfully");
        setFormSubmitted();
      }
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isBtnDisabled}
      variant="default"
      className="px-6"
    >
      Submit
    </Button>
  );
}
