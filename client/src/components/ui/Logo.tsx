import { siteConfig } from '../../config/siteConfig';
import logoWebp from '../../assets/images/logo.webp';
import logoPng from '../../assets/images/logo.png';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 40, height = 40 }: LogoProps) {
  return (
    <a
      href="/"
      className={`
        flex items-center gap-2
        text-[var(--text-primary)]
        font-bold text-xl
        transition-opacity hover:opacity-80
        focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
        ${className}
      `}
      aria-label={siteConfig.brand}
    >
      <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <img
          src={logoPng}
          alt=""
          width={width}
          height={height}
          className="object-contain"
          aria-hidden="true"
        />
      </picture>
      <span>{siteConfig.brand}</span>
    </a>
  );
}
