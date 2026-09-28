import { Link } from 'wouter'

interface LogoProps {
  light?: boolean
  glass?: boolean
}

export function Logo({ light = false, glass = false }: LogoProps) {
  const classes = ['logo', light ? 'logo-light' : '', glass ? 'glass-pill' : ''].filter(Boolean).join(' ')
  return (
    <Link href="/" className={classes} aria-label="فيلا هوم، الصفحة الرئيسية">
      <span className="logo-symbol" aria-hidden="true">
        <span />
      </span>
      <span className="logo-copy">
        <strong>فيلا هوم</strong>
        <small>أجهزة منزلية</small>
      </span>
    </Link>
  )
}
