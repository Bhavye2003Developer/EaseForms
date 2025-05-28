import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Response {
  const searchParams = req.nextUrl.searchParams;
  const formId: string =
    searchParams.get("formId") || "682d630e42b3cc28e2639a61";

  const userId: string =
    searchParams.get("userId") || "682d630e42b3cc28e2639a61";

  console.log("Fethcing form for: ", formId);

  const transaction = await prisma.form.findFirst({
    where: {
      id: formId,
      userId: userId,
    },
  });

  console.log("Getting form...", transaction);

  if (!transaction)
    return NextResponse.json({
      msg: "You are not authorized to access or edit the form",
      error: 401,
      data: null,
    });

  return NextResponse.json({
    msg: "Fetched form",
    error: null,
    data: {
      formStruct: transaction?.FormStruct,
    },
  });
}
