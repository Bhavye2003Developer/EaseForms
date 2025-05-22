import { prisma } from "@/db";
import { NextRequest } from "next/server";

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
