import { NextRequest, NextResponse } from "next/server"
import { getOrganizerByDomain } from "./modules/organizer/queries/get-organizer-by-domain"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN

  // Get hostname of request
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3001", rootDomain ? `.${rootDomain}` : "")

  // Special handling for root domain and localhost
  if (
    hostname === "localhost:3001" ||
    hostname === "certchain.co" ||
    (rootDomain && hostname === rootDomain) ||
    hostname.endsWith(".vercel.app") ||
    !rootDomain
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
  const subdomain = hostname.replace(`.${rootDomain}`, "")

  if (!subdomain) {
    return NextResponse.next()
  }

  let organizer: Awaited<ReturnType<typeof getOrganizerByDomain>> | null = null
  try {
    organizer = await getOrganizerByDomain(hostname)
  } catch (error) {
    console.error("Error resolving organizer domain:", error)
    return NextResponse.next()
  }

  console.log("organizer", organizer)

  if (organizer?.statusCode == 404) {
    return NextResponse.redirect(new URL("/404", req.url))
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
