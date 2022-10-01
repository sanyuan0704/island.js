import styles from './index.module.scss';
import { usePageData } from 'island/client';
import { useEditLink, useLocaleSiteData, usePrevNextPage } from '../../logic';
import { normalizeHref } from '../../logic/index';
import { useLocation } from 'react-router-dom';

export function DocFooter() {
  const { siteData, relativePagePath, lastUpdatedTime } = usePageData();
  const { prevPage, nextPage } = usePrevNextPage(siteData);
  const { pathname } = useLocation();
  const themeConfig = siteData.themeConfig;
  const {
    editLink: rawEditLink,
    lastUpdatedText,
    prevPageText = 'Previous Page',
    nextPageText = 'Next page'
  } = useLocaleSiteData(themeConfig, pathname);

  const editLink = useEditLink(
    rawEditLink! ?? themeConfig?.editLink,
    relativePagePath
  );

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
          {
            <>
              <p className={styles.lastUpdated}>
                {`${lastUpdatedText ?? 'Last Updated'}: `}
              </p>
              <span>{lastUpdatedTime}</span>
            </>
          }
        </div>
      </div>

      <div className={styles.prevNext}>
        <div className={styles.pager}>
          {prevPage ? (
            <a
              href={normalizeHref(prevPage.link)}
              className={`${styles.pagerLink} ${styles.prev}`}
            >
              <span className={styles.desc}>{prevPageText}</span>
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
                <span className={styles.desc}>{nextPageText}</span>
                <span className={styles.title}>{nextPage.text}</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
