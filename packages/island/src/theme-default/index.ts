import './styles/base.css';
import './styles/vars.css';
import './styles/doc.css';
import 'uno.css';
import { NotFoundLayout } from './layout/NotFountLayout/index';
import { Layout } from './layout/Layout';
import { HomeLayout } from './layout/HomeLayout/index';
import { setup } from './logic';
// Tree Shaking
export { Layout, NotFoundLayout, HomeLayout, setup };

export default {
  Layout,
  NotFoundLayout,
  HomeLayout,
  setup
};
