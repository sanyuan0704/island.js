import { Hero } from 'shared/types';
import styles from './index.module.scss';
import { Button } from '../Button/index';
export function HomeHero(props: { hero: Hero }) {
  const { hero } = props;
  return (
    <div m="auto" p="t-20 x-16 b-16">
      <div flex="~" className="max-w-1152px" m="auto">
        <div text="left" flex="~ col" className="max-w-592px">
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
          <div flex="~ wrap" justify="start" p="t-8">
            {hero.actions.map((action) => (
              <div key={action.link} p="1">
                <Button
                  type="a"
                  text={action.text}
                  href={action.link}
                  theme={action.theme}
                />
              </div>
            ))}
          </div>
        </div>
        {hero.image && (
          <div w="max-96" h="max-96" flex="center" m="auto">
            <img src={hero.image.src} alt={hero.image.alt} />
          </div>
        )}
      </div>
    </div>
  );
}
