import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      referenceCode,
      clientName,
      email,
      phone,
      location,
      occasion,
      silhouette,
      consultationType,
      dateNeeded,
      garmentCount,
      selectedFabric,
      notes,
    } = body;

    const resendApiKey = process.env.RESEND_API_KEY;
    const studioEmail = "abrahamtoluwani999@gmail.com";

    // Format human-readable occasion & silhouette
    const formatLabel = (val: string) =>
      val
        ? val
            .split("_")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ")
        : "Bespoke";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Abraham Collection &bull; Commission Inscription</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0908; color: #FCFAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0B0908; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #151210; border: 1px solid #33281E; border-top: 3px solid #F2C14E; padding: 36px 32px; text-align: left;">
          
          <!-- Header / Brand Masthead -->
          <tr>
            <td style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid rgba(242, 193, 78, 0.2);">
              <p style="margin: 0 0 6px 0; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #F2C14E;">
                Bespoke Atelier &bull; Est. 2002 &bull; Lagos
              </p>
              <h1 style="margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 0.12em; color: #FCFAF7; text-transform: uppercase;">
                Abraham Collection
              </h1>
            </td>
          </tr>

          <!-- Inscription Status -->
          <tr>
            <td style="padding: 28px 0 20px 0; text-align: center;">
              <span style="display: inline-block; padding: 6px 14px; background-color: rgba(242, 193, 78, 0.12); border: 1px solid #F2C14E; color: #F2C14E; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: monospace;">
                REFERENCE CODE: ${referenceCode}
              </span>
              <h2 style="margin: 20px 0 8px 0; font-size: 20px; font-weight: 400; letter-spacing: 0.05em; color: #FCFAF7;">
                Commission Inscription Confirmed
              </h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #C2B8A8;">
                Esteemed ${clientName || "Patron"}, your bespoke commission has been entered into the master studio ledger.
              </p>
            </td>
          </tr>

          <!-- Commission Specifications Table -->
          <tr>
            <td style="padding: 16px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="10" style="border-collapse: collapse; background-color: #0D0B0A; border: 1px solid #2B231A;">
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td width="40%" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Patron Name</td>
                  <td width="60%" style="font-size: 13px; color: #FCFAF7; font-weight: 500;">${clientName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Silhouette</td>
                  <td style="font-size: 13px; color: #F2C14E; font-weight: 500;">${formatLabel(silhouette)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Heritage Fabric Swatch</td>
                  <td style="font-size: 13px; color: #FCFAF7; font-weight: 500;">${selectedFabric || "Atelier Curated"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Occasion Family</td>
                  <td style="font-size: 13px; color: #FCFAF7;">${formatLabel(occasion)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Consultation Preference</td>
                  <td style="font-size: 13px; color: #FCFAF7;">${consultationType === "remote" ? "Diaspora Live Video Concierge" : "In-Studio Fitting (Lagos Atelier)"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Event Date & Location</td>
                  <td style="font-size: 13px; color: #FCFAF7;">${dateNeeded || "To Be Scheduled"} &bull; ${location || "Lagos, Nigeria"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2B231A;">
                  <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Garments</td>
                  <td style="font-size: 13px; color: #FCFAF7;">${garmentCount || "1"} piece(s)</td>
                </tr>
                ${
                  notes
                    ? `<tr>
                        <td style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: #8F8372;">Directives & Notes</td>
                        <td style="font-size: 12px; color: #C2B8A8; font-style: italic;">${notes}</td>
                      </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Next Steps & Direct WhatsApp Link -->
          <tr>
            <td style="padding: 24px 0 16px 0; border-top: 1px solid rgba(242, 193, 78, 0.2);">
              <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.22em; color: #F2C14E;">
                Next Steps in the Tailoring Process
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #C2B8A8;">
                Our Master Cutter, <strong>Bolaji Abayomi Abraham</strong>, will personally review your silhouette requirements and confirm cloth allocation. For immediate calendar reservation:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20have%20submitted%20commission%20ref%3A%20${encodeURIComponent(
                  referenceCode
                )}" style="display: inline-block; background-color: #A61C32; color: #FCFAF7; padding: 12px 24px; text-decoration: none; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; font-weight: 600;">
                  Confirm with WhatsApp Concierge &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Atelier Footer -->
          <tr>
            <td style="padding-top: 20px; border-top: 1px solid #2B231A; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #8F8372;">
                Abraham Collection &bull; 24 Years of Precision Craft
              </p>
              <p style="margin: 0; font-size: 10px; color: #665D52; font-family: monospace;">
                Lagos Atelier Flagship &bull; London &bull; Houston &bull; Toronto
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // If Resend API Key is configured in environment
    if (resendApiKey) {
      const recipients = [email, studioEmail].filter(Boolean);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Abraham Collection Concierge <onboarding@resend.dev>",
          to: recipients,
          subject: `Commission Inscription [${referenceCode}] — Abraham Collection`,
          html: htmlContent,
        }),
      });

      const responseData = await res.json();
      return NextResponse.json({
        success: true,
        dispatched: true,
        referenceCode,
        data: responseData,
      });
    }

    // Graceful offline / simulated dispatch when RESEND_API_KEY is not set
    console.info(
      `[Commission Inscription Email Simulated] Reference: ${referenceCode} | Client: ${clientName} (${email}) | Fabric: ${selectedFabric}`
    );

    return NextResponse.json({
      success: true,
      dispatched: false,
      simulated: true,
      referenceCode,
      message: "Commission recorded. Transactional email simulated (configure RESEND_API_KEY for live delivery).",
    });
  } catch (error: any) {
    console.error("Error in /api/commissions/notify:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
