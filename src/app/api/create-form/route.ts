import { NextRequest } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId, form } = await req.json();
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

  return Response.json({
    message: "Form created successfully",
    error: null,
    formId: transaction.id,
  });
}

export async function PUT(req: NextRequest) {
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

  return Response.json({
    message: "Form published successfully",
    error: null,
  });
}