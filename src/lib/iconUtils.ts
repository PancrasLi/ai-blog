/**
 * SVG Icon Utilities
 * Provides SVG icons for different skill categories
 */

export function getIconSVG(iconName: string): string {
  const icons: Record<string, string> = {
    table: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/></svg>`,

    file: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 16.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM15 16.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM3 3.5h12V12H3V3.5zm13-1a1 1 0 011 1v8a1 1 0 01-1 1h-1v3.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-3.5H2a1 1 0 01-1-1V3.5a1 1 0 011-1h14z"/></svg>`,

    search: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,

    book: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h12V4H6zm6 6a1 1 0 100-2 1 1 0 000 2z"/></svg>`,

    'file-text': `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`,

    presentation: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14.5a.5.5 0 11-1 0 .5.5 0 011 0zm4 0a.5.5 0 11-1 0 .5.5 0 011 0zm2-11a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1 1 0 11-2 0 1 1 0 012 0zm4-4a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1 1 0 11-2 0 1 1 0 012 0z"/></svg>`,

    star: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>`,

    settings: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>`,

    database: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 15c-5.05 0-9-2.18-9-4.5s3.95-4.5 9-4.5 9 2.18 9 4.5-3.95 4.5-9 4.5zm0-12c5.05 0 9 2.18 9 4.5S17.05 11 12 11s-9-2.18-9-4.5 3.95-4.5 9-4.5z"/></svg>`,

    network: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M21 8a3 3 0 01-3-3V3.5a1.5 1.5 0 00-1.5-1.5H3.5A1.5 1.5 0 002 3.5V13a1.5 1.5 0 001.5 1.5h2v2.5a1.5 1.5 0 001.5 1.5H21a3 3 0 003-3v-9a3 3 0 00-3-3zm-5-3v3H7V5h9zm5 11.5H7V9h14v6.5z"/></svg>`,

    code: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,

    cloud: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.5 2.46 5.5 5.5v.5H19c2.05 0 3.71 1.66 3.71 3.71 0 1.71-1.04 3.16-2.36 3.84l1.41 1.41c2.27-1.45 3.82-3.95 3.82-6.85.1-2.85-1.03-5.48-3.02-7.34z"/></svg>`,

    default: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>`,
  };

  return icons[iconName] || icons.default;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    '文档处理': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    '网络工具': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
    'AI工具': 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    '系统工具': 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
    '默认': 'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-400',
  };

  return colors[category] || colors['默认'];
}

export function getCategoryIcon(category: string): string {
  const categoryIcons: Record<string, string> = {
    '文档处理': 'file-text',
    '网络工具': 'search',
    'AI工具': 'star',
    '系统工具': 'settings',
  };

  return categoryIcons[category] || 'default';
}
