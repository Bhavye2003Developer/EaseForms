"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FormCreator from "./FormCreator";
import FormPreviewer from "./FormPreviewer";
import SettingsDialog from "./SettingsDialog";
import useFormStore from "@/utils/useFormStore";
import useAppStore from "@/utils/useAppStore";
import { getUserData } from "@/utils/helpers";
import { toast } from "sonner";
import { FetchedResponse } from "@/utils/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function FormEditor({ formId }: { formId: string }) {
  const [showSettings, setShowSettings] = useState(false);

  const { sharedURL, toggleShowShareURLModal, showShareURLModal } =
    useAppStore();

  const settingsRef = useRef<HTMLDivElement>(null);
  const { setForm } = useFormStore();
  const { setFormId } = useAppStore();

  const fetchForm = async () => {
    const userId = getUserData().userId;
    const FORM_URL = `/api/create-form/fetch?formId=${formId}&userId=${userId}`;

    const req = await fetch(FORM_URL);
    const res: FetchedResponse = await req.json();

    if (res.error) {
      toast.error(res.msg);
    } else if (res.data.formStruct) {
      setForm(res.data.formStruct);
    }
  };

  useEffect(() => {
    setFormId(formId);
    fetchForm();
  }, []);

  return (
    <div
      className="h-screen overflow-hidden bg-zinc-50 text-zinc-800 flex flex-col"
      onClick={(e) => {
        if (
          settingsRef.current &&
          !settingsRef.current.contains(e.target as Node)
        ) {
          setShowSettings(false);
        }
      }}
    >
      <Dialog
        open={showShareURLModal}
        onOpenChange={() => toggleShowShareURLModal()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Form Published!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-zinc-600">
            Share this link to access your form:
          </p>
          <Input
            readOnly
            value={sharedURL}
            className="bg-zinc-100 text-sm font-mono select-all"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <div className="flex justify-end pt-2">
            <Button onClick={() => toggleShowShareURLModal()}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 gap-2 p-2 overflow-hidden">
        <Card className="flex-1 relative overflow-hidden p-4 border-zinc-200 bg-white">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 left-2 z-20 text-zinc-600 hover:bg-zinc-100"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <MoreVertical size={18} />
          </Button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                ref={settingsRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-12 left-4 z-30 p-3 bg-white border rounded-lg shadow-md"
              >
                <SettingsDialog />
              </motion.div>
            )}
          </AnimatePresence>

          <FormCreator />
        </Card>

        <Card className="flex-1 overflow-auto p-4 border-zinc-200 bg-white">
          <FormPreviewer />
        </Card>
      </div>
    </div>
  );
}
