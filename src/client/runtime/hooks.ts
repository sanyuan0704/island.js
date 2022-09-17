import { createContext, useContext } from 'react';
import { PageData } from '../../shared/types';
import { inBrowser } from './utils';

export const DataContext = createContext({
  data: inBrowser() ? window?.ISLAND_PAGE_DATA : null,
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
