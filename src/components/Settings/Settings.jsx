import React, { useContext } from 'react';
import './Settings.css';
import { GlobalContext } from '../../contexts/globalContext';

function Settings() {
  const { isSettingsActive, setIsSettingsActive, isThemeActive, themeLight, themeDark } = useContext(GlobalContext);

  return (
    <div className={`${isSettingsActive ? 'settings-container-active' : 'settings-container-off'}`}>
      <div
        className="d-flex justify-content-between header span:hover {
 align-items-center">
        <h1>Configurações</h1>
        <span
          onClick={() => {
            setIsSettingsActive(false);
          }}
          className="material-symbols-outlined">
          close
        </span>
      </div>
      <div className="themes">
        <h1>Tema</h1>
        <div className="cards-theme d-flex justify-content-between  align-items-center">
          <div
            onClick={themeLight}
            className={`card-theme ${
              !isThemeActive ? 'card-theme-active' : 'card-theme-off'
            } d-flex justify-content-between align-items-center`}>
            <span>Claro</span>
            <span className="material-symbols-outlined">light_mode</span>
          </div>
          <div
            onClick={themeDark}
            className={`card-theme ${
              isThemeActive ? 'card-theme-active' : 'card-theme-off'
            } d-flex justify-content-between align-items-center`}>
            <span>Escuro</span>
            <span className="material-symbols-outlined">dark_mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
