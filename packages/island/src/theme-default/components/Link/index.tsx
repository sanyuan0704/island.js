import React from 'react';
import styles from './index.module.scss';
import {
  matchRoutes,
  normalizeRoutePath,
  useNavigate,
  withBase
} from '@runtime';
import { TARGET_BLANK_WHITE_LIST } from '@shared/constants';
import { EXTERNAL_URL_RE } from '@shared/constants';
import nprogress from 'nprogress';
import { routes } from 'virtual:routes';
import { Route } from 'node/plugin-routes';

export interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

nprogress.configure({ showSpinner: false });

export function Link(props: LinkProps) {
  const { href = '/', children, className = '' } = props;
  const isExternal = EXTERNAL_URL_RE.test(href);
  const isWhiteList = TARGET_BLANK_WHITE_LIST.some((item) =>
    href.startsWith(item)
  );
  const target = isExternal && !isWhiteList ? '_blank' : '';
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  const withBaseUrl = isExternal ? href : withBase(href);
  const navigate = useNavigate();

  const handleNavigate = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const matchedRoutes = matchRoutes(routes, normalizeRoutePath(withBaseUrl));
    if (matchedRoutes?.length) {
      const timer = setTimeout(() => {
        nprogress.start();
      }, 200);
      await (matchedRoutes[0].route as Route).preload();
      clearTimeout(timer);
      nprogress.done();
    }
    navigate(withBaseUrl, { replace: false });
  };
  if (import.meta.env.ENABLE_SPA && !isExternal) {
    return (
      <a
        className={`${styles.link} ${className}`}
        rel={rel}
        target={target}
        onClick={handleNavigate}
        cursor="pointer"
      >
        {children}
      </a>
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
