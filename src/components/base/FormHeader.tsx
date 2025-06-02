"use client";

import useFormStore from "@/utils/useFormStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function FormHeader() {
  const createNewQuestion = useFormStore((state) => state.createNewQuestion);
  const setFormHeaderState = useFormStore((state) => state.updateFormHeader);
  const [title, setTitle] = useState(
    useFormStore((state) => state.form.formData.formHeader.title)
  );
  const wrapperRef = useRef(null);

  useEffect(() => {
    setFormHeaderState({ title });
  }, [title]);

  return (
    <Card
      ref={wrapperRef}
      className="w-full p-6 text-left border border-zinc-200 rounded-xl shadow-sm bg-white"
    >
      <CardContent className="p-0">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-4">
          Form Header
        </h1>

        <Input
          autoFocus
          type="text"
          value={title}
          placeholder="Type your form heading here..."
          className="mb-6 bg-white text-zinc-800 shadow-md"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white"
            onClick={() => createNewQuestion(0)}
          >
            ➕ Add New Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
