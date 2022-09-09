import React from 'react';
import styles from './index.module.scss';
import { Link } from '../Link/index';
import { SwitchAppearance } from '../SwitchAppearance/index';
import GithubSvg from './icons/github.svg';
import { Search } from '../Search/index';
import { usePageData } from 'island:client';
import { DefaultTheme } from '../../../../shared/types';
import { useLocation } from 'react-router-dom';
interface NavBarProps {
  nav: DefaultTheme.NavItem[];
}

export function NavBar(props: NavBarProps) {
  const menuItems = props.nav;
  const location = useLocation();
  const renderMenuList = () => {
    return (
      <div className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = new RegExp(item.activeMatch || '').test(
            location.pathname
          );
          return (
            <div
              key={item.text}
              className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
            >
              <Link href="/">{item.text}</Link>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.navBar}>
      <div className={`${styles.container}`}>
        <div className={`${styles.navBarTitle} ${styles.hasSidebar}`}>
          <a href="/" className={styles.title}>
            Island
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.search}>
            <Search />
          </div>
          <div className={styles.menu}>{renderMenuList()}</div>
          <div className={styles.appearance}>
            <SwitchAppearance __island />
          </div>
          <div className={styles.socialLinks}>
            <div className={styles.socialLink}>
              <a href="/" target="_blank" rel="noopener">
                <GithubSvg />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const pageData = usePageData();
  const nav = pageData.themeConfig.nav || [];
  return (
    <header className={styles.nav}>
      <NavBar nav={nav} />
    </header>
  );
}
