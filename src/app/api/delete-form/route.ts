import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Response {
  const urlParams = req.nextUrl.searchParams;
  const formId = urlParams.get("formId") || "682d630e42b3cc28e2639a61";

  const transaction = await prisma.form.delete({
    where: {
      id: formId,
    },
  });

  return NextResponse.json({
    msg: "The form has been deleted successfully",
    error: null,
    data: null,
  });
}
