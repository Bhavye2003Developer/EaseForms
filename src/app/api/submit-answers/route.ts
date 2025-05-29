import { FetchAnswersFromForm } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Answer, Response } from "@/utils/types";
import { prisma } from "@/db";
import { SubmittedAnswer } from "../../../../generated/prisma";

export async function POST(req: NextRequest): Response {
  const { form, formId } = await req.json();
  // console.log("backend: ", form, formId);
  const answers: SubmittedAnswer[] = FetchAnswersFromForm(form);

  console.log(answers);

  const transaction = await prisma.formAnswer.create({
    data: {
      formId: formId,
      answers: answers,
    },
  });
  console.log("Answer creation status: ", transaction);
  return NextResponse.json({
    msg: "Answers submitted successfully",
    error: null,
    data: null,
  });
}
