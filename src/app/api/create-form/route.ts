import { FormType } from "@/utils/types";
import { NextRequest } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

let form: FormType | null = null;

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Request accepted: ", data);
  console.log("Id: ", data.id);
  const transaction = await prisma.form.create({
    data: {
      user: {
        connect: {
          id: data.id,
        },
      },
      FormStruct: data.form,
    },
  });

  console.log("Form created status: ", transaction);

  return Response.json({
    message: "Form created successfully",
    error: null,
  });
}

export function GET() {
  return Response.json({
    data: form,
    status: 200,
  });
}
