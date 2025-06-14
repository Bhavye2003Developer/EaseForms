"use client";

import { getUserData } from "@/utils/helpers";
import { FetchedResponse } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Header({ formId }: { formId: string }) {
  const { form } = useFormStore();
  const [isPublishedBtnEnabled, setIsPublishedBtnEnabled] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userId = useRef(getUserData().userId);

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
        setShareUrl(url);
        setShowModal(true);
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
      <div className="w-screen flex items-center justify-between px-6 py-1 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Your Form
        </h1>
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
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Form Published!</h2>
            <p className="mb-4">Share this URL to access your form:</p>
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full p-2 border rounded-md text-sm bg-gray-100"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
