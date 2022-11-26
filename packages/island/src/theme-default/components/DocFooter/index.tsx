import styles from './index.module.scss';
import { usePageData, normalizeHref } from '@runtime';
import { useEditLink, useLocaleSiteData, usePrevNextPage } from '../../logic';

export function DocFooter() {
  const { siteData, relativePagePath, lastUpdatedTime } = usePageData();
  const { prevPage, nextPage } = usePrevNextPage();
  const themeConfig = siteData.themeConfig;
  const {
    editLink: rawEditLink,
    lastUpdatedText,
    prevPageText = 'Previous Page',
    nextPageText = 'Next page'
  } = useLocaleSiteData();

  const editLink = useEditLink(
    rawEditLink! ?? themeConfig?.editLink,
    relativePagePath
  );

  return (
    <footer mt="8">
      <div className="xs:flex" p="b-5" justify="between" items-center="~">
        {editLink ? (
          <a
            flex="~"
            items-center=""
            leading-8=""
            font-medium="~"
            text="sm brand"
            hover="text-brand-dark"
            href={editLink.link}
            transition="color duration-300"
          >
            {editLink.text}
          </a>
        ) : null}

        <div
          flex=""
          text="sm text-2"
          leading-6="~"
          leading-8="sm:~"
          font-medium=""
        >
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

      <div
        flex="~ col sm:row"
        justify="sm:around"
        gap="2"
        divider-top=""
        pt="6"
      >
        <div flex="~ col" className={styles.prev}>
          {prevPage ? (
            <a href={normalizeHref(prevPage.link)} className={styles.pagerLink}>
              <span className={styles.desc}>{prevPageText}</span>
              <span className={styles.title}>{prevPage.text}</span>
            </a>
          ) : null}
        </div>
        <div flex="~ col" className={styles.next}>
          {nextPage ? (
            <a
              href={normalizeHref(nextPage.link)}
              className={`${styles.pagerLink} ${styles.next}`}
            >
              <span className={styles.desc}>{nextPageText}</span>
              <span className={styles.title}>{nextPage.text}</span>
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
