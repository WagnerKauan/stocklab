type VariantIconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function VariantIcon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
}: VariantIconProps) {
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
      <rect x="3" y="10" width="10" height="10" rx="2" />

      <rect x="7" y="6" width="10" height="10" rx="2" />

      <rect x="11" y="3" width="10" height="10" rx="2" />
    </svg>
  );
}
