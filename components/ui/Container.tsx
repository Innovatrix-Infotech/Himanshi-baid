import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({ size = 'default', className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8',
        size === 'default' && 'max-w-7xl',
        size === 'narrow' && 'max-w-4xl',
        size === 'wide' && 'max-w-screen-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
