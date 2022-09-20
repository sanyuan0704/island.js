import styles from './index.module.scss';
import { usePageData } from 'island/client';

export function Footer() {
  const { siteData } = usePageData();
  const { message, copyright } = siteData.themeConfig.footer || {};
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {message && <div className={styles.message}>{message}</div>}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    </footer>
  );
}
