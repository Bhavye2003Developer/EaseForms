import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  let msg = "Congratulations You have been successfully signed up.";
  let error = null;

  try {
    const transaction = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    console.log("Transact status: ", transaction);
  } catch {
    msg = "Email already exists";
    error = 401;
  }

  return NextResponse.json({
    msg: msg,
    error: error,
  });
}
