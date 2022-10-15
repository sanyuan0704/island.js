import './styles/base.css';
import './styles/vars.css';
import './styles/doc.css';
import 'uno.css';
import 'virtual:custom-styles';
import { NotFoundLayout } from './layout/NotFountLayout/index';
import { Layout } from './layout/Layout';
import { HomeLayout } from './layout/HomeLayout/index';

// Tree Shaking
export { Layout, NotFoundLayout, HomeLayout };

export { setupEffects } from './logic';
