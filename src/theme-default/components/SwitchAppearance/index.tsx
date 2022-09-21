import { Switch } from '../Switch';
import { useEffect } from 'react';
import styles from './index.module.scss';
import SunSvg from './sun.svg';
import MoonSvg from './moon.svg';
import { ComponentPropsWithIsland } from '../../../shared/types';
import { inBrowser } from '../../../runtime/utils';

export function SwitchAppearance(_props: ComponentPropsWithIsland) {
  useEffect(() => {
    applyDefaultAppearance();
  }, []);

  const handleClick = () => {
    const classList = document.documentElement.classList;
    if (classList.contains('dark')) {
      classList.remove('dark');
      localStorage.setItem('ISLAND-COLOR-SCHEME', 'light');
    } else {
      classList.add('dark');
      localStorage.setItem('ISLAND-COLOR-SCHEME', 'dark');
    }
  };
  return (
    <Switch onClick={handleClick}>
      <SunSvg className={styles.sun}></SunSvg>
      <MoonSvg className={styles.moon}></MoonSvg>
    </Switch>
  );
}

function applyDefaultAppearance() {
  if (!inBrowser) return;
  const perfersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const localSetting = localStorage.getItem('ISLAND-COLOR-SCHEME');
  if ((perfersDark && localSetting !== 'light') || localSetting === 'dark')
    document.documentElement.classList.add('dark');
}
