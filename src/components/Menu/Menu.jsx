import logo from '../../img/logo.png';
import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className="menu">
      <div className="logo">
        <img src={logo} alt="wda-livraria"></img>
      </div>
      <ul>
        <li>
          <NavLink to="/">
            <span className="material-symbols-outlined icon">dashboard</span>Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            <span className="material-symbols-outlined icon">person</span>
            Usuários
          </NavLink>
        </li>
        <li>
          <NavLink to="/books">
            <span className="material-symbols-outlined icon">auto_stories</span>
            Livros
          </NavLink>
        </li>
        <li>
          <NavLink to="/publishers">
            <span className="material-symbols-outlined icon">local_library</span>
            Editoras
          </NavLink>
        </li>
        <li>
          <NavLink to="/rents">
            <span className="material-symbols-outlined icon">calendar_today</span>
            Aluguéis
          </NavLink>
        </li>
      </ul>
      <div className="name">
        <a href="https://github.com/LucasSous" target="_blank">
          Feito por <span>Lucas Sousa</span>
        </a>
      </div>
    </div>
  );
}

export default Menu;
