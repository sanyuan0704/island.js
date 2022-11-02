import styles from './index.module.scss';
interface Props {
  toggleScreen?: () => void;
  isScreenOpen?: boolean;
}
export function NavHamburger(props: Props) {
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
