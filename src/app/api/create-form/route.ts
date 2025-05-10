import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Request accepted: ", data);
  return Response.json({
    message: "Form created successfully",
    status: 200,
  });
}
