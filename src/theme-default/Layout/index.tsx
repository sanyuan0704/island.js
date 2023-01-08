import { usePageData } from '../../runtime';
import 'uno.css';

export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <div>Home 页面</div>;
    } else if (pageType === 'doc') {
      return <div>正文页面</div>;
    } else {
      return <div>404 页面</div>;
    }
  };
  return <div>{getContent()}</div>;
}
