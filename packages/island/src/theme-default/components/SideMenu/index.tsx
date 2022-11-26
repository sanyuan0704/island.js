import styles from './index.module.scss';
import { SideBar } from '../Siderbar';
import { Fragment, useState } from 'react';
import { ComponentPropsWithIsland } from '../@shared/types';
import { DefaultTheme } from '../@shared/types';

interface Props {
  pathname: string;
  langRoutePrefix: string;
  sidebarData: DefaultTheme.SidebarGroup[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SideMenu(_props: ComponentPropsWithIsland & Props) {
  const { langRoutePrefix, pathname, sidebarData } = _props;
  const [isSidebarOpen, setIsOpen] = useState<boolean>(false);
  function openSidebar() {
    setIsOpen(true);
  }

  function closeSidebar() {
    setIsOpen(false);
  }
  return (
    <Fragment>
      <div className={styles.localNav}>
        <button flex="center" onClick={openSidebar} className={styles.menu}>
          <div text="md" mr="2" className="i-carbon:menu"></div>
          <span text="md ">Menu</span>
        </button>
      </div>
      <SideBar
        __island
        langRoutePrefix={langRoutePrefix}
        pathname={pathname}
        sidebarData={sidebarData}
        isSidebarOpen={isSidebarOpen}
      ></SideBar>
      {isSidebarOpen ? (
        <div onClick={closeSidebar} className={styles.backDrop} />
      ) : null}
    </Fragment>
  );
}
