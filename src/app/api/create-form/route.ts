import { FormType } from "@/utils/types";
import { NextRequest } from "next/server";

let form: FormType | null = null;

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Request accepted: ", data);
  form = data;
  return Response.json({
    message: "Form created successfully",
    status: 200,
  });
}

export function GET() {
  return Response.json({
    data: form,
    status: 200,
  });
}
