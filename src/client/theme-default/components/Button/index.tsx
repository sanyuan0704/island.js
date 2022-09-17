import { Link } from '../Link';
import React from 'react';
import styles from './index.module.scss';

interface ButtonProps {
  type?: string;
  size?: 'medium' | 'big';
  theme?: 'brand' | 'alt';
  text: string;
  href?: string;
}

export function Button(props: ButtonProps) {
  const { theme = 'brand', size = 'big', href = '/' } = props;
  let type: string | typeof Link | null = null;

  if (props.type === 'button') {
    type = 'button';
  } else if (props.type === 'a') {
    // Will be tree shaking in production in island mode.
    if (import.meta.env.ENABLE_SPA) {
      type = Link;
    } else {
      type = 'a';
    }
  }

  return React.createElement(
    type ?? 'a',
    {
      className: `${styles.button} ${styles[theme]} ${styles[size]}`,
      href: href
    },
    props.text
  );
}
