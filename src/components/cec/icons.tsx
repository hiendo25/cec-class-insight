type P = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconHome = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
  </svg>
);
export const IconBook = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5z" />
    <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H19v3H5.5A1.5 1.5 0 0 1 4 19.5z" />
  </svg>
);
export const IconTask = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M8 4h8a1 1 0 0 1 1 1v1h2v14H5V6h2V5a1 1 0 0 1 1-1z" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);
export const IconChart = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20h16M8 20v-6M12 20V7M16 20v-9" />
  </svg>
);
export const IconGear = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2M12 19v2M4.2 7.5l1.7 1M18.1 15.5l1.7 1M4.2 16.5l1.7-1M18.1 8.5l1.7-1" />
  </svg>
);
export const IconChevronDown = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const IconChevronLeft = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m14 6-6 6 6 6" />
  </svg>
);
export const IconChevronRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m10 6 6 6-6 6" />
  </svg>
);
export const IconWarn = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4.5 21 19.5H3z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);
export const IconCheck = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
export const IconSearch = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);
export const IconColumns = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M10 4v16M15 4v16" />
  </svg>
);
export const IconTray = ({ size = 44, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={1.4}>
    <path d="M4 13h4l1.5 3h5L16 13h4" />
    <path d="M4 13 6.5 5h11L20 13v6H4z" />
  </svg>
);
export const IconRefresh = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6" />
    <path d="M20 4v5h-5" />
  </svg>
);
export const IconX = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconDots = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="5" cy="12" r="1.2" fill="currentColor" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <circle cx="19" cy="12" r="1.2" fill="currentColor" />
  </svg>
);