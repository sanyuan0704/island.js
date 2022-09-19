import styles from './index.module.scss';
import { usePageData } from 'island/client';
import { useEditLink, usePrevNextPage } from '../../logic';

export function DocFooter() {
  const { siteData, relativePagePath } = usePageData();
  const { prevPage, nextPage } = usePrevNextPage(siteData);
  const { editLink: rawEditLink } = siteData.themeConfig;
  const editLink = useEditLink(rawEditLink!, relativePagePath);

  return (
    <footer className={styles.footer}>
      <div className={styles.editInfo}>
        {editLink ? (
          <div className={styles.editLink}>
            <a className={styles.editLinkButton} href={editLink.link}>
              {editLink.text}
            </a>
          </div>
        ) : null}

        {/* TODO */}
        {/* <div className={styles.lastUpdated}>
          {lastUpdatedText ? (
            <>
              <p className={styles.lastUpdated}>
                {editLink?.text || 'Last Updated: '}
              </p>
              <span>{}</span>
            </>
          ) : null}
        </div> */}
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
