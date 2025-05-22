"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import FormCreator from "./FormCreator";
import FormPreviewer from "./FormPreviewer";
import SettingsDialog from "./SettingsDialog";
import Header from "./Header";
import useFormStore from "@/utils/useFormStore";
import { FetchedResponse } from "@/utils/types";

export default function FormEditor({ formId }: { formId: string }) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const { setForm } = useFormStore();

  const fetchForm = async () => {
    const FORM_URL = `/api/create-form/fetch?formId=${formId}`;

    const req = await fetch(FORM_URL);
    const res: FetchedResponse = await req.json();

    console.log("Fetched built form: ", res);
    if (res.data.formStruct) {
      console.log("Setting form...");
      setForm(res.data.formStruct);
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div
      className="h-screen flex flex-col items-center overflow-hidden"
      onClick={(e) => {
        if (
          settingsRef.current &&
          !settingsRef.current.contains(e.target as Node)
        )
          setShowSettings(false);
      }}
    >
      <Header formId={formId} />
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
