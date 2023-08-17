import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  const token = await getToken({ req, secret, raw: true });

  return NextResponse.json({ token }, { status: 200 });
}
