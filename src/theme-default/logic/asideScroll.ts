import { throttle } from 'lodash-es';

let links: HTMLAnchorElement[] = [];

const NAV_HEIGHT = 56;

export function scrollToTarget(target: HTMLElement, isSmooth: boolean) {
  const targetPadding = parseInt(
    window.getComputedStyle(target).paddingTop,
    10
  );
  const targetTop =
    window.scrollY +
    target.getBoundingClientRect().top +
    targetPadding -
    NAV_HEIGHT;
  window.scrollTo({
    left: 0,
    top: targetTop,
    behavior: isSmooth ? 'smooth' : 'auto'
  });
}

export function bindingAsideScroll() {
  const marker = document.getElementById('aside-marker');
  const aside = document.getElementById('aside-container');
  const headers = Array.from(aside?.getElementsByTagName('a') || []).map(
    (item) => decodeURIComponent(item.hash)
  );
  if (!aside) {
    return;
  }

  const activate = (links: HTMLAnchorElement[], index: number) => {
    if (links[index]) {
      const id = links[index].getAttribute('href');
      const tocIndex = headers.findIndex((item) => item === id);
      const currentLink = aside?.querySelector(`a[href="#${id.slice(1)}"]`);
      if (currentLink) {
        marker.style.top = `${33 + tocIndex * 28}px`;
        marker.style.opacity = '1';
      }
    }
  };

  const setActiveLink = () => {
    links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.island-doc .header-anchor')
    ).filter((item) => item.parentElement?.tagName !== 'H1');

    const isBottom =
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight;

    if (isBottom) {
      activate(links, links.length - 1);
      return;
    }

    for (let i = 0; i < links.length; i++) {
      const currentAnchor = links[i];
      const nextAnchor = links[i + 1];
      const scrollTop = Math.ceil(window.scrollY);
      const currentAnchorTop =
        currentAnchor.parentElement.offsetTop - NAV_HEIGHT;

      if (!nextAnchor) {
        activate(links, i);
        break;
      }

      if ((i === 0 && scrollTop < currentAnchorTop) || scrollTop == 0) {
        activate(links, 0);
        break;
      }

      const nextAnchorTop = nextAnchor.parentElement.offsetTop - NAV_HEIGHT;
      if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
        activate(links, i);
        break;
      }
    }
  };

  const throttledSetActiveLink = throttle(setActiveLink, 100);

  window.addEventListener('scroll', throttledSetActiveLink);

  return () => {
    window.removeEventListener('scroll', throttledSetActiveLink);
  };
}
