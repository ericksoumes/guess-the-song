import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      { error: "Não foi possível obter o código de autenticação" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI!);
  params.append("client_id", process.env.SPOTIFY_CLIENT_ID!);
  params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET!);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json(
      { error: data.error_description },
      { status: 400 }
    );
  }

  const responseRedirect = NextResponse.redirect(new URL("/home", req.url));
  responseRedirect.cookies.set("spotify_token", data.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: data.expires_in,
  });

  return responseRedirect;
}
