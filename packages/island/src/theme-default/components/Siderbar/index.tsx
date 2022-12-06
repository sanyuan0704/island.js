import styles from './index.module.scss';
import React from 'react';
import { Link } from '../Link/index';
import { DefaultTheme } from 'shared/types';
import { normalizeHref } from '@runtime';
import { isActive } from '../../logic/index';
import { ComponentPropsWithIsland } from 'shared/types/index';
import { removeBase } from '@runtime';

interface Props {
  isSidebarOpen?: boolean;
  pathname: string;
  langRoutePrefix: string;
  sidebarData: DefaultTheme.SidebarGroup[];
}

export function SideBar(props: Props & ComponentPropsWithIsland) {
  const {
    isSidebarOpen,
    langRoutePrefix,
    pathname,
    sidebarData: rawSidebarData
  } = props;
  const sidebarData = rawSidebarData.filter(Boolean).flat();
  const [collapseList, setCollapseList] = React.useState<boolean[]>(
    sidebarData.map((item) => item.collapsed ?? false)
  );

  const renderGroupItem = (item: DefaultTheme.SidebarItem, depth = 0) => {
    const marginLeft = `${depth * 20}px`;
    let children: React.ReactElement[] = [];
    if ('items' in item) {
      children = item.items.map((child) => renderGroupItem(child, depth + 1));
    }
    // Extract lang route prefix
    const active = isActive(
      removeBase(pathname.replace(langRoutePrefix, '')),
      item.link?.replace(langRoutePrefix, '')
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

  const renderGroup = (item: DefaultTheme.SidebarGroup, index: number) => {
    const collapsed = collapseList[index];
    const toggleCollapse = () => {
      const newCollapseList = [...collapseList];
      newCollapseList[index] = !newCollapseList[index];
      setCollapseList(newCollapseList);
    };
    const collapsableIcon = (item.collapsable || collapsed) && (
      <div
        className="i-carbon-chevron-right"
        onClick={toggleCollapse}
        cursor-pointer="~"
        style={{
          transition: 'transform 0.2s ease-out',
          transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
        }}
      ></div>
    );
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
          {collapsableIcon}
        </div>
        <div
          mb="1.4 sm:1"
          style={{
            transition: 'height 0.2s ease-out',
            height: collapsed ? 0 : `${(item?.items.length || 0) * 28}px`,
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
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <nav>
        {sidebarData.map(
          (item: DefaultTheme.SidebarGroup | undefined, index: number) =>
            renderGroup(item!, index)
        )}
      </nav>
    </aside>
  );
}
