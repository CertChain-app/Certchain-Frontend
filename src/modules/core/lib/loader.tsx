export interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
  height?: number
  fit?: "fill" | "inside" | "outside" | "cover" | "contain"
  a?:
    | "center"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "focal"
    | "entropy"
    | "attention"
  blur?: number
  output?: "webp" | "jpeg" | "png" | "json" | "gif" | "tiff"
}

export function wsrvLoader({
  src,
  width,
  quality,
  height,
  fit,
  a,
  blur,
  output,
}: ImageLoaderProps) {
  const url = "//wsrv.nl"
  const params = new URLSearchParams()
  params.set("url", src)
  params.set("width", width.toString())
  params.set("quality", (quality || 75).toString())

  if (height) params.set("height", height.toString())
  if (fit) params.set("fit", fit)
  if (a) params.set("a", a)
  if (blur) params.set("blur", blur.toString())
  params.set("output", output || "webp")

  return `${url}?${params.toString()}`
}

export function asset(path: string) {
  return wsrvLoader({
    src: process.env.NEXT_PUBLIC_ASSETS_URL + "/" + path,
    width: 100,
    quality: 75,
    output: "webp",
  })
}
