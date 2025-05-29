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
import ErrorPage from "../ErrorPage";
import LoadingOverlay from "../LoadingOverlay";

export default function FormEditor({ formId }: { formId: string }) {
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string>("");
  const { sharedURL, toggleShowShareURLModal, showShareURLModal } =
    useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { setForm } = useFormStore();
  const { setFormId, togglePublishBtnVisibility } = useAppStore();

  const fetchForm = async () => {
    const userId = getUserData().userId;
    const FORM_URL = `/api/create-form/fetch?formId=${formId}&userId=${userId}`;
    const req = await fetch(FORM_URL);
    const res: FetchedResponse = await req.json();

    if (res.error) {
      setError(res.msg);
    } else if (res.data.formStruct) {
      setForm(res.data.formStruct);
      togglePublishBtnVisibility();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setFormId(formId);
    fetchForm();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay message="The form is loading..." />
      ) : error ? (
        <ErrorPage msg={error} />
      ) : (
        <div
          className="flex flex-col bg-muted text-muted-foreground min-h-screen"
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
            <DialogContent className="max-w-md rounded-xl shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-lg">Form Published!</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground mb-2">
                Share this link to access your form:
              </p>
              <Input
                readOnly
                value={sharedURL}
                className="bg-background text-sm font-mono select-all"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleShowShareURLModal()}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-1 gap-1 p-1 overflow-hidden">
            <Card className="flex-1 relative p-2 bg-background rounded-2xl shadow-md border">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 left-4 z-20 text-muted-foreground hover:bg-accent"
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
                    className="absolute top-16 left-6 z-30 p-4 w-64"
                  >
                    <SettingsDialog />
                  </motion.div>
                )}
              </AnimatePresence>

              <FormCreator />
            </Card>

            <Card className="flex-1 overflow-auto p-6 bg-background rounded-2xl shadow-md border">
              <FormPreviewer />
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
