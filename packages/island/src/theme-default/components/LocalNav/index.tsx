import styles from './index.module.scss';
interface Props {
  openSidebar: () => void;
}
export function LocalNav(props: Props) {
  const { openSidebar } = props;
  return (
    <div className={styles.localNav}>
      <button
        flex="center"
        ml="4"
        onClick={openSidebar}
        className={styles.menu}
      >
        <div text="md" mr="2" className="i-carbon:menu"></div>
        <span text="md ">Menu</span>
      </button>
    </div>
  );
}
