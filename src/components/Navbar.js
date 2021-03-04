import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import logo from '../images/logo_final_dark.png'
import './Navbar.css'

const Navbar = ({ user, loginUser }) => {
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
  //useEffect(() => { showButton();}, [])
  window.addEventListener('resize', showButton)
	return (
	<React.Fragment>
      <nav className="navbar navbar-expand-lg header-color ">
         <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
          <img style={{width:'200px',height:'50px',border:'1px solid white',padding:'3px'}} src={logo} alt="Kirikou Prestation"/>
          </Link>
          <div onClick={handleClick} className="menu-icon">
                <i className={click? 'fas fa-times': 'fas fa-bars'}/>  
          </div>
        <div className="nav-container">
            <ul className={click ? 'nav-menu active': 'navbar-nav'}>
                <li className="nav-item">
                    <Link className=" nav-links" onClick={closeMobileMenu} to="/">
                    <i class="fa fa-home"></i>
                      Home
                    </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" onClick={closeMobileMenu} to="/home-service-list">
                    <i class="fab fa-paypal"></i>
                    Liste devis
                  </Link>
                  <div className="sub-menu-1">
                    <ul>
                        <li><NavLink to="/liste-devis-agricole"><a href>Liste Agricole</a></NavLink></li>
                        <li><NavLink to="/liste-devis-domestique">Liste Domestique</NavLink></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" onClick={closeMobileMenu} to="/home-service-prestation">
                    <i class="fab fa-accusoft"></i>
                    Devis Prestations
                  </Link>
                  <div className="sub-menu-1">
                    <ul> 
                        <li><NavLink to="/agricole"><a href>Agricole</a></NavLink></li>
                        <li><NavLink to="/domestique">Domestique</NavLink></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" onClick={closeMobileMenu} to="/home-service-vente">
                    <i class="fa fa-users"></i>
                    Devis Ventes
                  </Link>
                  <div className="sub-menu-1">
                    <ul> 
                        <li><NavLink to="/vente"><a href>Création Devis</a></NavLink></li>
                        <li><NavLink to="/liste-devis-vente">Liste Devis</NavLink></li>
                    </ul>
                  </div>
                </li>
                {/*<li className="nav-item">
                <Link className="nav-links" onClick={closeMobileMenu} to="/colis">
                <i class="fa fa-phone"></i>  
                About Us
                </Link>
                </li>*/}
				        {!user && !click &&(
                    <React.Fragment>
                      <li className="nav-item">
                        <Link className=" nav-links" onClick={closeMobileMenu} to="/login">
                        <i class="fa fa-sign-in"></i>
                          Login
                        </Link>
                      </li>   
                    </React.Fragment>
                )}
                {!user && click &&(
                    <React.Fragment>
                      <li className="nav-item">
                        <Link className=" nav-links-mobile" onClick={closeMobileMenu} to="/login">
                        <i class="fa fa-sign-in"></i>
                          Login
                        </Link>
                      </li>   
                    </React.Fragment>
                )}
              
            {user &&(
              <React.Fragment>
              <li className="nav-item">
                <Link className=" nav-links" to="#">
                {user.first_name + ' ' + user.last_name}
                </Link>
              </li> 
              <li className='nav-item'>
              <Link className="nav-links" to="/logout">Logout</Link>
              </li> 
              <li className='nav-item'>
              <Link className="nav-links-mobile" onClick={closeMobileMenu} to="/logout">Logout</Link>
              </li> 
               </React.Fragment>
            )}
            </ul>
          </div>
        </nav>
	  </React.Fragment>
	);
};

export default Navbar;
