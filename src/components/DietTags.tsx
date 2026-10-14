import React from 'react';
import { DietTag } from '../types';
import { DIET_TAGS } from '../data/menu';

/** Round letter badges (N / G / V / J / D), as printed on the menu. */
export const DietTags: React.FC<{ tags: DietTag[]; size?: 'sm' | 'md' }> = ({ tags, size = 'sm' }) => {
  if (tags.length === 0) return null;
  const dim = size === 'sm' ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs';
  return (
    <span className="inline-flex items-center gap-1 shrink-0">
      {tags.map((tag) => (
        <span
          key={tag}
          title={DIET_TAGS[tag].label}
          aria-label={DIET_TAGS[tag].label}
          className={`${dim} ${DIET_TAGS[tag].className} rounded-full text-white font-bold inline-flex items-center justify-center`}
        >
          {tag}
        </span>
      ))}
    </span>
  );
};

/** Key to the badges, for the top of the menu page. */
export const DietLegend: React.FC = () => (
  <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-600">
    {(Object.keys(DIET_TAGS) as DietTag[]).map((tag) => (
      <li key={tag} className="inline-flex items-center gap-1.5">
        <DietTags tags={[tag]} />
        <span>{DIET_TAGS[tag].label}</span>
      </li>
    ))}
  </ul>
);
