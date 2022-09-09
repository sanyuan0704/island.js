import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { throttle } from 'lodash-es';

function isBottom() {
  return (
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.scrollHeight
  );
}

export function Aside(props: { __island: boolean; headers: any[] }) {
  const { headers } = props;
  // For outline text highlight
  const [activeIndex, setActiveIndex] = React.useState(0);
  const markerRef = React.useRef<HTMLDivElement>(null);
  const SCROLL_INTO_HEIGHT = 150;

  useEffect(() => {
    const onScroll = throttle(
      function listen() {
        const links = document.querySelectorAll<HTMLAnchorElement>(
          '.island-doc .header-anchor'
        );
        if (isBottom()) {
          setActiveIndex(links.length - 1);
          markerRef.current!.style.top = `${33 + (headers.length - 1) * 28}px`;
        } else {
          // Compute current index
          for (let i = 0; i < links.length; i++) {
            const topDistance = links[i].getBoundingClientRect().top;
            if (topDistance > 0 && topDistance < SCROLL_INTO_HEIGHT) {
              const id = links[i].getAttribute('href');
              const index = headers.findIndex(
                (item: any) => item.id === id?.slice(1)
              );
              if (index > -1 && index !== activeIndex) {
                setActiveIndex(index);
                markerRef.current!.style.top = `${33 + index * 28}px`;
              } else {
                setActiveIndex(0);
                markerRef.current!.style.top = '33px';
              }
              break;
            }
          }
        }
      },
      100,
      { trailing: true }
    );
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const renderHeader = (header: any, index: number) => {
    const isNested = header.depth > 2;
    return (
      <li key={header.text}>
        <a
          href={`#${header.id}`}
          className={`${styles.outlineLink} ${
            index == activeIndex ? styles.active : ''
          } ${isNested ? styles.nested : ''}`}
        >
          {header.text}
        </a>
      </li>
    );
  };

  return (
    <div className={styles.docAside}>
      <div className={styles.docsAsideOutline}>
        <div className={styles.content}>
          <div className={styles.outlineMarker} ref={markerRef}></div>
          <div className={styles.outlineTitle}>目录</div>
          <nav>
            <ul className={styles.root}>{headers.map(renderHeader)}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
