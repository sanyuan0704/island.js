import styles from './index.module.scss';

export function DocFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.editInfo}>
        <div className={styles.editLink}>
          <button className={styles.editLinkButton}>编辑链接</button>
        </div>
        <div className={styles.lastUpdated}>
          <p className={styles.lastUpdated}>最后更新时间: </p>
          <time>{123123123123}</time>
        </div>
      </div>

      <div className={styles.prevNext}>
        <div className={styles.pager}>
          <a href="/" className={`${styles.pagerLink} ${styles.prev}`}>
            <span className={styles.desc}>上一页</span>
            <span className={styles.title}>xxx</span>
          </a>
        </div>
        <div className={`${styles.pager} ${styles.hasNext}`}>
          <a href="/" className={`${styles.pagerLink} ${styles.next}`}>
            <span className={styles.desc}>下一页</span>
            <span className={styles.title}>xxx</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
