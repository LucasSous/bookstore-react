import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState('theme-light');
  const [cardTheme, setCardTheme] = useState('card-light');
  const [textTheme, setTextTheme] = useState('text-light');
  const [tableTheme, setTableTheme] = useState('table-theme-light');
  const [searchTheme, setSearchTheme] = useState('search-light');
  const [modalTheme, setModalTheme] = useState('modal-light');
  const [loadingTheme, setLoadingTheme] = useState('loading-light');
  const [settingsTheme, setSettingsTheme] = useState('settings-light');

  function themeLight() {
    setIsThemeActive(false);
    setBackgroundTheme('theme-light');
    setCardTheme('card-light');
    setTextTheme('text-light');
    setTableTheme('table-theme-light');
    setSearchTheme('search-light');
    setModalTheme('modal-light');
    setLoadingTheme('loading-light');
    setSettingsTheme('settings-light');
  }

  function themeDark() {
    setIsThemeActive(true);
    setBackgroundTheme('theme-dark');
    setCardTheme('card-dark');
    setTextTheme('text-dark');
    setTableTheme('table-theme-dark');
    setSearchTheme('search-dark');
    setModalTheme('modal-dark');
    setLoadingTheme('loading-dark');
    setSettingsTheme('settings-dark');
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
        tableTheme,
        searchTheme,
        modalTheme,
        loadingTheme,
        settingsTheme
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
