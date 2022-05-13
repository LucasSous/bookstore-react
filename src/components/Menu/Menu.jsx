import logo from '../../img/logo.png';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';
import './Menu.css';
import { NavLink } from 'react-router-dom';

function Menu() {
  const { isActiveMenu, setIsActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'menuActive' : 'menuOff'}`}>
      <div className="button-open">
        {isActiveMenu ? (
          <span
            onClick={() => {
              setIsActiveMenu(false);
            }}
            className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        ) : (
          <span
            onClick={() => {
              setIsActiveMenu(true);
            }}
            className="material-symbols-outlined">
            menu
          </span>
        )}
      </div>
      <div className="logo">
        <img src={logo} alt="wda-livraria"></img>
      </div>
      <ul>
        <li>
          <NavLink to="/">
            <span className="material-symbols-outlined icon">dashboard</span>
            {isActiveMenu && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            <span className="material-symbols-outlined icon">person</span>
            {isActiveMenu && <span>Usuários</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/books">
            <span className="material-symbols-outlined icon">auto_stories</span>
            {isActiveMenu && <span>Livros</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/publishers">
            <span className="material-symbols-outlined icon">local_library</span>
            {isActiveMenu && <span>Editoras</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/rents">
            <span className="material-symbols-outlined icon">calendar_today</span>
            {isActiveMenu && <span>Aluguéis</span>}
          </NavLink>
        </li>
      </ul>
      {isActiveMenu && (
        <div className="name">
          <a href="https://github.com/LucasSous" target="_blank" rel="noopener noreferrer">
            Feito por <span>Lucas Sousa</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default Menu;
