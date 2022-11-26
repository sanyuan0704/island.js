import { DefaultTheme } from 'shared/types';
import { normalizeHref } from '@runtime';
import { Link } from '../Link/index';

interface Props {
  pathname: string;
}

export function NavMenuSingleItem(item: DefaultTheme.NavItemWithLink & Props) {
  const { pathname } = item;
  const isActive = new RegExp(item.activeMatch || item.link).test(pathname);
  return (
    <div
      key={item.text}
      text="sm"
      font="medium"
      m="x-3"
      className={`${isActive ? 'text-brand' : ''}`}
    >
      <Link href={normalizeHref(item.link)}>{item.text}</Link>
    </div>
  );
}
