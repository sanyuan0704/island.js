import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeatures/index';
import { Footer } from '../../components/HomeFooter/index';

export function HomeLayout() {
  return (
    <>
      <div className="pb-12">
        <HomeHero />
        <HomeFeature />
      </div>
      <Footer />
    </>
  );
}
