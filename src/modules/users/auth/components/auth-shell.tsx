import { cn } from "@/modules/core/lib/utils"
import type { FC, ReactNode } from "react"

interface AuthShellProps {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  /** Organizer signup needs more room for its two-column form. */
  wide?: boolean
  footer?: ReactNode
}

/**
 * The shared frame for every account page, matching the marketing surface:
 * paper background, engraved card, and the same eyebrow/serif heading pairing
 * used across the landing sections.
 */
export const AuthShell: FC<AuthShellProps> = ({
  eyebrow,
  title,
  description,
  children,
  wide = false,
  footer,
}) => {
  return (
    <section className='relative overflow-hidden'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, color-mix(in oklch, oklch(var(--accent)) 22%, transparent), transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative mx-auto px-4 py-14 sm:px-6 md:py-20",
          wide ? "max-w-3xl" : "max-w-md"
        )}
      >
        <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_28px_50px_-32px_rgba(30,50,90,0.35)]'>
          <div className='border-b border-border bg-secondary/50 px-6 py-5 sm:px-8'>
            <p className='font-mono text-xs uppercase tracking-widest text-primary'>
              {eyebrow}
            </p>
            <h1 className='mt-1.5 text-balance font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl'>
              {title}
            </h1>
            <p className='mt-2 text-pretty text-sm leading-relaxed text-muted-foreground'>
              {description}
            </p>
          </div>

          <div className='px-6 py-6 sm:px-8 sm:py-8'>{children}</div>
        </div>

        {footer && (
          <div className='mt-5 text-center text-xs text-muted-foreground'>
            {footer}
          </div>
        )}
      </div>
    </section>
  )
}
