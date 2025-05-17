import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  let msg = "Login Successfull";
  let error = null;

  try {
    const transaction = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    console.log("Transact status: ", transaction);
  } catch {
    msg = "Email Id don't exists";
    error = 401;
  }

  return NextResponse.json({
    msg: msg,
    error: error,
  });
}
