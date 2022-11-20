import { useState } from 'react';
import styles from './index.module.scss';
import presetIcons from './presetIcons';

interface ILinkContentComp {
  link: DefaultTheme.SocialLink;
  popperStyle?: Record<string, unknown>;
}

export const LinkContent = (props: ILinkContentComp) => {
  const { link, popperStyle = {} } = props;
  const { icon, mode = 'link', content } = link;
  const IconComp =
    typeof icon === 'object' ? (
      <div dangerouslySetInnerHTML={{ __html: icon.svg }}></div>
    ) : (
      presetIcons[icon as keyof typeof presetIcons]
    );

  const [contentVisible, setContentVisible] = useState(false);
  const mouseEnterIcon = () => {
    setContentVisible(true);
  };
  const mouseLeavePopper = () => {
    setContentVisible(false);
  };

  if (mode === 'link') {
    return (
      <a key={icon} href={content} target="_blank" rel="noopener noreferrer">
        <div className={`${styles.socialLinksIcon}`}>{IconComp}</div>
      </a>
    );
  }
  if (mode === 'text') {
    return (
      <div
        className={`${styles.socialLinksIcon}`}
        cursor="pointer"
        relative=""
        onMouseEnter={mouseEnterIcon}
        onMouseLeave={mouseLeavePopper}
      >
        {IconComp}
        {contentVisible ? (
          <div
            absolute=""
            z="1"
            p="3"
            w="50"
            break="all"
            pos="right-0"
            border-1=""
            rounded="xl"
            bg="bg-default"
            style={{
              boxShadow: 'var(--island-shadow-3)',
              ...popperStyle
            }}
          >
            <div text="ml">{content}</div>
          </div>
        ) : null}
      </div>
    );
  }
  if (mode === 'img') {
    return (
      <div
        className={`${styles.socialLinksIcon}`}
        cursor="pointer"
        relative=""
        onMouseEnter={mouseEnterIcon}
        onMouseLeave={mouseLeavePopper}
      >
        {IconComp}
        {contentVisible ? (
          <div
            absolute=""
            z="1"
            p="3"
            w="50"
            break="all"
            pos="right-0"
            border-1=""
            rounded="xl"
            bg="bg-default"
            style={{
              boxShadow: 'var(--island-shadow-3)',
              ...popperStyle
            }}
          >
            <img src={content} alt="img" />
          </div>
        ) : null}
      </div>
    );
  }

  return;
};
