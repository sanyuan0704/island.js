import { React, useState, useEffect } from 'react';
import BTween from 'b-tween';
import { throttle } from 'lodash-es';
import { usePageData } from 'island/client';

export function BackTop() {
  const { siteData } = usePageData();
  const backTopCtrl = siteData?.themeConfig?.backTop ?? true;

  const scrollToTop = () => {
    // https://github.com/PengJiyuan/b-tween
    const target = document.documentElement;
    const targetScrollTop = target.scrollTop;
    const btween = new BTween({
      from: {
        scrollTop: targetScrollTop
      },
      to: {
        scrollTop: 0
      },
      easing: 'quadIn',
      duration: 500,
      onUpdate: (keys) => {
        target.scrollTop = keys.scrollTop;
      }
    });
    btween.start();
  };

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const scrollHandler = throttle(() => {
      const visibleHeight = 200;
      const scrollTop = document.documentElement.scrollTop;
      setVisible(scrollTop >= visibleHeight);
    }, 500);
    document.addEventListener('scroll', scrollHandler);

    return () => {
      scrollHandler.cancel();
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  return backTopCtrl && visible ? (
    <div className="fixed bottom-10 right-30 z-10" onClick={scrollToTop}>
      <button
        className="w-10 h-10 rounded-full duration-300 bg-white"
        c="gray hover:gray-500"
        b="~ gray-200 hover:gray-300"
        shadow="sm hover:md"
      >
        <div flex="~ center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
            className="w-4 h-4"
          >
            <path d="M39.6 30.557 24.043 15 8.487 30.557"></path>
          </svg>
        </div>
      </button>
    </div>
  ) : null;
}
