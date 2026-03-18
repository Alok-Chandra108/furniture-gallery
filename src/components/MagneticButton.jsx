import '../styles/magnetic-btn.css'

export default function MagneticButton({
  label,
  onClick,
  variant = 'dark',   // 'light' | 'dark' | 'accent'
  className = '',
  showArrow = true,
}) {
  return (
    <button
      className={`magnetic-btn magnetic-btn--${variant} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="btn-fill" aria-hidden="true" />
      
      <span className="btn-text-wrapper">
        <span className="btn-text">
          {label}
          {showArrow && <span className="btn-arrow" aria-hidden="true">→</span>}
        </span>
        <span className="btn-text-hover" aria-hidden="true">
          {label}
          {showArrow && <span className="btn-arrow" aria-hidden="true">→</span>}
        </span>
      </span>
    </button>
  )
}
