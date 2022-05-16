import './BaseHeader.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

function BaseHeader({ title }) {
  const { textTheme } = useContext(GlobalContext);

  return (
    <div className={textTheme}>
      <h1>{title}</h1>
    </div>
  );
}

export default BaseHeader;
