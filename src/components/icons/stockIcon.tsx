

type StockIconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function StockIcon({ size = 24, color = 'currentColor', strokeWidth = 2}: StockIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="2" />

      <path d="M6 17V5a2 2 0 0 0-2-2H3" />
      <line x1="6" y1="17" x2="18" y2="17" />

      <rect x="6" y="7" width="10" height="10" rx="1" />

      <line x1="6" y1="12" x2="16" y2="12" />
      <line x1="11" y1="7" x2="11" y2="12" />
    </svg>
  );
}
