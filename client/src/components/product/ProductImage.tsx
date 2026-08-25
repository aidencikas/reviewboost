import { useState, type ImgHTMLAttributes } from 'react';

import brightWebp from '../../assets/images/product-bright.webp';
import brightPng from '../../assets/images/product-bright.png';
import darkWebp from '../../assets/images/product-dark.webp';
import darkPng from '../../assets/images/product-dark.png';
import secondaryWebp from '../../assets/images/product-secondary.webp';
import secondaryPng from '../../assets/images/product-secondary.png';
import duoBrightWebp from '../../assets/images/product-duo-bright.webp';
import duoBrightPng from '../../assets/images/product-duo-bright.png';
import duoDarkWebp from '../../assets/images/product-duo-dark.webp';
import duoDarkPng from '../../assets/images/product-duo-dark.png';

interface ProductImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  variant?: 'bright' | 'dark' | 'secondary' | 'duo-bright' | 'duo-dark';
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

const imageSources = {
  bright: { webp: brightWebp, png: brightPng },
  dark: { webp: darkWebp, png: darkPng },
  secondary: { webp: secondaryWebp, png: secondaryPng },
  'duo-bright': { webp: duoBrightWebp, png: duoBrightPng },
  'duo-dark': { webp: duoDarkWebp, png: duoDarkPng },
};

export function ProductImage({
  variant = 'bright',
  fallbackSrc,
  alt,
  className = '',
  loading = 'lazy',
  ...props
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  const sources = imageSources[variant];
  const src = hasError && fallbackSrc ? fallbackSrc : sources.png;

  return (
    <picture>
      {!hasError && (
        <source srcSet={sources.webp} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-auto
          object-contain
          ${className}
        `}
        loading={loading}
        onError={() => {
          if (!hasError && fallbackSrc) {
            setHasError(true);
          }
        }}
        {...props}
      />
    </picture>
  );
}
