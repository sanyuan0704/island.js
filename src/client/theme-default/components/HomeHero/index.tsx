import { usePageData } from 'island/client';
import { Button } from '../Button';
import styles from './index.module.scss';
import logo from './island.png';

export function HomeHero() {
  const { hero } = usePageData();
  return (
    <div className={`${styles.hero} ${styles.hasImage}`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.name}>
            <span className={styles.clip}>{hero.name}</span>
          </h1>
          <p className={styles.text}>{hero.text}</p>
          <p className={styles.tagline}>{hero.tagline}</p>
          <div className={styles.actions}>
            {hero.actions.map((action) => (
              <div className={styles.action}>
                <Button
                  type="a"
                  text={action.text}
                  href={action.link}
                  theme={action.theme}
                ></Button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.imageContainer}>
            <div className={styles.imageBg} />
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
