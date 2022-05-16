import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';
import './ButtonSettings.css';

function ButtonSettings() {
  const { isSettingsActive, setIsSettingsActive, isThemeActive } = useContext(GlobalContext);

  return (
    <span
      onClick={() => {
        const active = isSettingsActive === false ? true : false;
        setIsSettingsActive(active);
      }}
      className={`material-symbols-outlined ${isThemeActive ? 'button-dark' : 'button-light'}`}>
      settings
    </span>
  );
}

export default ButtonSettings;
