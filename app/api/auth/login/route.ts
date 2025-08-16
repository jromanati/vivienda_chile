// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const { NEXT_PUBLIC_FASTAPI_USER, NEXT_PUBLIC_FASTAPI_PASSWORD } = process.env;
  const body = new URLSearchParams({
    username: NEXT_PUBLIC_FASTAPI_USER!,
    password: NEXT_PUBLIC_FASTAPI_PASSWORD!,
  });

  const apiRes = await fetch("http://127.0.0.1:8000/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!apiRes.ok) {
    const err = await apiRes.json().catch(() => ({}));
    return NextResponse.json(err, { status: apiRes.status });
  }

  const data = await apiRes.json();
  return NextResponse.json(data);
}