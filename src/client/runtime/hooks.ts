import { createContext, useContext } from 'react';
import { PageData } from '../../shared/types';
import { inBrowser } from './utils';

export const DataContext = createContext(
  inBrowser() ? window?.ISLAND_PAGE_DATA : null
);

export const usePageData = () => {
  return useContext(DataContext) as PageData;
};
