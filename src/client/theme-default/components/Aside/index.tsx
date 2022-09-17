import { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { ComponentPropsWithIsland, Header } from 'shared/types/index';
import { useAsideAnchor } from '../../logic';

export function Aside(
  props: ComponentPropsWithIsland<{ headers: Header[]; pagePath: string }>
) {
  const [headers, setHeaders] = useState(props.headers || []);
  // For outline text highlight
  const markerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const prevActiveLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setHeaders(props.headers);
  }, [props.headers]);

  useEffect(() => {
    // Handle aside hmr:
    // When mdx file changed, server will send a custom event to client.
    // Then we listen the event and pull the latest page module so we can get and render the new headers.
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', () => {
        import(
          /* @vite-ignore */ `${props.pagePath}?import&t=${Date.now()}`
        ).then((mod) => {
          setHeaders(mod.toc);
        });
      });
    }
  }, [props.pagePath]);

  useAsideAnchor(prevActiveLinkRef, headers, asideRef, markerRef);

  const renderHeader = (header: Header) => {
    const isNested = header.depth > 2;
    return (
      <li key={header.text}>
        <a
          href={`#${header.id}`}
          className={`${styles.outlineLink}  ${isNested ? styles.nested : ''}`}
        >
          {header.text}
        </a>
      </li>
    );
  };

  return (
    <div className={styles.docAside}>
      <div className={styles.docsAsideOutline}>
        <div className={styles.content} ref={asideRef}>
          <div className={styles.outlineMarker} ref={markerRef}></div>
          <div className={styles.outlineTitle}>ON THIS PAGE</div>
          <nav>
            <ul className={styles.root}>{headers.map(renderHeader)}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
