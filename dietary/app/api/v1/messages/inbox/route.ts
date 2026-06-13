import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ status: "success", data: { id: `msg_${Date.now()}`, senderId: "user_001", ...body, createdAt: new Date().toISOString() } }, { status: 201 });
}
export async function GET() {
  return NextResponse.json({ status: "success", data: [{ id: "msg_001", sender: { name: "Mike H.", avatarUrl: "https://i.pravatar.cc/80?u=mike" }, content: "Have you tried the new GF bakery?", isRead: false, createdAt: "2024-10-20T10:30:00Z" }] });
}
