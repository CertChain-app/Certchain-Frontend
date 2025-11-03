"use client"

import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AppProgressBar } from "next-nprogress-bar"
import { Suspense, type FC } from "react"
import Toaster from "../components/toaster"

interface BaseProviderProps {
  children: React.ReactNode
}

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
        primaryColor: "indigo",
        components: {
          Button: {
            defaultProps: {
              color: "indigo",
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
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
          <AppProgressBar
            height='5px'
            color='#4C6EF5'
            options={{ showSpinner: false }}
          />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default BaseProvider
