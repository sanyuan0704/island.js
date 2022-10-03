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
        <div
          p="1"
          block="~"
          transition="color duration-500"
          text="sm"
          font-medium="~"
          className={`${isActive ? 'text-brand' : 'text-text-2'}`}
        >
          <Link href={normalizeHref(item.link!)}>{item.text}</Link>
        </div>
        {children}
      </div>
    );
  };

  const renderGroup = (item: DefaultTheme.SidebarGroup) => {
    return (
      <section key={item.text} block="~" not-first="divider-top mt-4">
        <div flex="~" justify="between" items-start="~">
          <h2 m="t-3 b-2" text="1rem text-1" font="bold">
            {item.text}
          </h2>
        </div>
        <div mb="1.4 sm:1">
          {item?.items?.map((item) => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        {[sidebarData]
          .filter(Boolean)
          .flat()
          .map((item: DefaultTheme.SidebarGroup | undefined) =>
            renderGroup(item!)
          )}
      </nav>
    </aside>
  );
}
