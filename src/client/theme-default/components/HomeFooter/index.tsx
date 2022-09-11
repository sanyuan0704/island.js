import React from 'react';
import styles from './index.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.message}>Released under the MIT License.</p>
        <p className={styles.copyright}>Copyright © 2022-present Sanyuan0704</p>
      </div>
    </footer>
  );
}
