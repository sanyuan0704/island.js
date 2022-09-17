import React from 'react';
import styles from './index.module.scss';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}
export function Switch(props: Props) {
  return (
    <button
      className={styles.switch}
      type="button"
      role="switch"
      onClick={props.onClick}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  );
}
