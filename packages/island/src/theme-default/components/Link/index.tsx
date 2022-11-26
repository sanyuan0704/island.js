import React from 'react';
import styles from './index.module.scss';
import { Link as RouterLink } from 'react-router-dom';
import { withBase } from '@runtime';
import { TARGET_BLANK_WHITE_LIST } from '@shared/constants';
import { inBrowser } from '@shared/utils';

export interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const EXTERNAL_URL_RE = /^(https?:)?\/\//;

export function Link(props: LinkProps) {
  const { href = '/', children, className = '' } = props;
  const isExternal = EXTERNAL_URL_RE.test(href);
  const isWhiteList = TARGET_BLANK_WHITE_LIST.some((item) =>
    href.startsWith(item)
  );
  const target = isExternal && !isWhiteList ? '_blank' : '';
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  const pathname = inBrowser() ? window.location.pathname : '';
  const withBaseUrl = isExternal ? href : withBase(href);
  if (import.meta.env.ENABLE_SPA && !isExternal) {
    return (
      <RouterLink
        className={`${styles.link} ${className}`}
        to={withBaseUrl}
        rel={rel}
        target={target}
        state={{ from: pathname }}
      >
        {children}
      </RouterLink>
    );
  } else {
    return (
      <a
        href={withBaseUrl}
        target={target}
        rel={rel}
        className={`${styles.link} ${className}`}
      >
        {children}
      </a>
    );
  }
}
