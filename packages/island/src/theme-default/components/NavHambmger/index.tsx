import styles from './index.module.scss';
import type { ComponentPropsWithIsland } from 'islandjs';
interface Props {
  toggleScreen?: () => void;
  isScreenOpen?: boolean;
}
export function NavHamburger(props: Props & ComponentPropsWithIsland) {
  const { toggleScreen, isScreenOpen } = props;
  return (
    <button
      onClick={toggleScreen}
      className={`${isScreenOpen ? styles.active : ''} ${styles.navHamburger}`}
    >
      <span className={styles.container}>
        <span className={styles.top} />
        <span className={styles.middle} />
        <span className={styles.bottom} />
      </span>
    </button>
  );
}
