import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  // Attendees and organizers share one sign-in and one signup page. These two
  // routes had their own pages; keep the URLs working with a real redirect
  // rather than a rendered page, so there is no flash before the move.
  redirects: async () => [
    {
      source: "/organizers/auth/login",
      destination: "/auth/login?as=organizer",
      permanent: false,
    },
    {
      source: "/organizers/auth/register",
      destination: "/auth/register?as=organizer",
      permanent: false,
    },
  ],

  rewrites: async () => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ??
      process.env.NEXT_PUBLIC_BASE_URL ??
      ""

    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/:path*`,
      },
    ]
  },
}

export default nextConfig
