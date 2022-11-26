import { Switch } from '../Switch';
import styles from './index.module.scss';
import SunSvg from '../../assets/sun.svg';
import MoonSvg from '../../assets/moon.svg';
import { ComponentPropsWithIsland } from '../@shared/types';
import { getToggle } from '../../logic/useAppearance';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwitchAppearance(_props: ComponentPropsWithIsland) {
  const toggle = getToggle();
  return (
    <Switch onClick={toggle}>
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}
