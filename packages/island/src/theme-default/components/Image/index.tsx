import React from 'react';
import { DefaultTheme } from 'shared/types/default-theme';
import styles from './index.module.scss';
import { withBase } from '@runtime';

interface ImageProps {
  image: DefaultTheme.Image;
  alt?: string;
  width?: string;
  height: string;
}

export function Image(props: ImageProps) {
  const { image, alt, width, height } = props;

  return React.createElement('img', {
    className: styles.image,
    src: withBase(typeof image === 'string' ? image : image.src),
    alt: alt ?? (typeof image === 'string' ? '' : image.alt || ''),
    width,
    height
  });
}
