import { createContext, useState } from 'react';

export const newsPartsContext = createContext();

export const NewsPartsProvider = ({ children }) => {
  return <NewsParts.Provider value={[]}>{children}</NewsParts.Provider>;
};
