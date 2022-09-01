import React from 'react';
import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeatures/index';
import styles from './index.module.scss';

export function HomeLayout() {
  return (
    <div>
      <HomeHero />
      <HomeFeature features={[]} />
    </div>
  );
}
