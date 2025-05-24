import { prisma } from "@/db";
import { Response } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Response {
  const params = req.nextUrl.searchParams;
  const clerkUserId: string = params.get("clerkUserId")!;
  console.log("Got clerkId: ", clerkUserId);

  let transaction = null;

  const isUserWithClerkIdExists = await prisma.user.findFirst({
    where: {
      clerkUserId: clerkUserId,
    },
  });

  if (isUserWithClerkIdExists) {
    return NextResponse.json({
      msg: "User with clerkId already exists",
      error: null,
      data: {
        userId: isUserWithClerkIdExists.id,
      },
    });
  }

  transaction = await prisma.user.create({
    data: {
      clerkUserId: clerkUserId,
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
