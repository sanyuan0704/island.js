import { useState, useEffect } from 'react';
import BTween from 'b-tween';
import { throttle } from 'lodash-es';
import type { ComponentPropsWithIsland, DefaultTheme } from 'islandjs';

const isObject = (val: unknown): val is DefaultTheme.BackTopOptions =>
  typeof val === 'object';

export function BackTop({
  backTop
}: {
  backTop?: DefaultTheme.BackTopOptions | boolean;
} & ComponentPropsWithIsland) {
  const backTopEnabled = isObject(backTop) ? true : backTop ?? true;

  let visibleHeight = 200;
  let duration = 500;
  let animation = 'quadIn';
  if (isObject(backTop)) {
    visibleHeight = backTop.visibleHeight ?? visibleHeight;
    duration = backTop.duration ?? duration;
    animation = backTop.animation ?? animation;
  }

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
      easing: animation,
      duration,
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
      const scrollTop = document.documentElement.scrollTop;
      setVisible(scrollTop >= visibleHeight);
    }, 500);
    document.addEventListener('scroll', scrollHandler);

    return () => {
      scrollHandler.cancel();
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  return backTopEnabled && visible ? (
    <div
      className="fixed bottom-10 right-30 z-10"
      display="none md:block"
      onClick={scrollToTop}
    >
      <button
        className="w-10 h-10 rounded-full duration-300"
        style={{ backgroundColor: 'var(--island-c-bg)' }}
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

export * from './BackTopDemo';
export default BackTop;
