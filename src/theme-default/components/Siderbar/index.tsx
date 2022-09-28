import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { DefaultTheme } from '../../../shared/types';
import { usePageData } from 'island/client';
import { useLocation } from 'react-router-dom';
import {
  normalizeHref,
  useSidebarData,
  useLocaleSiteData
} from '../../logic/index';

export function SideBar() {
  const location = useLocation();
  const { siteData } = usePageData();
  const localesData = useLocaleSiteData(
    siteData.themeConfig,
    location.pathname
  );
  const sidebar = localesData.sidebar || {};

  const sidebarData = useSidebarData(sidebar, location.pathname);

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    const isActive = location.pathname.startsWith(item.link!);
    return (
      <div style={{ marginLeft }}>
        <div className={`${styles.link} ${isActive ? styles.active : ''}`}>
          <Link href={normalizeHref(item.link!)}>{item.text}</Link>
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
          {item?.items?.map((item) => (
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
          {[sidebarData]
            .filter(Boolean)
            .flat()
            .map((item: DefaultTheme.SidebarGroup | undefined) =>
              renderGroup(item!)
            )}
        </div>
      </nav>
    </aside>
  );
}
