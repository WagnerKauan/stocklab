type IconMovementsProps = {
  size?: number;
  color?: string
  strokeWidth?: number;
  className?: string;
}

export function IconMovements({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
}: IconMovementsProps) {
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
      className={className}
    >
      <path d="M7 11L3 7l4-4" />
      <path d="M3 7h11a4 4 0 0 1 4 4v10" />

      <path d="M17 13l4 4-4 4" />
      <path d="M21 17H10a4 4 0 0 1-4-4V3" />
    </svg>
  );
}
