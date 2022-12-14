import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeatures/index';
import { Footer } from '../../components/HomeFooter/index';

export interface HomeLayoutProps {
  beforeHero?: React.ReactNode;
  afterHero?: React.ReactNode;
  beforeFeatures?: React.ReactNode;
  afterFeatures?: React.ReactNode;
}

export function HomeLayout(props: HomeLayoutProps) {
  const { beforeHero, afterHero, beforeFeatures, afterFeatures } = props;
  return (
    <>
      <div className="pb-12">
        {beforeHero}
        <HomeHero />
        {afterHero}
        {beforeFeatures}
        <HomeFeature />
        {afterFeatures}
      </div>
      <Footer />
    </>
  );
}
