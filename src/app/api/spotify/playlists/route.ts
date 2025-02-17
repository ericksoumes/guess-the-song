import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_token")?.value;
  console.log(token);

  if (!token) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  console.log(data);
  return NextResponse.json(data);
}
