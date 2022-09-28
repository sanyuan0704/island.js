import styles from './index.module.scss';
import { Link } from '../Link/index';
import { SwitchAppearance } from '../SwitchAppearance/index';
import GithubSvg from './icons/github.svg';
// import { Search } from '../Search/index';
import { DefaultTheme } from '../../../shared/types';
import { useLocation } from 'react-router-dom';
import { usePageData } from 'island/client';
import { normalizeHref, useLocaleSiteData } from '../../logic';

const IconMap = {
  github: GithubSvg
};

export function Nav() {
  const location = useLocation();
  const { siteData, pageType } = usePageData();
  const hasSidebar = pageType === 'doc';
  const hasAppearanceSwitch = siteData.appearance !== false;
  const localeData = useLocaleSiteData(siteData.themeConfig, location.pathname);
  const menuItems = localeData.nav || [];
  const socialLinks = siteData?.themeConfig?.socialLinks || [];
  const title =
    localeData.title ?? siteData.themeConfig.siteTitle ?? siteData.title;
  const renderMenuSingleItem = (item: DefaultTheme.NavItemWithLink) => {
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
  const renderMenuItemGroup = (item: DefaultTheme.NavItemWithChildren) => {
    return (
      <div className={styles.menuGroup}>
        <button>{item.text}</button>
        <div className={styles.menuItems}>
          {item.items.map((child) => renderMenuItem(child))}
        </div>
      </div>
    );
  };

  const renderMenuItem = (item: DefaultTheme.NavItem) => {
    return 'link' in item
      ? renderMenuSingleItem(item)
      : renderMenuItemGroup(item);
  };

  const renderMenuList = () => {
    return <div className={styles.menu}>{menuItems.map(renderMenuItem)}</div>;
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
              {/* <span className={styles.logo}></span> */}
              <span>{title}</span>
            </a>
          </div>
          <div className={styles.content}>
            <div className={styles.search}>{/* <Search /> */}</div>
            <div className={styles.menu}>{renderMenuList()}</div>
            {hasAppearanceSwitch && (
              <div className={styles.appearance}>
                <SwitchAppearance __island />
              </div>
            )}
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
