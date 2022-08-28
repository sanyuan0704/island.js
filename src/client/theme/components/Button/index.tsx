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
  const { type = 'button', theme = 'brand', size = 'big', href = '/' } = props;
  return React.createElement(
    type,
    {
      className: `${styles.VPButton} ${styles[theme]} ${styles[size]}`,
      href
    },
    props.text
  );
}
