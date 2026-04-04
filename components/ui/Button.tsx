import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'accent' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-navy text-white border-2 border-navy',
    'liquid-fill liquid-fill-white',
    'hover:text-navy',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy',
  ),
  accent: cn(
    'bg-medical-red text-white border-2 border-medical-red',
    'liquid-fill liquid-fill-white',
    'hover:text-medical-red',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-red',
  ),
  ghost: cn(
    'bg-transparent text-navy border-2 border-navy',
    'liquid-fill liquid-fill-navy',
    'hover:text-white',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy',
  ),
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className, ...rest } = props

    const classes = cn(
      'inline-flex items-center justify-center font-semibold rounded-lg',
      'transition-colors duration-300',
      'disabled:opacity-50 disabled:pointer-events-none',
      sizeClasses[size],
      variantClasses[variant],
      className,
    )

    if ('href' in rest && rest.href !== undefined) {
      const { href, ...anchorProps } = rest as ButtonAsAnchor
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        />
      )
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={classes}
        {...buttonProps}
      />
    )
  },
)
