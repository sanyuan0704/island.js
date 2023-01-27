import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { SidebarGroup, SidebarItem } from 'shared/types';

interface Props {
  sidebarData: SidebarGroup[];
  pathname: string;
}

export function SideBar(props: Props) {
  const { pathname, sidebarData: rawSidebarData } = props;
  const sidebarData = rawSidebarData.filter(Boolean).flat();

  const renderGroupItem = (item: SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    // Extract lang route prefix
    const active = pathname === item.link;
    return (
      <div style={{ marginLeft }}>
        <div
          p="1"
          block="~"
          text="sm"
          font-medium="~"
          className={`${active ? 'text-brand' : 'text-text-2'}`}
        >
          <Link href={item.link}>{item.text}</Link>
        </div>
        {children}
      </div>
    );
  };

  const renderGroup = (item: SidebarGroup) => {
    return (
      <section key={item.text} block="~" not-first="divider-top mt-4">
        <div
          flex="~"
          justify="between"
          items-start="~"
          className="items-center"
        >
          <h2 m="t-3 b-2" text="1rem text-1" font="bold">
            {item.text}
          </h2>
        </div>
        <div
          mb="1.4 sm:1"
          style={{
            transition: 'height 0.2s ease-out',
            height: 'auto',
            overflow: 'hidden'
          }}
        >
          {item?.items?.map((item) => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav>{sidebarData.map(renderGroup)}</nav>
    </aside>
  );
}
