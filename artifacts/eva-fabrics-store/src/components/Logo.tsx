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
        <svg viewBox="0 0 34 34" width="32" height="32" fill="none">
          <rect width="34" height="34" rx="9" fill="#16233f" />
          <path d="M7.5 16.2 17 8.4l9.5 7.8v9.6a1.6 1.6 0 0 1-1.6 1.6H9.1a1.6 1.6 0 0 1-1.6-1.6v-9.6Z" fill="#e0357f" />
          <rect x="14.7" y="20.4" width="4.6" height="7" rx="1.2" fill="#ffffff" />
        </svg>
      </span>
      <span className="logo-copy">
        <strong>فيلا هوم</strong>
        <small>أجهزة منزلية</small>
      </span>
    </Link>
  )
}
