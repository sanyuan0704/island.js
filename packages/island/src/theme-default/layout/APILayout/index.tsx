import { usePageData, normalizeHref, withBase } from '@runtime';
import { ComponentType, useEffect, useState } from 'react';
import { Header, PageModule } from 'shared/types';
import { useSidebarData } from '../../logic';
import { Link } from '../../components/Link/index';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import { isEqualPath } from '../../logic/utils';

interface GroupItem {
  text?: string;
  link?: string;
  headers?: Header[];
}

interface Group {
  name: string;
  items: GroupItem[];
}

export function APILayout() {
  const { subModules: apiPageModules = [] } = usePageData();
  const { pathname } = useLocation();
  const { items: apiSidebarGroups } = useSidebarData(pathname);
  const initialGroups: Group[] = apiSidebarGroups.map((sidebarGroup) => ({
    name: sidebarGroup.text || '',
    items: sidebarGroup.items.map((item) => {
      const pageModule = apiPageModules.find((m) =>
        isEqualPath(m.routePath as string, withBase(item.link || ''))
      );
      return {
        ...item,
        headers: (pageModule?.toc as Header[]).filter(
          (header) => header.depth === 2
        )
      };
    })
  }));

  const [groups, setGroups] = useState(initialGroups);

  useEffect(() => {
    // Handle title hmr
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ routePath, filePath }) => {
        const group = groups.find((group) =>
          group.items.find((item) => item.link === routePath)
        );
        if (!group) {
          return;
        }
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod: PageModule<ComponentType<unknown>>) => {
            const itemIndex = group.items.findIndex(
              (item) => item.link === routePath
            );
            const targetItem = group.items[itemIndex];
            targetItem.headers = (mod?.toc as Header[]).filter(
              (header) => header.depth === 2
            );
            targetItem.text = mod?.title as string;
            setGroups([...groups]);
          }
        );
      });
    }
  }, [groups]);
  return (
    <div className="api-index max-w-1024px" m="x-auto" p="y-16 x-8">
      <div flex="" items-center="" justify="between">
        <h1>API Reference</h1>
      </div>

      {groups.map((group) => (
        <div mb="16" key={group.name!}>
          <h2>{group.name}</h2>
          <div className={styles.apiGroups}>
            {group.items.map((item) => (
              <div className={styles.apiGroup} key={item.link}>
                <h3>
                  <Link href={normalizeHref(item.link)}>{item.text}</Link>
                </h3>
                <ul list="none">
                  {item.headers?.map((header) => (
                    <li
                      key={header.id}
                      className={`${styles.apiGroupLi} ${
                        styles[`level${header.depth}`]
                      }`}
                    >
                      <Link href={`${normalizeHref(item.link)}#${header.id}`}>
                        {header.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
