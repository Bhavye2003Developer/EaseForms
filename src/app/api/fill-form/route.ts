import { FormType } from "@/utils/types";
import { NextRequest } from "next/server";

let form: FormType | null = null;

export async function POST(req: NextRequest) {
  const data = await req.json();
  form = data;
  console.log("Request accepted: ", form);
  return Response.json({
    message: "Got form answers.",
    status: 200,
  });
}
