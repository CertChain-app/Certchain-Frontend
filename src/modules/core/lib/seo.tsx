import { IOrganizer } from "@/modules/types"
import merge from "lodash.merge"
import type { Metadata } from "next"

type MetadataGenerator = Omit<Metadata, "description" | "title"> & {
  title: Metadata["title"]
  description: string
  image?: string
}

const applicationName = "CertChain"

const publisher = "CertChain"
const twitterHandle = "@certchain"

export const createOrganizerMetadata = ({
  organizer,
}: {
  organizer: IOrganizer
}) => {
  const parsedTitle = `${organizer.name}`
  return {
    title: {
      template: `%s | ${organizer.name}`,
    },
    description: `${organizer.name}`,
    applicationName,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description: `${organizer.name}`,
      type: "website",
      siteName: applicationName,
      locale: "en_US",
    },
    publisher,
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
    },
  }
}

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: "website",
      siteName: applicationName,
      locale: "en_US",
    },
    publisher,
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
    },
  }

  const metadata: Metadata = merge(defaultMetadata, properties)

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title?.toString(),
      },
    ]
  }

  return metadata
}
