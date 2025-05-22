import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Response {
  const { formId } = await req.json();
  console.log("Request accepted: ", formId);

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  console.log(form);

  // return Response.json({
  //   message: "Got form answers.",
  //   error: form === null && 404,
  //   form: form,
  // });

  return NextResponse.json({
    msg: "Got form answers.",
    error: form !== null ? null : "Form not found",
    data: {
      form,
    },
  });
}
