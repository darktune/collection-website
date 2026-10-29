import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Abraham Collection";
    const subtitle =
      searchParams.get("subtitle") ||
      "Ceremonial Agbada, Bespoke Tailoring & Nigerian Heritage Craft";
    const category = searchParams.get("category") || "Bespoke Atelier • Est. 2002";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0B0908",
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(242, 193, 78, 0.12) 0%, transparent 60%)",
            padding: "60px 80px",
            border: "2px solid #2B231A",
            fontFamily: "serif",
          }}
        >
          {/* Top Brand Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid rgba(242, 193, 78, 0.25)",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: "0.35em",
                  color: "#F2C14E",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                ABRAHAM COLLECTION
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: "#A61C32",
                  textTransform: "uppercase",
                  marginTop: 4,
                  fontFamily: "monospace",
                }}
              >
                24 Years of Precision Craft • Est. 2002
              </span>
            </div>

            <div
              style={{
                padding: "6px 16px",
                border: "1px solid #F2C14E",
                backgroundColor: "rgba(242, 193, 78, 0.1)",
                color: "#F2C14E",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              {category}
            </div>
          </div>

          {/* Central Title Display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: 960,
              margin: "auto",
            }}
          >
            <h1
              style={{
                fontSize: 54,
                fontWeight: 400,
                color: "#FCFAF7",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#C2B8A8",
                letterSpacing: "0.06em",
                lineHeight: 1.5,
                marginTop: 20,
                maxWidth: 820,
                fontWeight: 300,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Heritage Seal Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid #2B231A",
              paddingTop: "24px",
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              color: "#8F8372",
            }}
          >
            <span>Lagos Atelier Flagship</span>
            <span style={{ color: "#F2C14E" }}>Bolaji Abayomi Abraham</span>
            <span>Diaspora Concierge (UK • US • CA)</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OpenGraph image: ${e.message}`, {
      status: 500,
    });
  }
}
