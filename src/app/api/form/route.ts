import { NextRequest } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { formId } = await req.json();
  console.log("Request accepted: ", formId);

  const form = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  console.log(form);

  return Response.json({
    message: "Got form answers.",
    error: form === null && 404,
    form: form,
  });
}
