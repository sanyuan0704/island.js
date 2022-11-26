import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { DefaultTheme } from '../@shared/types';
import { normalizeHref } from '@runtime';
import { isActive } from '../../logic/index';
import { ComponentPropsWithIsland } from 'shared/types/index';
import { withBase } from '@runtime';

interface Props {
  isSidebarOpen?: boolean;
  pathname: string;
  langRoutePrefix: string;
  sidebarData: DefaultTheme.SidebarGroup[];
}

export function SideBar(props: Props & ComponentPropsWithIsland) {
  const { isSidebarOpen, langRoutePrefix, pathname, sidebarData } = props;

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    // Extract lang route prefix
    // TODO: base url
    const active = isActive(
      pathname.replace(langRoutePrefix, ''),
      withBase(item.link?.replace(langRoutePrefix, ''))
    );
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
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
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
