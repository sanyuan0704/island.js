import React from 'react';
import styles from './index.module.scss';
import { Link } from '../Link/index';
import { SwitchAppearance } from '../SwitchAppearance/index';
import GithubSvg from './icons/github.svg';
import { Search } from '../Search/index';

export function NavBar() {
  const menuItems = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Home',
      href: '/'
    }
  ];
  const renderMenuList = () => {
    return (
      <div className={styles.menu}>
        {menuItems.map((item) => (
          <div
            key={item.text}
            className={`${styles.menuLink} ${styles.active}`}
          >
            <Link href="/">123</Link>
          </div>
        ))}
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
            <SwitchAppearance />
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
  return (
    <header className={styles.nav}>
      <NavBar />
    </header>
  );
}
