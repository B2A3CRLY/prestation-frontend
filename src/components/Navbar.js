import React from 'react';
import { NavLink} from 'react-router-dom';


const Navbar = ({ user,loginUser}) => {
	return (
	<React.Fragment>
      <nav className="navbar navbar-expand-lg header-color ">
        <a className="navbar-brand" href="">
        <i class="fa fa-home"></i>
          KIRIKOU PRESTATION</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto topnav">
        <li className="nav-item">
        <NavLink className=" nav-link" to="/">
        <i class="fa fa-home"></i>
					Home
				</NavLink>
				</li>
        <li className="nav-item">
        <NavLink className=" nav-link" to="/devis">
        <i class="fa fa-home"></i>
					Liste Devis
				</NavLink>
				</li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home-service">
            <i class="fab fa-accusoft"></i>
            Devis Prestations
          </NavLink>
          <div className="sub-menu-1">
            <ul> 
                <li><NavLink to="/agricole"><a href>Agricole</a></NavLink></li>
                <li><NavLink to="/domestique">Domestique</NavLink></li>
            </ul>
          </div>
				</li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home-service">
            <i class="fab fa-paypal"></i>
            Liste devis
          </NavLink>
          <div className="sub-menu-1">
            <ul>
                <li><NavLink to="/devis"><a href>Devis agricole</a></NavLink></li>
                <li><NavLink to="/devis-domestique">Devis domestique</NavLink></li>
            </ul>
          </div>
				</li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/vente">
        <i class="fa fa-users"></i>
        Devis Ventes
				</NavLink>
				</li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/colis">
        <i class="fa fa-phone"></i>  
        About Us
				</NavLink>
        </li>
				{!user && (
                    <React.Fragment>
                      <li className="nav-item">
                        <NavLink className=" nav-link" to="/login">
                        <i class="fa fa-sign-in"></i>
                          Login
                        </NavLink>
                      </li>   
                    </React.Fragment>
                )}
                {user && (
              <React.Fragment>
              <li className="nav-item">
                <NavLink className=" nav-link" to="#">
                {user.first_name + ' ' + user.last_name}
                </NavLink>
              </li>  
              <li className='nav-item'>
              <NavLink className="nav-link" to="/logout">Logout</NavLink>
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
