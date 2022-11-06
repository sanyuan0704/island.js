import styles from './index.module.scss';
import type { ComponentPropsWithIsland } from 'islandjs';
import { SwitchAppearance } from '../SwitchAppearance/index';
import { Search } from '@search-box';
import { usePageData } from '@client';
import { NavMenuSingleItem } from './NavMenuSingleItem';
import { NavMenuGroup, NavMenuGroupItem } from './NavMenuGroup';
import { useLocaleSiteData, useSidebarData } from '../../logic';
import { DefaultTheme } from 'shared/types';
import Translator from '../../assets/translator.svg';
import GithubSvg from '../../assets/github.svg';
import { useLocation } from 'react-router-dom';
import { NavHamburger } from '../NavHambmger';

export interface NavProps {
  beforeNavTitle?: React.ReactNode;
  afterNavTitle?: React.ReactNode;
}

const IconMap = {
  github: GithubSvg
};

const NavBarTitle = ({ title }: { title: string }) => {
  return (
    <div
      shrink="0"
      border="border t-0 b-1 border-solid transparent"
      className={`${styles.navBarTitle}`}
    >
      <a
        href="/"
        w="100%"
        h="100%"
        text="1rem"
        font="semibold"
        transition="opacity duration-300"
        hover="opacity-60"
        className="flex items-center"
      >
        <span>{title}</span>
      </a>
    </div>
  );
};

const NavTranslations = ({
  translationMenuData
}: {
  translationMenuData: NavMenuGroupItem;
}) => {
  return (
    <div
      className="translation"
      flex="~"
      text="sm"
      font="bold"
      items-center="~"
      before="menu-item-before"
    >
      <div m="x-1.5">
        <NavMenuGroup {...translationMenuData!} />
      </div>
    </div>
  );
};

const NavSocialLinks = ({
  socialLinks
}: {
  socialLinks: DefaultTheme.SocialLink[];
}) => {
  return (
    <div
      className="social-links"
      flex=""
      items-center=""
      before="menu-item-before"
    >
      <div
        flex=""
        items-center=""
        w="9"
        h="9"
        transition="color duration-300"
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
  );
};

export function Nav(props: NavProps & ComponentPropsWithIsland) {
  const { beforeNavTitle, afterNavTitle } = props;
  const { siteData, pageType } = usePageData();
  const { pathname } = useLocation();
  const { items: sidebarItems } = useSidebarData(pathname);
  const hasSidebar = pageType === 'doc' && sidebarItems.length > 0;
  const hasAppearanceSwitch = siteData.appearance !== false;
  const localeData = useLocaleSiteData();
  const localeLanguages = Object.values(siteData.themeConfig.locales || {});
  const hasMultiLanguage = localeLanguages.length > 1;
  const translationMenuData = hasMultiLanguage
    ? {
        text: <Translator w="18px" h="18px" />,
        items: localeLanguages.map((item) => ({
          text: item.label,
          link: `/${item.lang}`
        })),
        activeIndex: localeLanguages.findIndex(
          (item) => item.lang === localeData.lang
        )
      }
    : null;
  const NavAppearance = () => {
    return (
      <div
        className="appearance"
        before="menu-item-before"
        display="none sm:flex"
        items-center="center"
      >
        <SwitchAppearance __island />
      </div>
    );
  };
  const NavMenu = ({ menuItems }: { menuItems: DefaultTheme.NavItem[] }) => {
    return (
      <div className="menu">
        {menuItems.map((item, index) =>
          'link' in item ? (
            <NavMenuSingleItem pathname={pathname} key={index} {...item} />
          ) : (
            <div m="x-3" last="mr-0" key={index}>
              <NavMenuGroup {...item} />
            </div>
          )
        )}
      </div>
    );
  };
  const menuItems = localeData.nav || [];
  const socialLinks = siteData?.themeConfig?.socialLinks || [];
  const hasSocialLinks = socialLinks.length > 0;
  const hasSearch = siteData?.themeConfig?.search !== false;

  const title =
    localeData.title ?? siteData.themeConfig.siteTitle ?? siteData.title;
  const rightNav = () => {
    return (
      <div className={styles.rightNav}>
        <NavMenu menuItems={menuItems} />
        {hasMultiLanguage && (
          <NavTranslations translationMenuData={translationMenuData!} />
        )}
        {hasAppearanceSwitch && <NavAppearance />}
        {hasSocialLinks && <NavSocialLinks socialLinks={socialLinks} />}
      </div>
    );
  };
  return (
    <header relative="" z="4" fixed="md:~" className="top-0 left-0" w="100%">
      <div
        relative=""
        p="l-8 sm:x-8"
        transition="background-color duration-500"
        className="divider-bottom md:border-b-transparent lg:border-b-transparent"
        nav-h="mobile lg:desktop"
      >
        <div
          flex=""
          justify="between"
          m="0 auto"
          nav-h="mobile lg:desktop"
          className={`${styles.container}  ${
            hasSidebar ? styles.hasSidebar : ''
          }`}
        >
          {beforeNavTitle}
          <NavBarTitle title={title} />
          {afterNavTitle}
          <div
            className={styles.content}
            flex="~ 1"
            justify="end"
            items-center=""
          >
            {hasSearch && (
              <div className="search" flex="sm:1" pl="sm:8">
                <Search
                  __island
                  langRoutePrefix={localeData.routePrefix || ''}
                />
              </div>
            )}
            {rightNav()}
            <NavHamburger
              localeData={localeData}
              siteData={siteData}
              pathname={pathname}
              __island
            />
          </div>
        </div>
      </div>
    </header>
  );
}
