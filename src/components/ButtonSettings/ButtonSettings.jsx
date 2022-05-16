import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

function ButtonSettings() {
  const { setIsSettingsActive } = useContext(GlobalContext);

  return (
    <span
      onClick={() => {
        setIsSettingsActive(true);
      }}
      className="material-symbols-outlined">
      settings
    </span>
  );
}

export default ButtonSettings;
