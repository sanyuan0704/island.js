import { usePageData } from 'island/client';
import styles from './index.module.scss';

export function NotFoundLayout() {
  const { siteData } = usePageData();
  return (
    <div className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>PAGE NOT FOUND</h1>
      <div className={styles.divider} />

      <div className={styles.action}>
        <a className={styles.link} href={siteData.base} aria-label="go to home">
          Take me home
        </a>
      </div>
    </div>
  );
}
