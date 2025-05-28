"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import FormCreator from "./FormCreator";
import FormPreviewer from "./FormPreviewer";
import SettingsDialog from "./SettingsDialog";
import useFormStore from "@/utils/useFormStore";
import { FetchedResponse } from "@/utils/types";
import useAppStore from "@/utils/useAppStore";

export default function FormEditor({ formId }: { formId: string }) {
  const [showSettings, setShowSettings] = useState(false);

  const { sharedURL, toggleShowShareURLModal, showShareURLModal } =
    useAppStore();

  const settingsRef = useRef<HTMLDivElement>(null);
  const { setForm } = useFormStore();
  const { setFormId } = useAppStore();

  const fetchForm = async () => {
    const FORM_URL = `/api/create-form/fetch?formId=${formId}`;

    const req = await fetch(FORM_URL);
    const res: FetchedResponse = await req.json();

    if (res.data.formStruct) {
      setForm(res.data.formStruct);
    }
  };

  useEffect(() => {
    setFormId(formId);
    fetchForm();
  }, []);

  return (
    <div
      className="h-screen flex flex-col items-center overflow-hidden relative"
      onClick={(e) => {
        if (
          settingsRef.current &&
          !settingsRef.current.contains(e.target as Node)
        )
          setShowSettings(false);
      }}
    >
      {showShareURLModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Form Published!</h2>
            <p className="mb-4">Share this URL to access your form:</p>
            <input
              type="text"
              readOnly
              value={sharedURL}
              className="w-full p-2 border rounded-md text-sm bg-gray-100"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => toggleShowShareURLModal()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="flex-1 p-2 overflow-auto rounded-lg shadow-md relative">
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            className="absolute top-2 right-2 z-10 p-1 rounded hover:bg-gray-100"
          >
            <MoreVertical size={20} />
          </button>

          {showSettings && (
            <div
              ref={settingsRef}
              className="absolute top-10 right-2 border rounded shadow-md z-20 p-2 w-40"
            >
              <SettingsDialog />
            </div>
          )}

          <FormCreator />
        </div>
        <div className="flex-1 p-2 overflow-auto rounded-lg shadow-md">
          <FormPreviewer />
        </div>
      </div>
    </div>
  );
}
