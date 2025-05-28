import { prisma } from "@/db";
import { FormsMetaData, Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Response {
  const userId = req.nextUrl.searchParams.get("userId")!;
  const formsMetaData: FormsMetaData = await prisma.form.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      FormStruct: {
        select: {
          formData: {
            select: {
              formHeader: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
      publishedDate: true,
    },
  });
  return NextResponse.json({
    msg: "Forms metadata fetched successfully",
    error: null,
    data: formsMetaData,
  });
}
