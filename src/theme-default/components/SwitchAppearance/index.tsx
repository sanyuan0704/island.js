import { Switch } from '../Switch';
import styles from './index.module.scss';
import SunSvg from './sun.svg';
import MoonSvg from './moon.svg';
import { ComponentPropsWithIsland } from '../../../shared/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwitchAppearance(_props: ComponentPropsWithIsland) {
  return (
    <Switch id="appearance">
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}
