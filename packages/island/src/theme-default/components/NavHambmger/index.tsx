import styles from './index.module.scss';
import type { ComponentPropsWithIsland, SiteData } from 'islandjs';
import { Fragment } from 'react';
import { NavScreen } from '../NavScreen';
import { DefaultTheme } from 'shared/types';
import { useNav } from '../../logic/useNav';

interface Props {
  localeData: DefaultTheme.LocaleConfig;
  siteData: SiteData<DefaultTheme.Config>;
  pathname: string;
}

export function NavHamburger(props: Props & ComponentPropsWithIsland) {
  const { localeData, siteData, pathname } = props;
  const { isScreenOpen, toggleScreen } = useNav();
  return (
    <Fragment>
      <button
        onClick={toggleScreen}
        className={`${isScreenOpen ? styles.active : ''} ${
          styles.navHamburger
        }`}
      >
        <span className={styles.container}>
          <span className={styles.top} />
          <span className={styles.middle} />
          <span className={styles.bottom} />
        </span>
      </button>
      <NavScreen
        isScreenOpen={isScreenOpen}
        localeData={localeData}
        siteData={siteData}
        pathname={pathname}
      ></NavScreen>
    </Fragment>
  );
}
