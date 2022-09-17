import styles from './index.module.scss';
import { usePageData } from 'island/client';

const getGridClass = (count?: number) => {
  if (!count) {
    return '';
  } else if (count === 2) {
    return 'grid2';
  } else if (count === 3) {
    return 'grid3';
  } else if (count % 3 === 0) {
    return 'grid4';
  } else if (count % 2 === 0) {
    return 'grid6';
  }
};

export function HomeFeature() {
  const { features } = usePageData();
  const gridClass = getGridClass(features?.length);
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.items}>
          {features?.map((feature) => {
            const { icon, title, details } = feature;
            return (
              <div
                key={title}
                className={`${styles.item} ${
                  gridClass ? styles[gridClass] : ''
                }`}
              >
                <article key={title} className={styles.feature}>
                  <div className={styles.icon}>{icon}</div>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.detail}>{details}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
