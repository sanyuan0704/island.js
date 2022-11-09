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
  const mouseEnter = () => {
    setMoreLinksVisible(true);
  };
  const mouseLeave = () => {
    setMoreLinksVisible(false);
  };

  return (
    <div
      className="social-links"
      h="100%"
      flex=""
      items-center=""
      before="menu-item-before"
      relative=""
      onMouseLeave={mouseLeave}
    >
      <ShownLinks
        links={shownLinks}
        moreIconVisible={moreThanThree}
        mouseEnter={mouseEnter}
      />
      {moreLinksVisible ? <HiddenLinks links={hiddenLinks} /> : null}
    </div>
  );
};
