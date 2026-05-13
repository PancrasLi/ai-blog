'use client';

import { useState } from 'react';

interface InstallContent {
  claudeCode: string[];
  cursor: string[];
  openclaw: string[];
}

interface SkillLanguageTabsProps {
  slug: string;
  title: string;
  title_zh?: string;
  description: string;
  description_zh?: string;
}

function getInstallStepsEn(slug: string, title: string): InstallContent {
  return {
    claudeCode: [
      'Open Claude Code editor',
      'In the Files panel, locate the skill or library',
      `Add the following import statement:\n\`import * as ${slug} from '@/skills/${slug}';\``,
      'Start using the skill functions in your code',
    ],
    cursor: [
      `Open Terminal in Cursor (Ctrl+\`) and navigate to your project`,
      `Install the skill package:\n\`npm install ${slug}\``,
      `Add import:\n\`import { handler } from '${slug}';\``,
      'Press Cmd+K (or Ctrl+K) to invoke Cursor AI and ask it to integrate the skill',
    ],
    openclaw: [
      `Install via astrahub:\n\`astrahub install ${slug}\``,
      `Or search first:\n\`astrahub search ${slug}\``,
      `View skill details:\n\`astrahub info ${slug}\``,
      `In your agent task, prompt:\n\`You have access to the ${title} skill. Use it to: [task description]\``,
    ],
  };
}

function getInstallStepsZh(slug: string, title_zh: string): InstallContent {
  return {
    claudeCode: [
      '打开 Claude Code 编辑器',
      '在文件面板中找到对应的 Skill 或库',
      `添加以下导入语句：\n\`import * as ${slug} from '@/skills/${slug}';\``,
      '即可在代码中调用 Skill 提供的功能',
    ],
    cursor: [
      `在 Cursor 中打开终端（Ctrl+\`），进入项目目录`,
      `安装 Skill 包：\n\`npm install ${slug}\``,
      `添加导入：\n\`import { handler } from '${slug}';\``,
      '按 Cmd+K（或 Ctrl+K）唤起 Cursor AI，让它帮你集成该 Skill',
    ],
    openclaw: [
      `通过 astrahub 安装：\n\`astrahub install ${slug}\``,
      `或先搜索：\n\`astrahub search ${slug}\``,
      `查看详情：\n\`astrahub info ${slug}\``,
      `在 Agent 任务中提示：\n\`你可以使用 ${title_zh} Skill，请用它来：[任务描述]\``,
    ],
  };
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="ml-4 list-decimal space-y-3">
      {steps.map((step, i) => {
        const parts = step.split('\n');
        return (
          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
            {parts[0]}
            {parts[1] && (
              <div className="mt-2 rounded bg-gray-900 p-3 font-mono text-sm text-white dark:bg-gray-800">
                {parts[1].replace(/`/g, '')}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function SkillLanguageTabs({
  slug,
  title,
  title_zh,
  description,
  description_zh,
}: SkillLanguageTabsProps) {
  const hasZh = Boolean(title_zh && description_zh);
  const [lang, setLang] = useState<'zh' | 'en'>(hasZh ? 'zh' : 'en');

  const isZh = lang === 'zh' && hasZh;
  const displayTitle = isZh ? title_zh! : title;
  const displayDesc = isZh ? description_zh! : description;
  const steps = isZh
    ? getInstallStepsZh(slug, title_zh!)
    : getInstallStepsEn(slug, title);

  const introZh =
    '这是一个功能强大的 Skill，可以无缝集成到你的工作流中。以下内容包含了在主流 AI 编程工具中快速引入并使用它所需的全部步骤。';
  const introEn =
    'This is a powerful skill that integrates seamlessly into your workflow. Below you will find everything you need to integrate it into your projects.';

  return (
    <div>
      {/* Language Toggle */}
      {hasZh && (
        <div className="mb-8 flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900 w-fit">
          <button
            onClick={() => setLang('zh')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              lang === 'zh'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => setLang('en')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              lang === 'en'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            English
          </button>
        </div>
      )}

      {/* Dynamic Title & Description (shown in tabs area for context) */}
      <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/50">
        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{displayTitle}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{displayDesc}</p>
      </div>

      {/* Introduction */}
      <div className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          {isZh ? '介绍' : 'Introduction'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh ? introZh : introEn}
        </p>
      </div>

      {/* Installation */}
      <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          {isZh ? '安装与集成' : 'Installation'}
        </h2>

        {/* Claude Code */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {isZh ? '在 Claude Code 中使用' : 'In Claude Code'}
          </h3>
          <StepList steps={steps.claudeCode} />
        </div>

        {/* Cursor */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {isZh ? '在 Cursor 中使用' : 'In Cursor'}
          </h3>
          <StepList steps={steps.cursor} />
        </div>

        {/* OpenClaw */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {isZh ? '在 OpenClaw 中使用' : 'In OpenClaw'}
          </h3>
          <StepList steps={steps.openclaw} />
        </div>
      </div>
    </div>
  );
}
