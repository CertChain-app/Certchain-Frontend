"use client"

import { MantineProvider, type MantineColorsTuple } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AppProgressBar } from "next-nprogress-bar"
import { Suspense, type FC } from "react"
import BackendWakingBanner from "../components/backend-waking-banner"
import Toaster from "../components/toaster"

interface BaseProviderProps {
  children: React.ReactNode
}

/**
 * The teal from the CertChain design tokens, expanded into the ten shades
 * Mantine needs. Shade 6 is the `--primary` used across the marketing pages,
 * so Mantine controls and Tailwind-styled surfaces land on the same colour.
 */
const certchain: MantineColorsTuple = [
  "#eaf8f7",
  "#d4eeed",
  "#b4dfdd",
  "#90cac9",
  "#6cb3b2",
  "#459a99",
  "#047878",
  "#006968",
  "#005959",
  "#004a49",
]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      refetchOnReconnect: false,
    },
  },
})

const BaseProvider: FC<BaseProviderProps> = ({ children }) => {
  return (
    <MantineProvider
      forceColorScheme='light'
      theme={{
        defaultRadius: "md",
        colors: { certchain },
        primaryColor: "certchain",
        primaryShade: 6,
        components: {
          Button: {
            defaultProps: {
              color: "certchain",
            },
          },
          Select: {
            defaultProps: {
              nothingFoundMessage: "No options found",
            },
          },
          MultiSelect: {
            defaultProps: {
              nothingFoundMessage: "No options found",
            },
          },
        },
      }}
    >
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense>{children}</Suspense>
          <BackendWakingBanner />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
          <AppProgressBar
            height='5px'
            color='#047878'
            options={{ showSpinner: false }}
          />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default BaseProvider
