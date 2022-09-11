import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { DefaultTheme } from '../../../../shared/types';
import { usePageData } from 'island/client';
import { useLocation } from 'react-router-dom';

export function SideBar() {
  const location = useLocation();
  const { siteData } = usePageData();
  const sidebar = siteData.themeConfig.sidebar || {};

  const sidebarData = Array.isArray(sidebar)
    ? sidebar[0]
    : (Object.keys(sidebar)
        .filter((item) => location.pathname.startsWith(item))
        .map((item) => sidebar[item])[0] as DefaultTheme.SidebarGroup[]);

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    const isActive = item.text.includes('CLI');
    return (
      <div style={{ marginLeft }}>
        <div className={`${styles.link} ${isActive ? styles.active : ''}`}>
          <Link href={item.link}>{item.text}</Link>
        </div>
        {children}
      </div>
    );
  };

  const renderGroup = (item: DefaultTheme.SidebarGroup) => {
    return (
      <section
        key={item.text}
        className={`${styles.sideBarGroup} ${styles.collapsible}`}
      >
        <div className={styles.title}>
          <h2 className={styles.titleText}>{item.text}</h2>
          {/* <div className={styles.action}>
            <MinusSvg className={`${styles.icon} ${styles.minus}`}></MinusSvg>
            <PlusSvg className={`${styles.icon} ${styles.plus}`}></PlusSvg>
          </div> */}
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
          {[sidebarData].flat().map((item) => renderGroup(item))}
        </div>
      </nav>
    </aside>
  );
}
