type IconProps = {
  className?: React.SVGProps<SVGSVGElement>["className"];
};

export function ArrowIcon(props: IconProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 12L24 20L16 28"
        stroke="currentColor"
        className={`origin-center ${props.className}`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
