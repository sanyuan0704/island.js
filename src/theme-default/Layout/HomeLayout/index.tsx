import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeature';
import { usePageData } from '@runtime';

export interface HomeLayoutProps {
  beforeHero?: React.ReactNode;
  afterHero?: React.ReactNode;
  beforeFeatures?: React.ReactNode;
  afterFeatures?: React.ReactNode;
}

export function HomeLayout() {
  const { frontmatter } = usePageData();
  const { hero, features } = frontmatter;
  return (
    <div className="py-6">
      <HomeHero hero={hero} />
      <HomeFeature features={features} />
    </div>
  );
}
