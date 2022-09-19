import styles from './index.module.scss';
import { usePageData } from 'island/client';
import { usePrevNextPage } from '../../logic';

export function DocFooter() {
  const { siteData } = usePageData();
  const { prevPage, nextPage } = usePrevNextPage(siteData);
  const { editLink } = siteData?.themeConfig || {};
  return (
    <footer className={styles.footer}>
      <div className={styles.editInfo}>
        <div className={styles.editLink}>
          <a className={styles.editLinkButton} href={editLink?.pattern}>
            {editLink?.text}
          </a>
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
          {prevPage ? (
            <a
              href={prevPage.link}
              className={`${styles.pagerLink} ${styles.prev}`}
            >
              <span className={styles.desc}>Previous Page</span>
              <span className={styles.title}>{prevPage.text}</span>
            </a>
          ) : null}
        </div>
        <div className={styles.pager}>
          {nextPage ? (
            <div className={`${styles.hasNext}`}>
              <a
                href={nextPage.link}
                className={`${styles.pagerLink} ${styles.next}`}
              >
                <span className={styles.desc}>Next Page</span>
                <span className={styles.title}>{nextPage.text}</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
