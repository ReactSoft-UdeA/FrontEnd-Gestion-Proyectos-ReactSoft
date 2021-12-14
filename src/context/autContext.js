import { createContext, useContext } from 'react';

export const autContext = createContext(null);

export const useAut = () => {
  return useContext(autContext);
};
