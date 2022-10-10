import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { DefaultTheme } from '../../../shared/types';
import { normalizeHref, useSidebarData } from '../../logic/index';
import { useLocation } from 'react-router-dom';
import { isActive } from '../../logic/index';

export function SideBar() {
  const { pathname } = useLocation();
  const { items: sidebarData } = useSidebarData(pathname);

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    const active = isActive(pathname, item.link);
    return (
      <div style={{ marginLeft }}>
        <div
          p="1"
          block="~"
          text="sm"
          font-medium="~"
          className={`${active ? 'text-brand' : 'text-text-2'}`}
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
