import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const formId = searchParams.get("formId") || "682d630e42b3cc28e2639a61";

  console.log("Fethcing form for: ", formId);

  const transaction = await prisma.form.findFirst({
    where: {
      id: formId,
    },
  });

  console.log("Getting form...", transaction);
  return NextResponse.json({
    msg: "Fetched form",
    error: null,
    formStruct: transaction?.FormStruct,
  });
}
