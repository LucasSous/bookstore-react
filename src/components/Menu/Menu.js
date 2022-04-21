import logo from '../../img/logo.png'
import './Menu.css'

function Menu() {
    return(
        <div className="menu">
            <div className='logo'>
                <img src={logo}></img>
            </div>
            <ul>
                <li>
                    <a>Dashboard</a>
                </li>
                <li>
                    <a>Usuários</a>
                </li>
                <li>
                    <a>Livros</a>
                </li>
                <li>
                    <a>Editoras</a>
                </li>
                <li>
                    <a>Alugueis</a>
                </li>
            </ul>
            <div className='name'>
                Feito por <span>Lucas Sousa</span>
            </div>
      </div>
    )
}

export default Menu;