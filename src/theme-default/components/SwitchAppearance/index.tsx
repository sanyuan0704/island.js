import { Switch } from '../Switch';
import React from 'react';
import styles from './index.module.scss';
import SunSvg from './sun.svg';
import MoonSvg from './moon.svg';
import { ComponentPropsWithIsland } from '../../../shared/types';
import { useAppearance } from '../../logic';

export function SwitchAppearance(_props: ComponentPropsWithIsland) {
  const handleClick = useAppearance();
  return (
    <Switch onClick={handleClick}>
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}
