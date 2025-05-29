"use client";

import useFormStore from "@/utils/useFormStore";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { useEffect } from "react";
import QuestionsView from "./QuestionsView";
import Timer from "./Timer";
import { Scene } from "@/utils/types";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FormPreviewer() {
  const { form, setForm } = useFormFillingStore();
  const { form: buildForm } = useFormStore();

  useEffect(() => {
    setForm(buildForm);
  }, [buildForm, setForm]);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="h-6 w-48" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-700 italic tracking-tight">
            {form.formData.formHeader.title || "Untitled Form"}
          </h1>
          <Timer {...form.settings} scene={Scene.Preview} />
        </div>

        <Separator />

        <Card className="border-none">
          <CardContent>
            <ScrollArea className="h-full w-full">
              <QuestionsView
                scene={Scene.Preview}
                questions={form.formData.questions}
                UIMode={form.settings.UIMode}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
