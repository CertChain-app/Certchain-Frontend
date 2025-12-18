/** @jsxImportSource react */
import { ImageResponse } from "@vercel/og"
import { NextResponse } from "next/server"

export const runtime = "edge"

interface CertificateData {
  id: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
  }
  event: {
    title: string
    startDate: string
    endDate: string
    organizer: {
      name: string
      logo?: string
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/certificates/${id}`
    )
    const data = (await res.json()) as { data: CertificateData }
    const certificate = data?.data

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span
                style={{ fontSize: 32, fontWeight: "bold", color: "#111827" }}
              >
                cert
              </span>
              <span
                style={{ fontSize: 32, fontWeight: "bold", color: "#4F46E5" }}
              >
                chain
              </span>
            </div>
            {certificate.event?.organizer?.logo && (
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${certificate.event.organizer.logo}`}
                alt={certificate.event.organizer.name}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>

          {/* Purple Banner */}
          <div
            style={{
              backgroundColor: "#4F46E5",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: 40,
                textAlign: "center",
                margin: 0,
                fontWeight: "normal",
              }}
            >
              Certificate of Achievement
            </h1>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 40px",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <p style={{ fontSize: 24, color: "#4B5563", margin: 0 }}>
                This is to certify that
              </p>

              <h2
                style={{
                  fontSize: 48,
                  color: "#111827",
                  margin: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {certificate.user?.firstName} {certificate.user?.lastName}
              </h2>

              <p style={{ fontSize: 24, color: "#4B5563", margin: 0 }}>
                has successfully completed
              </p>

              <h3
                style={{
                  fontSize: 36,
                  color: "#111827",
                  margin: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {certificate.event?.title}
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "80px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                  Issued Date
                </p>
                <p style={{ fontSize: 16, color: "#111827", margin: 0 }}>
                  {new Date(certificate.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                Issued By
              </p>
              <p style={{ fontSize: 16, color: "#111827", margin: 0 }}>
                {certificate.event?.organizer?.name}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                Certificate ID
              </p>
              <p style={{ fontSize: 16, color: "#111827", margin: 0 }}>
                {certificate.id}
              </p>
            </div>
          </div>

          {/* Verification */}
          <div
            style={{
              backgroundColor: "#F9FAFB",
              padding: "12px",
              display: "flex",
              justifyContent: "center",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
              Verified by CertChain • https://certchain.co
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error("Error generating certificate:", error)
    return new NextResponse("Error generating certificate", { status: 500 })
  }
}
