import styles from './index.module.scss';
import { useEffect, useRef } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { DefaultTheme } from 'shared/types';
import {
  NavScreenMenuGroup,
  NavScreenMenuGroupItem
} from '../NavScreenMenuGroup/NavScreenMenuGroup';
import { NavMenuSingleItem } from '../Nav/NavMenuSingleItem';
import { SocialLinks } from '../SocialLinks';
import { SwitchAppearance } from '../SwitchAppearance/index';
import Translator from '../../assets/translator.svg';
import GithubSvg from '../../assets/github.svg';
import type { SiteData } from 'islandjs';

interface Props {
  isScreenOpen: boolean;
  localeData: DefaultTheme.LocaleConfig;
  siteData: SiteData<DefaultTheme.Config>;
  pathname: string;
}

const IconMap = {
  github: GithubSvg
};

const NavScreenTranslations = ({
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

export function NavScreen(props: Props) {
  const { isScreenOpen, localeData, siteData, pathname } = props;
  const screen = useRef<HTMLDivElement | null>(null);
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
  const NavScreenAppearance = () => {
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
  const NavScreenMenu = ({
    menuItems
  }: {
    menuItems: DefaultTheme.NavItem[];
  }) => {
    return (
      <div className={styles.navMenu}>
        {menuItems.map((item, index) => {
          return (
            <div key={index} w="100%" className={styles.navMenuItem}>
              {'link' in item ? (
                <NavMenuSingleItem pathname={pathname} key={index} {...item} />
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
  useEffect(() => {
    screen.current &&
      isScreenOpen &&
      disableBodyScroll(screen.current, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isScreenOpen]);
  return (
    <div
      className={`${styles.navScreen} ${isScreenOpen ? styles.active : ''}`}
      ref={screen}
      id="navScreen"
    >
      <div className={styles.container}>
        <NavScreenMenu menuItems={menuItems}></NavScreenMenu>
        <div
          className={styles.socialAndAppearance}
          flex="~"
          justify="center"
          items-center="center"
        >
          {hasAppearanceSwitch && <NavScreenAppearance />}
          {hasSocialLinks && <SocialLinks __island socialLinks={socialLinks} />}
        </div>
        {hasMultiLanguage && (
          <NavScreenTranslations translationMenuData={translationMenuData!} />
        )}
      </div>
    </div>
  );
}
