'use client';

import Link from 'next/link';
import { getIconSVG } from '@/lib/iconUtils';

interface SkillCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
  downloads: number;
  featured?: boolean;
}

export default function SkillCard({
  slug,
  title,
  description,
  category,
  icon,
  rating,
  downloads,
  featured = false,
}: SkillCardProps) {
  return (
    <Link href={`/skills/${slug}`}>
      <div
        className={`
          group relative flex flex-col gap-4 rounded-lg border p-6
          transition-all duration-200
          ${
            featured
              ? 'border-gray-300 bg-white shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-900'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700'
          }
          cursor-pointer
        `}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-950/30">
            <svg
              className="h-4 w-4 text-amber-600 dark:text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Featured
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
            dangerouslySetInnerHTML={{ __html: getIconSVG(icon) }}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {category}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Stats Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Downloads */}
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>{downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            className="h-5 w-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
