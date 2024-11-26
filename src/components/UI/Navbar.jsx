import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from './Button/Button';
import './Navbar.css';
import logowithtext from '../../assets/images/logowithtext.PNG'
function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-container__tabs">
                        <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                            <img src={logowithtext} alt="Logo" className="navbar-logo__img"/>
                        </Link>
                    </div>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {!isLoggedIn ? (
                            <li className='nav-item'>
                            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                            Home</Link>
                        </li>
                        ) : (
                            <li className='nav-item'>
                            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                            Home</Link>
                        </li>
                        )}

                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                            Products</Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/shoppingcart' className='nav-links' onClick={closeMobileMenu}>
                            Shopping Cart</Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/voucher' className='nav-links' onClick={closeMobileMenu}>
                            Voucher</Link>
                        </li>

                        {isLoggedIn ? (
                            <li className='nav-item'>
                                <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                                        Log Out
                                    </Link>
                            </li>
                            ) : (
                                <li className='nav-item'>
                                    <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                        Sign Up
                                    </Link>
                                </li>
                            )}
                    </ul>
                    {button && !isLoggedIn && <Button buttonStyle='btn-outline'>SIGN UP</Button>}
                </div>
            </nav>
        </>
    );
}


export default Navbar;