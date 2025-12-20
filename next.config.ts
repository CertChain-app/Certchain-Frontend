import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
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
