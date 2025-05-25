import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Response {
  const { userId, form } = await req.json();

  console.log("userId: ", userId);

  const transaction = await prisma.form.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      FormStruct: form,
    },
  });

  console.log("Form created status: ", transaction);

  return NextResponse.json({
    msg: "Form created successfully",
    error: null,
    data: { formId: transaction.id },
  });
}

export async function PUT(req: NextRequest): Response {
  const data = await req.json();
  console.log("Request accepted: ", data);
  console.log("Formid: ", data.formId);
  const transaction = await prisma.form.update({
    where: {
      id: data.formId,
    },
    data: {
      FormStruct: data.form,
    },
  });
  console.log("Form updated status: ", transaction);

  return NextResponse.json({
    msg: "Form published successfully",
    error: null,
    data: null,
  });
}
