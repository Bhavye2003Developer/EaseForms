import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Response {
  const params = req.nextUrl.searchParams;
  const email: string = params.get("email")!;
  console.log("Got email: ", email);

  let transaction = null;

  const isUserWithEmailIdExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (isUserWithEmailIdExists) {
    return NextResponse.json({
      msg: "User with email already exists",
      error: null,
      data: {
        userId: isUserWithEmailIdExists.id,
      },
    });
  }

  transaction = await prisma.user.create({
    data: {
      email: email,
    },
  });
  console.log("Transact status Signup: ", transaction);

  const msg = "Congratulations You have been successfully signed up.";

  return NextResponse.json({
    msg: msg,
    error: null,
    data: {
      userId: transaction.id,
    },
  });
}
