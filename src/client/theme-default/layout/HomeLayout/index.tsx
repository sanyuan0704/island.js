import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeatures/index';
import { Footer } from '../../components/HomeFooter/index';

export function HomeLayout() {
  return (
    <div>
      <HomeHero />
      <HomeFeature />
      <Footer />
    </div>
  );
}
