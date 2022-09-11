import React from 'react';
import styles from './index.module.scss';

interface Feature {
  icon: string;
  title: string;
  detail: string;
}

const getGridClass = (count: number) => {
  if (!count) {
    return '';
  } else if (count === 2) {
    return 'grid-2';
  } else if (count === 3) {
    return 'grid-3';
  } else if (count % 3 === 0) {
    return 'grid-4';
  } else if (count % 2 === 0) {
    return 'grid-6';
  }
};

export function HomeFeature(props: { features: Feature[] }) {
  const features: Feature[] = [
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    },
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    },
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    },
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    },
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    },
    {
      icon: '⚡️',
      title: '极速渲染',
      detail: '基于孤岛架构，拥有极致的渲染性能'
    }
  ];
  const gridClass = getGridClass(features.length);
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.items}>
          {features.map((feature) => {
            const { icon, title, detail } = feature;
            return (
              <div
                key={title}
                className={`${styles.item}  ${
                  gridClass ? styles[gridClass] : ''
                }`}
              >
                <article key={title} className={`${styles.feature}`}>
                  <div className={styles.icon}>{icon}</div>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.detail}>{detail}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
