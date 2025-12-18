import { NextRequest, NextResponse } from "next/server"
import { getOrganizerByDomain } from "./modules/organizer/queries/get-organizer-by-domain"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Get hostname of request
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3001", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  // Special handling for root domain and localhost
  if (
    hostname === "localhost:3001" ||
    hostname === "certchain.co" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.next()
  }

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`

  // Check if already rewritten
  if (url.pathname.startsWith(`/${hostname}`)) {
    return NextResponse.next()
  }

  // Extract subdomain
  const subdomain = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  )

  if (!subdomain) {
    return NextResponse.next()
  }

  const organizer = await getOrganizerByDomain(hostname)

  console.log("organizer", organizer)

  if (organizer?.statusCode == 404) {
    return NextResponse.error()
  }

  const rewriteUrl = new URL(`/internal/${hostname}${path}`, req.url)

  // Add cache-control header to prevent caching
  const response = NextResponse.rewrite(rewriteUrl)
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  )
  response.headers.set("Pragma", "no-cache")
  response.headers.set("Expires", "0")

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  )

  return response
}
