import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const params = req.nextUrl.searchParams;
  // const userId: string = params.get("userId")!;
  // let transaction = null;
  // transaction = await prisma.user.findFirst({
  //   where: {
  //     userId,
  //   },
  // });
  // console.log("Transact status: ", transaction);
  // const msg =
  //   transaction === null ? "Email Id don't exists" : "Login Successfull";
  // const error = transaction === null ? 401 : null;
  // return NextResponse.json({
  //   // msg: msg,
  //   error: error,
  //   data: {
  //     id: transaction?.id,
  //   },
  // });
}
