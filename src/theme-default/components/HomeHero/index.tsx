import { Button } from '../Button';
import styles from './index.module.scss';
import { Hero } from 'shared/types/index';

export function HomeHero({ hero }: { hero: Hero }) {
  const hasImage = hero.image !== undefined;
  return (
    <div m="auto" p="t-20 x-16 b-16">
      <div className="max-w-1152px" m="auto" flex="~">
        <div m="auto md:0" text="left" flex="~ col" className="max-w-592px">
          <h1 font="bold" text="6xl" className="max-w-576px">
            <span className={styles.clip}>{hero.name}</span>
          </h1>
          <p text="6xl" font="bold" className="max-w-576px">
            {hero.text}
          </p>
          <p
            p="t-3"
            text="2xl text-2"
            font="medium"
            className="whitespace-pre-wrap max-w-576px"
          >
            {hero.tagline}
          </p>
          <div flex="~ wrap" justify="start" m="-1.5" p="t-8">
            {hero.actions.map((action) => (
              <div p="1" flex="shrink-0" key={action.link}>
                <Button
                  type="a"
                  text={action.text}
                  href={action.link}
                  theme={action.theme}
                ></Button>
              </div>
            ))}
          </div>
        </div>

        {hasImage ? (
          <div w="max-96" h="max-96" flex="center" m="auto">
            <img src={hero.image?.src} alt={hero.image?.alt} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
