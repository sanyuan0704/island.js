import React from 'react';
import { SideBar } from '../../components/Siderbar/index';
import styles from './index.module.scss';
import { Content } from 'island:client/Content';
import { Aside } from '../../components/Aside/index';
import { DocFooter } from '../../components/DocFooter/index';
import { usePageData } from 'island:client/data';

console.log(usePageData());

export function DocLayout() {
  return (
    <div className={styles.doc}>
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={`${styles.content} ${styles.hasSidebar}`}>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <main className={styles.main}>
              <Content />
              <DocFooter />
            </main>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.asideCurtain} />
          <div className={styles.asideContainer}>
            <div className={styles.asideContent}>
              <Aside />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
