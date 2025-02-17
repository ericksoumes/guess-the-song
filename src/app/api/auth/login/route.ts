import { NextResponse } from "next/server";

export async function GET() {
  const scope =
    "user-read-private playlist-read-private playlist-read-collaborative";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    process.env.SPOTIFY_REDIRECT_URI!
  )}`;

  return NextResponse.redirect(authUrl);
}
