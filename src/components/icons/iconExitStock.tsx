type IconExitStickProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function IconExitStock({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
}: IconExitStickProps) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />

      <path d="M12 17V3" />
      <path d="M8 7l4-4 4 4" />
    </svg>
  );
}
