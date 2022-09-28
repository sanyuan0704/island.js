import { createContext, useContext } from 'react';
import { PageData } from '../shared/types';
import { inBrowser } from '../shared/utils';

export const DataContext = createContext({
  data: inBrowser() ? window?.ISLAND_PAGE_DATA : null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setData: (_data: PageData) => {}
});

export const usePageData = () => {
  return useContext(DataContext).data as PageData;
};

export const useSetPageData = (data: PageData) => {
  try {
    return useContext(DataContext).setData(data);
  } catch (e) {
    console.log(e);
  }
};
