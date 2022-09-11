import { createContext, useContext } from 'react';
import { PageData } from '../../shared/types';

export const DataContext = createContext({});

export const usePageData = () => {
  return useContext(DataContext) as PageData;
};
