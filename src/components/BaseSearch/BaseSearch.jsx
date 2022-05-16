import './BaseSearch.css';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

function BaseSearch({ change }) {
  const { searchTheme } = useContext(GlobalContext);

  return (
    <div className={`${searchTheme} ms-3`}>
      <div className="input-group">
        <div className="input-group-text">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input type="text" className="input" placeholder="Pesquisar" onChange={change} />
      </div>
    </div>
  );
}

export default BaseSearch;
