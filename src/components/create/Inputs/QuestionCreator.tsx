"use client";

import { AnsOption, QuestionType, Scene } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import { useEffect, useState } from "react";
import AnswerBox from "./AnswerBox";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnsType } from "../../../../generated/prisma";

export default function QuestionCreator({
  questionData,
  index,
}: {
  questionData: QuestionType;
  index: number;
}) {
  const [question, setQuestion] = useState(questionData);
  const { updateQuestion } = useFormStore((state) => state);

  useEffect(() => {
    updateQuestion(question.id, question);
  }, [question]);

  return (
    <Card className="w-full max-w-3xl mx-auto rounded-2xl bg-background border border-border/2 shadow-sm">
      <CardHeader>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {index + 1}. <span className="text-muted-foreground">Question</span>
        </h2>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <Label htmlFor="question" className="text-sm text-muted-foreground">
              Question
            </Label>
            <Input
              id="question"
              autoFocus
              value={question.title}
              placeholder="Type your question here..."
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              className="rounded-lg border-border/30"
            />
          </div>

          <div className="w-full sm:w-52 space-y-2">
            <Label
              htmlFor="answerType"
              className="text-sm text-muted-foreground"
            >
              Answer Type
            </Label>
            <Select
              value={question.ans.type}
              onValueChange={(val) => {
                const ansType = AnsType[val as keyof typeof AnsType];
                setQuestion({
                  ...question,
                  ans: {
                    ...question.ans,
                    type: ansType,
                    data: AnsOption[ansType],
                  },
                });
              }}
            >
              <SelectTrigger className="rounded-lg border-border/30">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(AnsType).map((opt, idx) => (
                  <SelectItem key={idx} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2">
          <AnswerBox
            option={question.ans.type}
            scene={Scene.Editor}
            questionId={question.id}
            data={question.ans.data}
          />
        </div>
      </CardContent>
    </Card>
  );
}
