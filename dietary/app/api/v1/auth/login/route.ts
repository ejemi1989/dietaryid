import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { id: "user_001", email: body.email, name: "Sarah Mitchell", token: "jwt_mock_token", expiresIn: 86400 } });
}
