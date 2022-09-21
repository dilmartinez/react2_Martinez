import logotipo from '../img/logo.jpeg'
import CartWidget from '../CartWidget/CartWidget';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navBar-container">
            <div>
            <NavLink to='/'><img src={logotipo} className="logotipo" alt="logo" />
            </NavLink>
            </div>
            <div className='navBar'>
                <li>
                    <NavLink to='/'>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to='/tipo/Churros'>Churros</NavLink>
                </li>
                <li>
                    <NavLink to='/tipo/Cookies'>Cookies</NavLink>
                </li>
                <li>
                    <NavLink className='contador' to='/cart'><CartWidget /></NavLink>
                </li>
                
            </div>
        </div>
    );
};

export default NavBar;