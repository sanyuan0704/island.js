import React from 'react';
import styles from './index.module.scss';
import { Button } from '../../components/Button';
import logo from './island.png';
export function HomeLayout() {
  return (
    <div className={`${styles.VPHero} ${styles['has-image']}`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.name}>
            <span className={styles.clip}>Island</span>
          </h1>
          <p className={styles.text}>下一代 SSG 框架</p>
          <p className={styles.tagline}>提供极致的渲染性能</p>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button type="a" text="点击开始" href="/"></Button>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles['image-container']}>
            <div className={styles['image-bg']} />
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
