import styles from './index.module.scss';
import { usePageData } from 'island/client';
import { useEditLink, usePrevNextPage, useLastUpdated } from '../../logic';
import { normalizeHref } from '../../logic';
import { useEffect } from 'react';

export function DocFooter() {
  const { siteData, relativePagePath, lastUpdatedTimeStamp, pagePath } =
    usePageData();
  const { prevPage, nextPage } = usePrevNextPage(siteData);
  const { editLink: rawEditLink, lastUpdatedText } = siteData.themeConfig;
  const editLink = useEditLink(rawEditLink!, relativePagePath);
  const [lastUpdated, setLastUpdated] = useLastUpdated(lastUpdatedTimeStamp);
  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath, timeStamp }) => {
        if (filePath !== pagePath) {
          return;
        }
        if (timeStamp) {
          setLastUpdated(timeStamp);
        }
      });
    }
  }, [pagePath, setLastUpdated]);
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

        <div className={styles.lastUpdated}>
          {lastUpdated ? (
            <>{`${lastUpdatedText || 'Last Updated: '}${lastUpdated}`}</>
          ) : null}
        </div>
      </div>

      <div className={styles.prevNext}>
        <div className={styles.pager}>
          {prevPage ? (
            <a
              href={normalizeHref(prevPage.link)}
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
                href={normalizeHref(nextPage.link)}
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
