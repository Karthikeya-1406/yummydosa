import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { getMenuItem } from '../data/menu';
import { menuPhotoSrc } from '../data/menuPhotos';
import { DEMO_IMAGES, DemoImageKey } from '../data/demoImages';

interface DishImageProps {
  /** menu item id (src/data/menu.ts). Resolves to that dish's photo, or a placeholder if it has none. */
  imageId?: string;
  /** key into DEMO_IMAGES, for venue/event photos that aren't a menu dish. Ignored if imageId is given. */
  demoKey?: DemoImageKey;
  alt: string;
  className?: string;
  /** Sets the img `sizes` attribute for responsive loading. Defaults to a sensible card-grid value. */
  sizes?: string;
  /** Use for above-the-fold / hero-style images so they don't lazy-load late, and to request a larger source. */
  priority?: boolean;
}

/**
 * Menu dishes use real, freely licensed photos stored locally (src/data/menuPhotos.ts,
 * credited on /photo-credits). Venue/event shots use the demo photos in
 * src/data/demoImages.ts. Anything without a photo -- or that fails to load -- shows a
 * "Photo coming soon" placeholder rather than an unrelated image.
 */
export const DishImage: React.FC<DishImageProps> = ({
  imageId,
  demoKey,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}) => {
  const [failed, setFailed] = useState(false);

  const photo = imageId ? getMenuItem(imageId)?.photo : undefined;
  const demo = !imageId && demoKey ? DEMO_IMAGES[demoKey] : undefined;
  const src = photo ? menuPhotoSrc(photo) : demo?.url(priority ? 1600 : 800);

  if (!src || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 bg-stone-100 text-stone-400 ${className}`}
        role="img"
        aria-label={`${alt} - photo coming soon`}
      >
        <UtensilsCrossed className="w-6 h-6" strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Photo coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  );
};
