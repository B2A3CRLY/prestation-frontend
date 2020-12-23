import React, { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Domestique from './components/pages/Domestique';
import Agricole from './components/pages/Agricole';
import ListDevis from './components/pages/ListDevis';
import Login from './components/pages/Login';
import HomeService from './components/pages/HomeService';
import auth from "./services/authService";
import Logout from './components/pages/Logout';
import Vente from './components/pages/Vente';
import Error from './components/pages/Error';
import Alerts from './components/common/Alerts';
import ListDevisVente from './components/pages/ListDevisVente';
import PrintDevis from './components/pages/PrintDevis';
import PrintDevisVente from './components/pages/PrintDevisVente';
import PrintFactureVente from './components/pages/PrintFactureVente';
import PrintBonLivraisonVente from './components/pages/PrintBonLivraison';
import ContenuDevisVente from './components/pages/ContenuDevisVente';
import PrintDevisDomestique from './components/pages/PrintDevisDomestique';
import ListDevisDomestique from './components/pages/ListDevisDomestique';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
let hours = 120; // Reset when storage is more than 72hours
let now = new Date().getTime();
const tokenKey = 'token';
const alertOptions = {
  timeout:3000,
  position:'top center'
}
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}
class App extends Component {
  state = {};
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const loginUser = await auth.getUserObject();
    const loginUserByUsernames = await auth.getUserObjectByUsername(user ? user : '')
    const loginUserByUsername = loginUserByUsernames
    console.log("userObjectByUsername ", loginUserByUsername[0]);
    console.log("userObject : ", loginUser);
    console.log("user : ", user);
    console.log("token : ", auth.getJwt(tokenKey));
    this.setState({ user, loginUser, loginUserByUsername});
  }
  render() {
    const {loginUser, loginUserByUsername } = this.state;
    return (
      <Router>
        <Navbar user={loginUserByUsername ? loginUserByUsername[0]: loginUserByUsername} loginUser={loginUser}/>
        <AlertProvider template={AlertTemplate}{...alertOptions}>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/home-service' exact component={HomeService} />
              <Route path='/domestique' exact component={Domestique} />
              <Route path='/devis-domestique' exact component={ListDevisDomestique} />
              <Route path='/agricole' exact component={Agricole} />
              <Route path='/devis' exact component={ListDevis} />
              <Route path='/view/devis/:id' exact component={PrintDevis} />
              <Route path='/view/domestique/:id' exact component={PrintDevisDomestique}/>
              <Route path='/view/devis-vente/:id' exact component={PrintDevisVente} />
              <Route path='/view/facture-vente/:id' exact component={PrintFactureVente} />
              <Route path='/view/bon-livraison-vente/:id' exact component={PrintBonLivraisonVente} />
              <Route path='/view/contenu-vente/:id' exact component={ContenuDevisVente}/>
              <Route path="/vente" component={Vente} />
              <Route path='/devis-vente' exact component={ListDevisVente} />
              <Route path='/login' exact component={Login} />
              <Route path="/logout" component={Logout} />
              <Route component={Error}/>
            </Switch>
            
        </AlertProvider> 
        
      </Router>
    );
  }
}

export default App;
