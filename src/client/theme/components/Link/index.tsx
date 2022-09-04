import React from 'react';
import styles from './index.module.scss';

interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

const EXTERNAL_URL_RE = /^(https?:)?\/\//;

export function Link(props: LinkProps) {
  const { href = '/', children } = props;
  const isExternal = EXTERNAL_URL_RE.test(href);
  const target = isExternal ? '_blank' : '_self';
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  return (
    <a href={href} target={target} rel={rel} className={styles.link}>
      {children}
    </a>
  );
}
