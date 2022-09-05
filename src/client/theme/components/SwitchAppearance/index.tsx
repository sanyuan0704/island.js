import { Switch } from '../Switch';
import React from 'react';
import styles from './index.module.scss';
import SunSvg from './sun.svg';
import MoonSvg from './moon.svg';

export function SwitchAppearance(props: { __island?: boolean }) {
  const handleClick = () => {
    const classList = document.documentElement.classList;
    if (classList.contains('dark')) {
      classList.remove('dark');
    } else {
      classList.add('dark');
    }
  };
  return (
    <Switch onClick={handleClick}>
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}
