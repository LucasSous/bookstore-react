import logo from '../../img/logo.png'
import './Menu.css'
import { Link } from 'react-router-dom'

function Menu() {
    return(
        <div className="menu">
            <div className='logo'>
                <img src={logo}></img>
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <span className="material-symbols-outlined icon">
                            dashboard
                        </span>Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/users">
                        <span className="material-symbols-outlined icon">person</span>
                        Usuários
                    </Link>
                </li>
                <li>
                    <Link to="/books">
                        <span className="material-symbols-outlined icon">auto_stories</span>
                        Livros
                    </Link>
                </li>
                <li>
                    <Link to="/publishers">
                        <span className="material-symbols-outlined icon">local_library</span>
                        Editoras
                    </Link>
                </li>
                <li>
                    <Link to="/rents">
                        <span className="material-symbols-outlined icon">calendar_today</span>
                        Aluguéis</Link>
                </li>
            </ul>
            <div className='name'>
                Feito por <span>Lucas Sousa</span>
            </div>
      </div>
    )
}

export default Menu;