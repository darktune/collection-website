import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, passkey } = body;

    if (!identifier || !passkey) {
      return NextResponse.json(
        { success: false, message: "Both identifier and passkey are required." },
        { status: 400 }
      );
    }

    // Configured admin credentials from environment or master cutter keys
    const envUser = process.env.ADMIN_USER || "abraham";
    const envPass = process.env.ADMIN_PASSWORD || "Vault2026!";

    const validIdentifiers = [
      envUser.toLowerCase(),
      "abraham",
      "infoac0001@gmail.com",
      "bolaji",
      "admin",
      "0001",
    ];

    const isUserValid = validIdentifiers.includes(identifier.trim().toLowerCase());
    const isPassValid = passkey === envPass || passkey === "Vault2026!" || passkey === "abraham2002" || passkey === "abraham1999";

    if (isUserValid && isPassValid) {
      // 8-hour atelier session token
      const sessionExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
      
      const response = NextResponse.json(
        {
          success: true,
          token: "authenticated_bolaji_2026",
          expiresAt: sessionExpiry,
          tailor: "Bolaji Abayomi Abraham",
          lineage: "Est. 2002 • Master Cutter",
        },
        { status: 200 }
      );


      // Secure HTTP-only session header advice
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials. Master Tailor Passkey verification failed.",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal authentication error." },
      { status: 500 }
    );
  }
}
