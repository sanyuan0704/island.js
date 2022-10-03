import { usePageData } from 'island/client';
import { useEffect, useState } from 'react';
import { Header } from 'shared/types';
import { normalizeHref } from '../../logic';
import { Link } from '../../components/Link/index';
import styles from './index.module.scss';

interface GroupItem {
  text: string;
  link: string;
  headers: Header[];
}

export function APILayout() {
  const { subModules = [] } = usePageData();

  const initialGroups = subModules.map((subModule) => {
    const { routePath, title } = subModule;
    return {
      text: title,
      link: routePath,
      headers: (subModule.toc as Header[]).filter((h) => h.depth === 2)
    } as GroupItem;
  });
  const [groups, setGroups] = useState(initialGroups);

  useEffect(() => {
    // Handle title hmr
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ routePath, filePath }) => {
        const group = groups.find((group) => group.link === routePath);
        if (!group) {
          return;
        }
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            group.headers = mod.toc;
            group.text = mod.title;
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

      <div mb="16">
        <h2>Config</h2>
        <div className={styles.apiGroups}>
          {groups.map((item) => (
            <div className={styles.apiGroup} key={item.link}>
              <h3>{item.text}</h3>
              <ul className={styles.apiGroupUl}>
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
    </div>
  );
}
