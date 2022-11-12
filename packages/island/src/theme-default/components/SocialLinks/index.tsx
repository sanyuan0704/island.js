import { useState } from 'react';
import { DefaultTheme } from 'shared/types';
import type { ComponentPropsWithIsland } from 'shared/types';
import { ShownLinks } from './ShownLinks';
import { HiddenLinks } from './HiddenLinks';

export const SocialLinks = ({
  socialLinks
}: {
  socialLinks: DefaultTheme.SocialLink[];
} & ComponentPropsWithIsland) => {
  const moreThanThree = socialLinks.length > 3;

  const shownLinks = [];
  const hiddenLinks = [];
  for (const i in socialLinks) {
    if (i < 3) {
      shownLinks.push(socialLinks[i]);
    } else {
      hiddenLinks.push(socialLinks[i]);
    }
  }

  const [moreLinksVisible, setMoreLinksVisible] = useState(false);

  return (
    <div
      className="social-links"
      nav-h="mobile sm:desktop"
      flex=""
      items-center=""
      before="menu-item-before"
      relative=""
      onMouseLeave={() => setMoreLinksVisible(false)}
    >
      <ShownLinks
        links={shownLinks}
        moreIconVisible={moreThanThree}
        mouseEnter={() => setMoreLinksVisible(true)}
      />
      {moreLinksVisible ? <HiddenLinks links={hiddenLinks} /> : null}
    </div>
  );
};
