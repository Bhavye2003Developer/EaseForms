import { prisma } from "@/db";
import { FormattedAnswerType, Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Response {
  const searchParams = req.nextUrl.searchParams;
  const formId: string =
    searchParams.get("formId") || "682d630e42b3cc28e2639a61";
  const transaction = await prisma.formAnswer.findMany({
    where: {
      formId: formId,
    },
    select: {
      answers: {
        select: {
          question: true,
          data: true,
        },
      },
    },
  });

  const answers = transaction.map((answersData) => answersData.answers);

  let maxQuestionsArrayIndex = 0,
    cnt = 0;
  answers.forEach((answersData, index) => {
    if (answersData.length > cnt)
      (cnt = answersData.length), (maxQuestionsArrayIndex = index);
  });

  const questions = answers[maxQuestionsArrayIndex].map(
    (answerData) => answerData.question
  );

  console.log(answers);

  console.log("questions: ", questions);

  const formattedAnswers: any[] = [];
  answers.forEach((answersData) => {
    const structuredAnswers: any = {};
    questions.forEach(
      (question) =>
        (structuredAnswers[question] =
          answersData.find((answer) => answer.question === question)?.data ||
          "")
    );
    formattedAnswers.push(structuredAnswers);
  });

  console.log("Fetched answers: ", formattedAnswers);

  return NextResponse.json({
    msg: "Raw responses",
    error: null,
    data: {
      answers: formattedAnswers,
    },
  });
}
