import './Loading.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

function Loading({ loadingTitle }) {
  const { loadingTheme } = useContext(GlobalContext);

  return (
    <div className={`${loadingTheme} loading`}>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <span className="text">{loadingTitle}...</span>
      </div>
    </div>
  );
}

export default Loading;
