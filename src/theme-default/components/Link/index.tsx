import React from 'react';
import styles from './index.module.scss';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const EXTERNAL_URL_RE = /^(https?:)?\/\//;

const WHITE_LIST = [
  'https://island-tutorial.sanyuan0704.top',
  'https://island.sanyuan0704.top'
];

export function Link(props: LinkProps) {
  const { href = '/', children, className = '' } = props;
  const isExternal = EXTERNAL_URL_RE.test(href);
  const isWhiteList = WHITE_LIST.some((item) => href.startsWith(item));
  const target = isExternal && !isWhiteList ? '_blank' : '';
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  if (import.meta.env.ENABLE_SPA && !isExternal) {
    return (
      <RouterLink
        className={`${styles.link} ${className}`}
        to={href}
        rel={rel}
        target={target}
      >
        {children}
      </RouterLink>
    );
  } else {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${styles.link} ${className}`}
      >
        {children}
      </a>
    );
  }
}
