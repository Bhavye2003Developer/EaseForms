"use client";

import FormEditor from "@/components/create-ui/FormEditor";
import useFormStore from "@/utils/useFormStore";
import { useEffect } from "react";

export default function CreatePage() {
  const {
    form: { formData },
  } = useFormStore();

  useEffect(() => {
    console.log("Updated form quetions", formData.questions);
  }, [formData.questions]);

  return (
    <div>
      <FormEditor />
    </div>
  );
}
