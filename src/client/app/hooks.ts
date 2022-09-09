import data from 'island:page-data';
import { createContext, useContext } from 'react';

export const DataContext = createContext({});

export const usePageData = () => {
  return data;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
