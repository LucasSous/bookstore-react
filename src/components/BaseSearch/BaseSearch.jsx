import './BaseSearch.css';
import React, { useContext } from 'react';
import { UsersContext } from '../../contexts/usersContext';

function BaseSearch() {
  const { handleSearch } = useContext(UsersContext);

  return (
    <div className="base-search">
      <label className="visually-hidden">Username</label>
      <div className="input-group">
        <div className="input-group-text">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input type="text" className="input" placeholder="Pesquisar" onChange={handleSearch} />
      </div>
    </div>
  );
}

export default BaseSearch;
