import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  // Reads BACKEND_URL=http://127.0.0.1:3000 from .env.local
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:3000";

  try {
    const res = await fetch(
      `${backendUrl}/greet?name=${encodeURIComponent(name)}`,
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Backend returned an error" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to Go backend" },
      { status: 500 },
    );
  }
}
