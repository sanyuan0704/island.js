import React from 'react';
import styles from './index.module.scss';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

const EXTERNAL_URL_RE = /^(https?:)?\/\//;

export function Link(props: LinkProps) {
  const { href = '/', children } = props;
  const isExternal = EXTERNAL_URL_RE.test(href);
  const target = isExternal ? '_blank' : '';
  const rel = isExternal ? 'noopener noreferrer' : undefined;

  if (import.meta.env.ENABLE_SPA && !isExternal) {
    return (
      <div className={styles.link}>
        <RouterLink to={href} rel={rel} target={target}>
          {children}
        </RouterLink>
      </div>
    );
  } else {
    return (
      <a href={href} target={target} rel={rel} className={styles.link}>
        {children}
      </a>
    );
  }
}
