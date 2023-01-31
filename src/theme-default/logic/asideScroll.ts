import { throttle } from 'lodash-es';

const NAV_HEIGHT = 56;
let links: HTMLAnchorElement[] = [];

export function scrollToTarget(target: HTMLElement, isSmooth: boolean) {
  const targetPadding = parseInt(
    window.getComputedStyle(target).paddingTop,
    10
  );

  const targetTop =
    window.scrollY +
    target.getBoundingClientRect().top -
    NAV_HEIGHT +
    targetPadding;
  // Only scroll smoothly in page header anchor
  window.scrollTo({
    left: 0,
    top: targetTop,
    ...(isSmooth ? { behavior: 'smooth' } : {})
  });
}

// Binding the scroll event to the aside element
export function bindingAsideScroll() {
  function isBottom() {
    return (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight
    );
  }
  const marker = document.getElementById('aside-marker');
  const aside = document.getElementById('aside-container');
  if (!aside) {
    return;
  }

  let prevActiveLink: null | HTMLAnchorElement = null;
  const headers = Array.from(aside?.getElementsByTagName('a') || []).map(
    (item) => decodeURIComponent(item.hash)
  );
  if (marker && !headers.length) {
    marker.style.opacity = '0';
    return;
  }
  // Util function to set dom ref after determining the active link
  const activate = (links: HTMLAnchorElement[], index: number) => {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('aside-active');
    }
    if (links[index]) {
      links[index].classList.add('aside-active');
      const id = links[index].getAttribute('href');
      const tocIndex = headers.findIndex((item) => item === id);
      const currentLink = aside?.querySelector(`a[href="#${id?.slice(1)}"]`);
      if (currentLink) {
        prevActiveLink = currentLink as HTMLAnchorElement;
        // Activate the a link element in aside
        prevActiveLink.classList.add('aside-active');
        // Activate the marker element
        marker!.style.top = `${33 + tocIndex * 28}px`;
        marker!.style.opacity = '1';
      }
    }
  };
  const setActiveLink = () => {
    // Get all links
    links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.island-doc .header-anchor')
    ).filter((item) => item.parentElement?.tagName !== 'H1');
    if (isBottom()) {
      activate(links, links.length - 1);
    } else {
      // Compute current index
      for (let i = 0; i < links.length; i++) {
        const currentAnchor = links[i];
        const nextAnchor = links[i + 1];
        const scrollTop = Math.ceil(window.scrollY);
        const currentAnchorTop =
          currentAnchor.parentElement!.offsetTop - NAV_HEIGHT;
        if ((i === 0 && scrollTop < currentAnchorTop) || scrollTop === 0) {
          activate(links, 0);
          break;
        }

        if (!nextAnchor) {
          activate(links, i);
          break;
        }

        const nextAnchorTop = nextAnchor.parentElement!.offsetTop - NAV_HEIGHT;

        if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
          activate(links, i);
          break;
        }
      }
    }
  };
  const throttledSetLink = throttle(setActiveLink, 200);

  window.addEventListener('scroll', throttledSetLink);

  // eslint-disable-next-line consistent-return
  return () => {
    window.removeEventListener('scroll', throttledSetLink);
  };
}
