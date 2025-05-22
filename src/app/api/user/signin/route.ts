import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  let transaction = null;

  transaction = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  console.log("Transact status: ", transaction);

  const msg =
    transaction === null ? "Email Id don't exists" : "Login Successfull";
  const error = transaction === null ? 401 : null;

  return NextResponse.json({
    msg: msg,
    error: error,
    data: {
      id: transaction?.id,
      email: transaction?.email,
    },
  });
}
