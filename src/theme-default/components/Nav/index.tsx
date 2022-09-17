import styles from './index.module.scss';
import { Link } from '../Link/index';
import { SwitchAppearance } from '../SwitchAppearance/index';
import GithubSvg from './icons/github.svg';
// import { Search } from '../Search/index';
import { DefaultTheme } from '../../../shared/types';
import { useLocation } from 'react-router-dom';
import { usePageData } from 'island/client';
import { normalizeHref } from '../../logic/index';

const IconMap = {
  github: GithubSvg
};

export function Nav() {
  const { siteData, pageType } = usePageData();
  const hasSidebar = pageType === 'doc';
  const menuItems = siteData?.themeConfig?.nav || [];
  const socialLinks = siteData?.themeConfig?.socialLinks || [];
  const location = useLocation();
  const renderMenuItem = (item: DefaultTheme.NavItemWithLink) => {
    const isActive = new RegExp(item.activeMatch || '').test(location.pathname);
    return (
      <div
        key={item.text}
        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
      >
        <Link href={normalizeHref(item.link)}>{item.text}</Link>
      </div>
    );
  };
  // TODO: add menu dropdown group
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
    <header className={styles.nav}>
      <div className={styles.navBar}>
        <div className={`${styles.container}`}>
          <div
            className={`${styles.navBarTitle} ${
              hasSidebar ? styles.hasSidebar : ''
            }`}
          >
            <a href="/" className={styles.title}>
              <span className={styles.logo}>🏝️</span>
              <span>Island</span>
            </a>
          </div>
          <div className={styles.content}>
            <div className={styles.search}>{/* <Search /> */}</div>
            <div className={styles.menu}>{renderMenuList()}</div>
            <div className={styles.appearance}>
              <SwitchAppearance __island />
            </div>
            <div className={styles.socialLinks}>
              <div className={styles.socialLink}>
                {socialLinks.map((item) => {
                  const IconComp = IconMap[item.icon as keyof typeof IconMap];
                  return (
                    <a
                      key={item.link}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComp />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
