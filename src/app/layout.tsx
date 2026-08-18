import BaseProvider from "@/modules/core/providers/base-provider"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "mantine-datatable/styles.css"
import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk, Poppins } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "react-toastify/ReactToastify.css"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Powers the marketing surface; exposed as a variable so the dashboard can
// stay on Poppins.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CertChain — Verifiable Certificates for Events",
  description:
    "Discover events, keep your tickets in one place, and collect tamper-proof certificates that anyone can verify in seconds.",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f4ec",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={hanken.variable}>
      <body className={`${poppins.className} antialiased`}>
        <BaseProvider>
          <div className='min-h-screen bg-gray-50 text-gray-900'>
            <NuqsAdapter>{children}</NuqsAdapter>
          </div>
        </BaseProvider>
      </body>
    </html>
  )
}
