import { ImageLoaderProps, wsrvLoader } from "@/modules/core/lib/loader"
import { Image, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import NextImage from "next/image"
import type { FC } from "react"
import { cn } from "../lib/utils"

export interface OImageProps extends Omit<ImageLoaderProps, "src"> {
  src?: string
  alt: string
  className?: string
  notCld?: boolean
  notModal?: boolean
}

const OImage: FC<OImageProps> = ({
  src,
  width,
  height,
  alt,
  fit,
  a,
  blur,
  output,
  className,
  notCld,
  notModal,
}) => {
  const url = src
    ? notCld
      ? src
      : process.env.NEXT_PUBLIC_ASSETS_URL + "/" + src
    : ""
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <div className={cn(className)}>
        <Image
          component={NextImage}
          src={url}
          width={width}
          fallbackSrc={process.env.NEXT_PUBLIC_BASE_URL + "/dummy.svg"}
          alt={alt}
          onClick={open}
          className={cn("w-full h-full object-contain rounded-md", className)}
          height={height}
          loader={({ src, width, quality }) => {
            if (!url) return "/logo.png"
            return wsrvLoader({
              src,
              width,
              quality,
              height,
              fit,
              a,
              blur,
              output,
            })
          }}
          objectFit={fit}
          objectPosition={a}
        ></Image>
      </div>
      {!notModal && (
        <Modal
          classNames={{
            content: "!bg-transparent !shadow-none",
            header: "!bg-transparent text-white",
            body: "!bg-transparent",
          }}
          size='xl'
          opened={opened && !notModal}
          onClose={close}
          title='Image'
        >
          <Image
            src={url}
            alt={alt}
            width={1200}
            height={720}
            className='w-full h-full'
          />
        </Modal>
      )}
    </>
  )
}

export default OImage
