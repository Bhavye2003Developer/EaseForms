"use client";

import useFormStore from "@/utils/useFormStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
  const { form } = useFormStore();
  const [isPublishedBtnEnabled, setIsPublishedBtnEnabled] = useState(true);

  useEffect(() => {
    setIsPublishedBtnEnabled(true);
  }, [form]);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("easeforms_userId");
    if (userId === null || userId === "") redirect("/");
    setUserId(userId);
  }, []);

  return (
    <div className="w-screen flex items-center justify-between px-6 py-1 border-b border-gray-200 shadow-sm bg-white">
      <h1 className="text-2xl font-semibold text-gray-800">Create Your Form</h1>
      <button
        disabled={!isPublishedBtnEnabled}
        className={`px-4 py-2 rounded-md transition text-white ${
          isPublishedBtnEnabled
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-400 cursor-not-allowed opacity-50"
        }`}
        onClick={async () => {
          if (form.formData.questions.length < 1)
            toast.error("Empty Form can't be published");
          else {
            toast.loading("Form is being published...", {
              id: "PublishLoadToast",
            });
            setIsPublishedBtnEnabled(false);
            console.log("Sending to backend...", form, userId);
            const req = await fetch("/api/create-form", {
              method: "POST",
              body: JSON.stringify({ form, id: userId }),
            });
            const res = await req.json();
            console.log("Response found: ", res);
            toast.dismiss("PublishLoadToast");
            if (!res.error) toast.success("Form Published Successfully");
          }
        }}
      >
        Publish
      </button>
    </div>
  );
}
