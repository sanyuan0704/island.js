import { useLocation } from 'react-router-dom';
import { DefaultTheme } from 'shared/types';
import { normalizeHref } from '../../logic';
import { Link } from '../Link/index';

export function NavMenuSingleItem(item: DefaultTheme.NavItemWithLink) {
  const location = useLocation();
  const isActive = new RegExp(item.activeMatch || '').test(location.pathname);
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
