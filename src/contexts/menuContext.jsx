import { createContext, useState } from 'react';

export const MenuContext = createContext();

function MenuContextProvider({ children }) {
  const [isActiveMenu, setIsActiveMenu] = useState(true);

  return <MenuContext.Provider value={{ isActiveMenu, setIsActiveMenu }}>{children}</MenuContext.Provider>;
}

export default MenuContextProvider;
