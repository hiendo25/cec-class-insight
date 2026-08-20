/**
 * Logo CEC — dựng lại theo bản gốc:
 * chữ CEC trắng · cánh diều đỏ dạng ô vuông tan dần · dòng SINCE 2009 kèm 2 vạch ngang.
 * Dùng currentColor cho phần chữ để đổi màu theo nền.
 */
export function Logo({ width = 132 }: { width?: number }) {
  const h = Math.round((width * 96) / 132);
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 132 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CEC — since 2009"
    >
      <defs>
        <linearGradient id="cecFlag" x1="82" y1="8" x2="118" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ED2024" />
          <stop offset="1" stopColor="#E8232A" />
        </linearGradient>
        <linearGradient id="cecDots" x1="82" y1="14" x2="96" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ED2024" />
          <stop offset="1" stopColor="#F4681F" />
        </linearGradient>
      </defs>

      {/* cánh diều */}
      <path
        d="M98.5 41.5C104 30 112 19.5 122.5 6.5c-3 14-8 26-14 35H98.5z"
        fill="url(#cecFlag)"
      />
      <path d="M97.6 15.8h1.2v25.7h-1.2z" fill="#fff" opacity=".85" />

      {/* ô vuông tan dần */}
      <g fill="url(#cecDots)">
        <rect x="82" y="15" width="7.4" height="7.4" rx="1" />
        <rect x="90.4" y="15" width="7.4" height="7.4" rx="1" />
        <rect x="84.4" y="23.4" width="6.6" height="6.6" rx="1" />
        <rect x="92" y="23.4" width="6.6" height="6.6" rx="1" />
        <rect x="87" y="31" width="5.4" height="5.4" rx="1" />
        <rect x="93.6" y="31" width="5.4" height="5.4" rx="1" />
        <rect x="89.6" y="37.4" width="4.2" height="4.2" rx=".8" />
        <rect x="94.8" y="37.4" width="4.2" height="4.2" rx=".8" />
        <rect x="92.4" y="42.6" width="3" height="3" rx=".6" />
        <rect x="96" y="42.6" width="3" height="3" rx=".6" />
        <rect x="95" y="47" width="2.2" height="2.2" rx=".5" />
      </g>

      {/* chữ CEC */}
      <text
        x="4"
        y="76"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontSize="52"
        fontWeight="700"
        letterSpacing="-1"
        fill="currentColor"
      >
        CEC
      </text>

      {/* SINCE 2009 + 2 vạch ngang */}
      <g fill="currentColor" opacity=".82">
        <rect x="6" y="87" width="24" height="1" />
        <text
          x="34"
          y="90.5"
          fontFamily="'Segoe UI', system-ui, sans-serif"
          fontSize="8"
          letterSpacing="1.6"
        >
          SINCE 2009
        </text>
        <rect x="94" y="87" width="24" height="1" />
      </g>
    </svg>
  );
}
