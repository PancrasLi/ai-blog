import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIconSVG, getCategoryColor } from '@/lib/iconUtils';
import SkillLanguageTabs from '@/components/SkillLanguageTabs';
import fs from 'fs';
import path from 'path';

interface SkillDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getSkillsData() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/skills.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read skills data:', error);
    return { skills: [] };
  }
}

export default async function SkillDetailPage({
  params,
}: SkillDetailPageProps) {
  const { slug } = await params;
  const skillsData = getSkillsData();
  const skill = skillsData.skills.find((s: any) => s.slug === slug);

  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/skills" className="hover:text-gray-900 dark:hover:text-white">
              Skills
            </Link>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L12.17 12l-3.58 3.59z" />
            </svg>
            <span className="text-gray-900 dark:text-white">
              {skill.title_zh || skill.title}
            </span>
          </div>

          {/* Title and Icon */}
          <div className="flex items-start gap-6">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
              dangerouslySetInnerHTML={{ __html: getIconSVG(skill.icon) }}
            />
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {skill.title_zh || skill.title}
                </h1>
                {skill.featured && (
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-950/30">
                    <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Featured</span>
                  </div>
                )}
              </div>
              {/* Sub-title in English if Chinese is shown */}
              {skill.title_zh && (
                <p className="mb-3 text-sm text-gray-400 dark:text-gray-500">{skill.title}</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(skill.category)}`}>
                  {skill.category}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{skill.rating.toFixed(1)} ({skill.downloads.toLocaleString()} downloads)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {skill.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Language Tabs + Content */}
        <SkillLanguageTabs
          slug={skill.slug}
          title={skill.title}
          title_zh={skill.title_zh}
          description={skill.description}
          description_zh={skill.description_zh}
        />

        {/* Full Documentation */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            文档 / Documentation
          </h2>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              完整文档与示例请参考官方资源 / For complete documentation and examples:
            </p>
            {skill.sourceUrl && (
              <a
                href={skill.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {skill.sourceUrl}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
              返回 Skills 列表
            </Link>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              更新于 {skill.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const skillsData = getSkillsData();
  return skillsData.skills.map((skill: any) => ({
    slug: skill.slug,
  }));
}
