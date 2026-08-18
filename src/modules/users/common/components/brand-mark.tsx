import { cn } from "@/modules/core/lib/utils"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"

interface BrandMarkProps {
  className?: string
  /** Header uses the larger display size; the footer sits a notch smaller. */
  size?: "default" | "sm"
}

export const BrandMark: FC<BrandMarkProps> = ({
  className,
  size = "default",
}) => (
  <Link href='/' className={cn("flex items-center gap-2", className)}>
    <span className='flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground'>
      <ShieldCheck className='size-4' />
    </span>
    <span
      className={cn(
        "font-serif font-semibold tracking-tight text-foreground",
        size === "default" ? "text-lg" : "text-base"
      )}
    >
      Cert<span className='text-primary'>Chain</span>
    </span>
  </Link>
)
