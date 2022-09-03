import styles from './index.module.scss';
import React from 'react';
import MinusSvg from './icons/minus.svg';
import PlusSvg from './icons/plus.svg';
import { Link } from '../Link/index';

export type SidebarItem =
  | { text: string; link: string }
  | { text: string; link?: string; items: SidebarItem[] };

interface SideBarData {
  text: string;
  items: SidebarItem[];
  collapsible?: boolean;
  collapsed?: boolean;
}

export function SideBar() {
  const data: SideBarData[] = [
    {
      text: 'Home',
      items: [{ text: 'Home', link: '/' }]
    },
    {
      text: 'Docs',
      items: [
        {
          text: 'Getting Started',
          link: '/docs/getting-started'
        },
        {
          text: 'Guides',
          items: [
            {
              text: 'Introduction',
              link: '/docs/guides/introduction'
            }
          ]
        }
      ]
    }
  ];
  const renderGroupItem = (item: SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    return (
      <div style={{ marginLeft }}>
        <div className={styles.link}>
          <Link>{item.text}</Link>
        </div>
        {children}
      </div>
    );
  };

  const renderGroup = (item: SideBarData) => {
    return (
      <section className={`${styles.sideBarGroup} ${styles.collapsible}`}>
        <div className={styles.title}>
          <h2 className={styles.titleText}>{item.text}</h2>
          <div className={styles.action}>
            <MinusSvg className={`${styles.icon} ${styles.minus}`}></MinusSvg>
            <PlusSvg className={`${styles.icon} ${styles.plus}`}></PlusSvg>
          </div>
        </div>
        <div className={styles.items}>
          {item.items.map((item) => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.group}>
          {data.map((item) => renderGroup(item))}
        </div>
      </nav>
    </aside>
  );
}
