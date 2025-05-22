import { FetchAnswersFromForm } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

import { Answer } from "@/utils/types";
import { prisma } from "@/db";
import { Prisma } from "../../../../generated/prisma";

export async function POST(req: NextRequest) {
  const { form, formId } = await req.json();
  // console.log("backend: ", form, formId);
  const answers: Answer[] = FetchAnswersFromForm(form);

  console.log(answers);

  const transaction = await prisma.formAnswer.create({
    data: {
      formId: formId,
      answers: answers as Prisma.InputJsonArray,
    },
  });
  console.log("Answer creation status: ", transaction);
  return NextResponse.json({
    msg: "Answers submitted successfully",
  });
}
