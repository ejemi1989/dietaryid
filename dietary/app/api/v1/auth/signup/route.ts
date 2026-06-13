import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { id: `user_${Date.now()}`, email: body.email, name: body.name, token: "jwt_mock_token", message: "Verification email sent" } }, { status: 201 });
}
