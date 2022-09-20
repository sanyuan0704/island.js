import { Switch } from '../Switch';
import React from 'react';
import styles from './index.module.scss';
import SunSvg from './sun.svg';
import MoonSvg from './moon.svg';
import { ComponentPropsWithIsland } from '../../../shared/types';
import { APPEARANCE_KEY } from '../../../shared/constants';

export function SwitchAppearance(_props: ComponentPropsWithIsland) {
  const handleClick = () => {
    const classList = document.documentElement.classList;
    if (classList.contains('dark')) {
      classList.remove('dark');
      localStorage.setItem(APPEARANCE_KEY, 'auto');
    } else {
      classList.add('dark');
      localStorage.setItem(APPEARANCE_KEY, 'dark');
    }
  };
  return (
    <Switch onClick={handleClick}>
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}
