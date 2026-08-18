import { cn } from "@/modules/core/lib/utils"
import Link, { type LinkProps } from "next/link"
import type { ButtonHTMLAttributes, FC, ReactNode } from "react"

export type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
export type ButtonSize = "sm" | "default" | "lg" | "icon"

const base =
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border-border bg-background hover:bg-muted hover:text-foreground",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-muted hover:text-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizes: Record<ButtonSize, string> = {
  sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
  default: "h-8 gap-1.5 px-2.5",
  lg: "h-9 gap-1.5 px-3",
  icon: "size-8",
}

export const buttonClasses = ({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) => cn(base, variants[variant], sizes[size], className)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * The marketing-surface button. Deliberately separate from Mantine's `Button`:
 * these pages are driven by the design tokens in `globals.css`, not by the
 * Mantine theme the dashboard uses.
 */
export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={buttonClasses({ variant, size, className })}
    {...props}
  />
)

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: ReactNode
  "aria-label"?: string
}

/** Same styling, rendered as a Next link — for CTAs that navigate. */
export const ButtonLink: FC<ButtonLinkProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => (
  <Link className={buttonClasses({ variant, size, className })} {...props}>
    {children}
  </Link>
)
