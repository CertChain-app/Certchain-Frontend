import type { FC } from "react"

interface AuthDividerProps {
  label?: string
}

export const AuthDivider: FC<AuthDividerProps> = ({ label = "or" }) => (
  <div className='my-6 flex items-center gap-3'>
    <span className='h-px flex-1 bg-border' />
    <span className='font-mono text-[11px] uppercase tracking-widest text-muted-foreground'>
      {label}
    </span>
    <span className='h-px flex-1 bg-border' />
  </div>
)
