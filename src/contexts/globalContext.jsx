import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState('theme-light');
  const [cardTheme, setCardTheme] = useState('card-light');
  const [textTheme, setTextTheme] = useState('text-light');
  const [tableTheme, setTableTheme] = useState('table-theme-light');

  function themeLight() {
    setIsThemeActive(false);
    setBackgroundTheme('theme-light');
    setCardTheme('card-light');
    setTextTheme('text-light');
    setTableTheme('table-theme-light');
  }

  function themeDark() {
    setIsThemeActive(true);
    setBackgroundTheme('theme-dark');
    setCardTheme('card-dark');
    setTextTheme('text-dark');
    setTableTheme('table-theme-dark');
  }

  return (
    <GlobalContext.Provider
      value={{
        isSettingsActive,
        setIsSettingsActive,
        isThemeActive,
        themeLight,
        themeDark,
        backgroundTheme,
        cardTheme,
        textTheme,
        tableTheme
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
