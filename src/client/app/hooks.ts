import { createContext, useContext } from 'react';
import { DefaultTheme, PageData, SiteData } from '../../shared/types';

export const DataContext = createContext({});

export const usePageData = () => {
  return useContext(DataContext) as PageData;
};
