'use client';

import { useEffect } from 'react';

interface AdsenseDisplayProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

export function AdsenseDisplay({
  slot,
  format = 'auto',
  className = 'my-8',
}: AdsenseDisplayProps) {
  useEffect(() => {
    try {
      // 推送广告配置
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [slot]);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7633076101353582"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
