import { Layout } from '../theme-default';
import siteData from 'island:site-data';

export function App() {
  console.log('站点数据:', siteData);
  return <Layout />;
}
