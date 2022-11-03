import styles from './index.module.scss';
import { useLocaleSiteData } from '../../logic';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { DefaultTheme } from 'shared/types';
import { usePageData } from '@client';
import {
  NavScreenMenuGroup,
  NavScreenMenuGroupItem
} from '../NavScreenMenuGroup/NavScreenMenuGroup';

import { NavMenuSingleItem } from '../Nav/NavMenuSingleItem';
import { SwitchAppearance } from '../SwitchAppearance/index';
import Translator from '../../assets/translator.svg';
import GithubSvg from '../../assets/github.svg';
import { useEffect } from 'react';
const IconMap = {
  github: GithubSvg
};

const NavMenu = ({ menuItems }: { menuItems: DefaultTheme.NavItem[] }) => {
  return (
    <div className={styles.navMenu}>
      {menuItems.map((item, index) => {
        return (
          <div key={index} w="100%" className={styles.navMenuItem}>
            {'link' in item ? (
              <NavMenuSingleItem key={index} {...item} />
            ) : (
              <div m="x-3" last="mr-0" key={index}>
                <NavScreenMenuGroup {...item} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
const NavTranslations = ({
  translationMenuData
}: {
  translationMenuData: NavScreenMenuGroupItem;
}) => {
  return (
    <div
      className={styles.navTranslations}
      flex="~"
      text="sm"
      font="bold"
      justify="center"
    >
      <div m="x-1.5">
        <NavScreenMenuGroup {...translationMenuData!} />
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
const NavAppearance = () => {
  return (
    <div
      className={`items-center appearance pa-2 ${styles.navAppearance}`}
      flex="~"
      justify="center"
    >
      <SwitchAppearance />
    </div>
  );
};
export function NavScreen() {
  const localeData = useLocaleSiteData();
  const { siteData } = usePageData();
  const localeLanguages = Object.values(siteData.themeConfig.locales || {});
  const hasMultiLanguage = localeLanguages.length > 1;
  const menuItems = localeData.nav || [];
  const socialLinks = siteData?.themeConfig?.socialLinks || [];
  const hasAppearanceSwitch = siteData.appearance !== false;
  const hasSocialLinks = socialLinks.length > 0;
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
  useEffect(() => {
    const screen = document.getElementById('navScreen');
    console.log(screen);
    screen && disableBodyScroll(screen, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);
  return (
    <div className={styles.navScreen} id="navScreen">
      <div className={styles.container}>
        <NavMenu menuItems={menuItems}></NavMenu>
        <div
          className={styles.socialAndAppearance}
          flex="~"
          justify="center"
          items-center="center"
        >
          {hasAppearanceSwitch && <NavAppearance />}
          {hasSocialLinks && <NavSocialLinks socialLinks={socialLinks} />}
        </div>
        {hasMultiLanguage && (
          <NavTranslations translationMenuData={translationMenuData!} />
        )}
      </div>
    </div>
  );
}
