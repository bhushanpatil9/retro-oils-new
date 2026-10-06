type BrandLogoProps = {
  inverse?: boolean;
  className?: string;
  title?: string;
};

/**
 * RETRO OIL logo.
 *
 * Served directly from the shared Google Drive file. The Drive "/view" page is
 * an HTML viewer, so the direct-image host below is used instead. The file must
 * stay shared as "Anyone with the link" or the image will not load for visitors.
 *
 * To change the logo later, replace LOGO_SRC with the new image URL.
 */
const LOGO_SRC = "https://lh3.googleusercontent.com/d/1e-VYgV7DpIGYjq1Pl2TH255ouanbltiw";

export default function BrandLogo({ inverse = false, className = "", title = "RETRO OIL" }: BrandLogoProps) {
  return (
    <img
      className={`brand-logo${inverse ? " brand-logo-inverse" : ""}${className ? ` ${className}` : ""}`}
      src={LOGO_SRC}
      alt={title}
      width={1536}
      height={1024}
      decoding="async"
    />
  );
}
