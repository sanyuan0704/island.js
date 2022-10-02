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
  const lang = localeData.lang || 'zh';
  const menuItems = localeData.nav || [];
  const socialLinks = siteData?.themeConfig?.socialLinks || [];
  const title =
    localeData.title ?? siteData.themeConfig.siteTitle ?? siteData.title;
  const renderMenuSingleItem = (item: DefaultTheme.NavItemWithLink) => {
    const isActive = new RegExp(item.activeMatch || '').test(location.pathname);
    return (
      <div
        key={item.text}
        m="l-1.4rem"
        className={`${isActive ? 'text-brand' : ''}`}
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
    return <div className="menu">{menuItems.map(renderMenuItem)}</div>;
  };

  return (
    <header relative="~" z="2" fixed="lg:~" className="top-0 left-0" w="100%">
      <div
        relative="~"
        p="l-8 sm:x-8"
        transition="border-color duration-500 background-color duration-500"
        className="divider-top divider-bottom lg:border-b-transparent"
        nav-h="mobile lg:desktop"
      >
        <div
          flex="~"
          justify="between"
          m="0 auto"
          nav-h="mobile lg:desktop"
          className={`${styles.container}  ${
            hasSidebar ? styles.hasSidebar : ''
          }`}
        >
          <div
            shrink="0"
            border="border t-0 b-1 border-solid transparent"
            z="2"
            className={`${styles.navBarTitle}`}
          >
            <a
              href="/"
              w="100%"
              h="15"
              text="1rem"
              font="semibold"
              transition="opacity duration-300"
              hover="opacity-60"
              className="flex items-center"
            >
              <span>{title}</span>
            </a>
          </div>
          <div
            className={`${styles.content}`}
            flex="~ 1"
            justify="end"
            items-center="~"
          >
            <div className="search" flex="sm:1" pl="sm:8">
              {}
            </div>
            <div className="menu">{renderMenuList()}</div>
            <div
              className="translation"
              flex="~"
              text="sm"
              font="bold"
              items-center="~"
              before="menu-item-before"
            >
              <Link href={lang === 'zh' ? '/en/' : '/zh/'}>
                {lang === 'zh' ? 'English' : '中文版'}
              </Link>
            </div>
            {hasAppearanceSwitch && (
              <div
                className="appearance"
                before="menu-item-before"
                display="none sm:flex"
                items-center="center"
              >
                <SwitchAppearance />
              </div>
            )}

            <div
              className="social-links"
              flex="~"
              items-center="~"
              before="menu-item-before"
            >
              <div
                flex="~"
                items-center="~"
                w="9"
                h="9"
                transition="color duration-500"
                color="hover:brand"
              >
                {socialLinks.map((item) => {
                  const IconComp = IconMap[item.icon as keyof typeof IconMap];
                  return (
                    <a
                      key={item.link}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      w="5"
                      h="5"
                    >
                      <IconComp fill="currentColor" />
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
