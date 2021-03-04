import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './ResponsiveNavbar.css';
import { Button } from '../common/Button';
export default function ResponsiveNavbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    }
    window.addEventListener('resize', showButton)
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="navbar-logo">ONE
                    <i className="fab fa-typo3"/>
                    </Link>
                    <div onClick={handleClick} className="menu-icon">
                        <i className={click? 'fas fa-times': 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to = "/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/services" className="nav-links" onClick={closeMobileMenu}>Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/products" className="nav-links" onClick={closeMobileMenu}>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = "/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>Sign up</Link>
                        </li>
                    </ul>
                    
                </div>
          </nav>
        </>
    )
}
