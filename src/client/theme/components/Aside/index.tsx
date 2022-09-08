import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router-dom';
interface Header {
  text: string;
  link: string;
  children: Header[];
  hidden: boolean;
}

function isBottom() {
  return (
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.scrollHeight
  );
}

export function Aside() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const markerRef = React.useRef<HTMLDivElement>(null);
  const headers = [
    {
      text: 'Introduction',
      link: '/introduction',
      children: [
        {
          text: 'Getting Started',
          link: '/introduction/getting-started',
          children: [],
          hidden: false
        },
        {
          text: 'Why Island',
          link: '/introduction/why-island',
          children: [
            {
              text: 'Why 123',
              link: '/introduction/why-island',
              children: [],
              hidden: false
            }
          ],
          hidden: false
        },
        {
          text: 'Features',
          link: '/introduction/features',
          children: [],
          hidden: false
        }
      ],
      hidden: false
    }
  ];
  const SCROLL_INTO_HEIGHT = 150;
  useEffect(() => {
    const links = document.querySelectorAll('.island-doc .header-anchor');

    const onScroll = () => {
      if (isBottom()) {
        setActiveIndex(links.length - 1);
      } else {
        // Compute current index
        for (let i = 0; i < links.length; i++) {
          if (links[i].getBoundingClientRect().top < SCROLL_INTO_HEIGHT) {
            if (
              i < links.length - 1 &&
              links[i + 1].getBoundingClientRect().top < SCROLL_INTO_HEIGHT
            ) {
              continue;
            } else {
              setActiveIndex(i);
            }
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', throttle(onScroll, 200));

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.style.top = `${33 + activeIndex * 28}px`;
    }
  }, [activeIndex]);

  const renderHeader = (header: Header) => {
    let children = null;
    if (header.children.length) {
      children = (
        <ul>
          {header.children.map((child) => (
            <li key={child.link}>
              <a
                href={child.link}
                className={`${styles.outlineLink} ${styles.nested}`}
              >
                {child.text}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <li>
        <a href={header.link} className={styles.outlineLink}>
          {header.text}
          {children}
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
