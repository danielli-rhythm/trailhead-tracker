// Inline SVG icon components — no external dependency
// All icons are 16x16 by default, inherit currentColor

function Icon({ children, size = 16, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
}

export function Plus({ size, className }) {
  return <Icon size={size} className={className}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
}

export function Trash({ size, className }) {
  return <Icon size={size} className={className}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></Icon>;
}

export function Pencil({ size, className }) {
  return <Icon size={size} className={className}><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></Icon>;
}

export function Check({ size, className }) {
  return <Icon size={size} className={className}><polyline points="20 6 9 17 4 12" /></Icon>;
}

export function Clock({ size, className }) {
  return <Icon size={size} className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>;
}

export function Circle({ size, className }) {
  return <Icon size={size} className={className}><circle cx="12" cy="12" r="10" /></Icon>;
}

export function ChevronRight({ size, className }) {
  return <Icon size={size} className={className}><polyline points="9 18 15 12 9 6" /></Icon>;
}

export function Mountain({ size, className }) {
  return <Icon size={size} className={className}><path d="M8 3l4 8 5-5 5 15H2L8 3z" /></Icon>;
}

export function Inbox({ size, className }) {
  return <Icon size={size} className={className}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></Icon>;
}
