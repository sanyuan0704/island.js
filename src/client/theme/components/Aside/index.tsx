import React from 'react';
import styles from './index.module.scss';

interface Header {
  text: string;
  link: string;
  children: Header[];
  hidden: boolean;
}

export function Aside() {
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
          <div className={styles.outlineMarker}></div>
          <div className={styles.outlineTitle}>目录</div>
          <nav>
            <ul className={styles.root}>{headers.map(renderHeader)}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
