"use client";

import { getUserData } from "@/utils/helpers";
import { FetchedResponse } from "@/utils/types";
import useAppStore from "@/utils/useAppStore";
import useFormStore from "@/utils/useFormStore";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function PublishBtn() {
  const { form } = useFormStore();
  const [isPublishedBtnEnabled, setIsPublishedBtnEnabled] = useState(true);

  const userId = useRef(getUserData().userId);
  const { formId, toggleShowShareURLModal } = useAppStore();

  useEffect(() => {
    setIsPublishedBtnEnabled(true);
  }, [form]);

  useEffect(() => {
    if (userId.current === null || userId.current === undefined) redirect("/");
  }, []);

  const handlePublish = async () => {
    if (form.formData.questions.length < 1) {
      toast.error("Empty Form can't be published");
      return;
    }

    toast.loading("Form is being published...", {
      id: "PublishLoadToast",
    });
    setIsPublishedBtnEnabled(false);

    try {
      const req = await fetch("/api/create-form", {
        method: "PUT",
        body: JSON.stringify({ form, formId: formId }),
      });
      const res: FetchedResponse = await req.json();
      toast.dismiss("PublishLoadToast");
      if (!res.error) {
        toast.success("Form Published Successfully");
        const url = `${window.location.origin}/form/${formId}`;
        toggleShowShareURLModal(url);
      } else {
        toast.error("Something went wrong while publishing.");
      }
    } catch (_) {
      toast.dismiss("PublishLoadToast");
      toast.error("Failed to publish form.");
    }
  };

  return (
    <>
      <button
        disabled={!isPublishedBtnEnabled}
        className={`px-4 py-2 rounded-md transition text-white ${
          isPublishedBtnEnabled
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-400 cursor-not-allowed opacity-50"
        }`}
        onClick={handlePublish}
      >
        Publish
      </button>
    </>
  );
}
