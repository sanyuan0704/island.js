import styles from './index.module.scss';
import { Link } from '../Link/index';
import { SwitchAppearance } from '../SwitchAppearance/index';
import GithubSvg from './icons/github.svg';
import { Search } from '../Search/index';
import { DefaultTheme } from '../../../../shared/types';
import { useLocation } from 'react-router-dom';
import { usePageData } from 'island/client';
interface NavBarProps {
  nav: DefaultTheme.NavItem[];
  hasSidebar: boolean;
}

export function NavBar(props: NavBarProps) {
  const menuItems = props.nav;
  const location = useLocation();
  const renderMenuItem = (item: DefaultTheme.NavItemWithLink) => {
    const isActive = new RegExp(item.activeMatch || '').test(location.pathname);
    return (
      <div
        key={item.text}
        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
      >
        <Link href={item.link}>{item.text}</Link>
      </div>
    );
  };

  const renderMenuItemGroup = (item: DefaultTheme.NavItemWithChildren) => {
    return <div>...</div>;
  };

  const renderMenuList = () => {
    return (
      <div className={styles.menu}>
        {menuItems.map((item) =>
          'link' in item ? renderMenuItem(item) : renderMenuItemGroup(item)
        )}
      </div>
    );
  };
  return (
    <div className={styles.navBar}>
      <div className={`${styles.container}`}>
        <div
          className={`${styles.navBarTitle} ${
            props.hasSidebar ? styles.hasSidebar : ''
          }`}
        >
          <a href="/" className={styles.title}>
            <span className={styles.logo}>🏝️</span>
            <span>Island</span>
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
  const { siteData, pageType } = usePageData();
  const nav = siteData.themeConfig.nav || [];
  const hasSidebar = pageType === 'doc';
  return (
    <header className={styles.nav}>
      <NavBar nav={nav} hasSidebar={hasSidebar} />
    </header>
  );
}
