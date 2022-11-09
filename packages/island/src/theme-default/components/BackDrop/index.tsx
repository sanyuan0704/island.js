import styles from './index.module.scss';
import type { ComponentPropsWithIsland } from 'islandjs';

interface Props {
  closeSidebar: () => void;
  isOpen: boolean;
}

export function BackDrop(props: Props & ComponentPropsWithIsland) {
  const { closeSidebar, isOpen } = props;
  return isOpen ? (
    <div onClick={closeSidebar} className={styles.backDrop} />
  ) : null;
}
