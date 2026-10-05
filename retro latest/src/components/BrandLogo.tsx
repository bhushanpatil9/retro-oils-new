import { useState } from "react";

type BrandLogoProps = {
  inverse?: boolean;
  className?: string;
  title?: string;
};

/**
 * RETRO OIL lockup.
 *
 * Renders the real brand artwork from `public/images/retro-oil-logo.png`.
 * Drop the supplied logo file at that exact path (PNG with a transparent
 * background, or swap the extension to .svg and update LOGO_SRC below).
 *
 * If the file is missing, a vector stand-in renders instead so the header
 * never breaks. Replace the file and the real artwork appears automatically.
 */
const LOGO_SRC = "/images/retro-oil-logo.png";

export default function BrandLogo({ inverse = false, className = "", title = "RETRO OIL" }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        className={`brand-logo${inverse ? " brand-logo-inverse" : ""}${className ? ` ${className}` : ""}`}
        src={LOGO_SRC}
        alt={title}
        width={980}
        height={560}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  const dark = inverse ? "#FFFFFF" : "#17202A";
  const amber = "#F2A007";

  return (
    <svg
      className={`brand-logo${className ? ` ${className}` : ""}`}
      viewBox="0 0 980 560"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <g fill={dark}>
        <path d="M18 60h232c52 0 86 30 86 74 0 34-20 59-54 69l74 117H249L188 207h-62l-44 113H0L63 160h157c14 0 23-8 23-20s-9-20-23-20H38Z" />
        <path d="M368 60h248l-34 60H446v26h150l-32 56H446v58h172l-34 60H368Z" />
        <path d="M630 60h266v60h-96v200h-78V120h-92Z" />
        <path d="M906 60h232c52 0 86 30 86 74 0 34-20 59-54 69l74 117h-107l-61-113h-92v113h-78Z" />
        <path d="M976 60h118c60 0 100 40 100 100v60c0 60-40 100-100 100H976c-60 0-100-40-100-100v-60c0-60 40-100 100-100Zm16 60c-24 0-38 14-38 38v44c0 24 14 38 38 38h86c24 0 38-14 38-38v-44c0-24-14-38-38-38Z" />
      </g>
      <g transform="translate(300 290)">
        <path
          fill={amber}
          fillRule="evenodd"
          d="M134 0C208 0 268 60 268 134S208 268 134 268 0 208 0 134 60 0 134 0Zm0 64c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70Z"
        />
        <path fill="#FFFFFF" d="M134 26c-44 58-66 88-66 118a66 66 0 0 0 132 0c0-30-22-60-66-118Z" />
        <path fill="none" stroke={amber} strokeWidth="9" strokeLinecap="round" d="M112 80c-30 40-40 60-40 78a42 42 0 0 0 28 39" />
        <rect x="300" y="86" width="74" height="182" rx="14" fill={amber} />
        <path
          fill={amber}
          d="M408 14h60a14 14 0 0 1 14 14v174h186a14 14 0 0 1 14 14v38a14 14 0 0 1-14 14H408a14 14 0 0 1-14-14V28a14 14 0 0 1 14-14Z"
        />
      </g>
    </svg>
  );
}
