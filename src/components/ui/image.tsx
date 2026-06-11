import { forwardRef, useEffect, useState, type CSSProperties, type ImgHTMLAttributes } from 'react'
import './image.css'
import { cn } from '@/lib/utils';

const STATIC_MEDIA_URL = 'https://static.wixstatic.com/media/';
const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

type WixImageDataProps = {
  fittingType?: 'fill' | 'fit';
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & WixImageDataProps;

type ResolvedImage = {
  url: string;
  width?: number;
  height?: number;
};

/**
 * Resolve a CMS image reference to a plain CDN URL + (optional) intrinsic size.
 * Handles the two shapes that appear in the frozen CMS data plus pass-through:
 *   - wix:image://v1/<id>/<filename>#originWidth=..&originHeight=..
 *   - https://static.wixstatic.com/media/<id>?originWidth=..&originHeight=..
 *   - any other URL (local /images/.., absolute https) -> used as-is
 */
function resolveImage(src: string, props: WixImageDataProps): ResolvedImage {
  const num = (v: string | null) => {
    const n = parseInt(v || '0', 10);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };

  const wixImagePrefix = 'wix:image://v1/';
  if (src.startsWith(wixImagePrefix)) {
    const rest = src.slice(wixImagePrefix.length);
    const id = rest.split('#')[0].split('/')[0];
    const params = new URLSearchParams(src.split('#')[1] || '');
    return {
      url: `${STATIC_MEDIA_URL}${id}`,
      width: props.originWidth ?? num(params.get('originWidth')),
      height: props.originHeight ?? num(params.get('originHeight')),
    };
  }

  if (src.startsWith(STATIC_MEDIA_URL)) {
    const url = new URL(src);
    return {
      // Strip the metadata query to get the canonical full-resolution media URL.
      url: `${url.origin}${url.pathname}`,
      width: props.originWidth ?? num(url.searchParams.get('originWidth')),
      height: props.originHeight ?? num(url.searchParams.get('originHeight')),
    };
  }

  return { url: src, width: props.originWidth, height: props.originHeight };
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType = 'fill', originWidth, originHeight, focalPointX, focalPointY, className, style, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);

    useEffect(() => {
      setImgSrc(src);
    }, [src]);

    if (!src) {
      return <div data-empty-image className={className} style={style} />;
    }

    const onError = () => setImgSrc(FALLBACK_IMAGE_URL);
    const isErrorUrl = imgSrc === FALLBACK_IMAGE_URL;
    const resolved = resolveImage(imgSrc || src, { fittingType, originWidth, originHeight, focalPointX, focalPointY });
    const objectFit = fittingType === 'fit' ? 'object-contain' : 'object-cover';

    // With intrinsic dimensions, wrap in an aspect-ratio box so layout stays
    // stable while the image loads (mirrors the previous Wix <Image> behaviour
    // and reuses the CSS variables defined in image.css).
    if (resolved.width && resolved.height) {
      const wrapperStyle = {
        '--img-aspect-ratio': `${resolved.width} / ${resolved.height}`,
        '--img-default-width': `${resolved.width}px`,
        ...style,
      } as CSSProperties;

      return (
        <span className={cn('inline-block relative', className)} style={wrapperStyle}>
          <img
            ref={ref}
            src={resolved.url}
            onError={onError}
            data-error-image={isErrorUrl || undefined}
            className={cn('w-full h-full inset-0 absolute', objectFit)}
            {...props}
          />
        </span>
      );
    }

    return (
      <img
        ref={ref}
        src={resolved.url}
        onError={onError}
        data-error-image={isErrorUrl || undefined}
        className={className}
        style={style}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';
