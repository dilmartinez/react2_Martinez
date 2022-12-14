import logotipo from '../img/logo.jpeg'
import CartWidget from '../CartWidget/CartWidget';
import {NavLink} from 'react-router-dom';
import '../NavBar/NavBar.css'

const NavBar = () => {
    return (
        <div className="navBar-container">
            <div>
            <NavLink to='/'><img src={logotipo} className="logotipo" alt="logo" />
            </NavLink>
            </div>
            <div className='navBar'>
                <li>
                    <NavLink to={'/'}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to={'/tipo/churros'}>Churros</NavLink>
                </li>
                <li>
                    <NavLink to={'/tipo/cookies'}>Cookies</NavLink>
                </li>
                <li>
                    <NavLink to={'/cart'}><CartWidget /></NavLink>
                </li>
                
            </div>
        </div>
    );
};

export default NavBar;