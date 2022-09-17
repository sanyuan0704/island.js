import styles from './index.module.scss';
import { usePageData } from 'island/client';

export function DocFooter() {
  const { siteData } = usePageData();
  const { editLink } = siteData?.themeConfig || {};
  return (
    <footer className={styles.footer}>
      <div className={styles.editInfo}>
        <div className={styles.editLink}>
          <button className={styles.editLinkButton}>Edit Link</button>
        </div>
        <div className={styles.lastUpdated}>
          {editLink ? (
            <>
              <p className={styles.lastUpdated}>
                {editLink?.text || 'Last Updated: '}
              </p>
              <span>{editLink?.pattern}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className={styles.prevNext}>
        <div className={styles.pager}>
          <a href="/" className={`${styles.pagerLink} ${styles.prev}`}>
            <span className={styles.desc}>Previous Page</span>
          </a>
        </div>
        <div className={`${styles.pager} ${styles.hasNext}`}>
          <a href="/" className={`${styles.pagerLink} ${styles.next}`}>
            <span className={styles.desc}>Next Page</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
