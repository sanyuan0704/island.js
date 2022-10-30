import { useState, useEffect } from 'react';
import BTween from 'b-tween';
import { throttle } from 'lodash-es';
import type { ComponentPropsWithIsland } from 'islandjs';

export default function BackTop({
  backTop
}: { backTop?: boolean } & ComponentPropsWithIsland) {
  const backTopCtrl = backTop ?? true;

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
      onUpdate: (info?: Record<string, string | number>) => {
        target.scrollTop = Number(info?.scrollTop);
        return;
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
        color="gray hover:gray-500"
        bg="~ gray-200 hover:gray-300"
        shadow="sm hover:md"
      >
        <div flex="~ center">
          <div className="i-carbon-chevron-up" text="xl"></div>
        </div>
      </button>
    </div>
  ) : null;
}
