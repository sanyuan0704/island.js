import { LinkContent } from './LinkContent';
import { DefaultTheme } from 'shared/types';

interface IHiddenLinksProps {
  links: DefaultTheme.SocialLink[];
}

export const HiddenLinks = (props: IHiddenLinksProps) => {
  const { links } = props;

  return (
    <div
      absolute=""
      pos="top-13 right-0"
      p="3"
      w="26"
      border-1=""
      rounded="xl"
      bg="bg-default"
      style={{
        boxShadow: 'var(--island-shadow-3)',
        marginRight: '10px'
      }}
      flex="~ wrap"
      gap="2"
    >
      {links.map((item) => (
        <LinkContent
          key={item.icon}
          link={item}
          popperStyle={{ top: '1.25rem' }}
        />
      ))}
    </div>
  );
};
