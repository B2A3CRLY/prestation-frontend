import React, { Component} from 'react'
import { apiUrl } from "../../config.json";
import http from '../../services/httpService';
import auth from "../../services/authService";
import logo_final from '../../images/logo_final.png';
import Cachet_Kirikou from '../../images/Cachet_Kirikou.jpg';
const apiDevis = apiUrl + '/devisDomestique/';
const now = new Date();
export default class ViewDevisDomestique extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            devis: '',
            client: '',
            firstname: '',
            lastname: '',
            phone: '',
            adresse:'',
            sex:'',
            idDevis: '',
            isQuotation: '',
            isInvoice: '',
            dateCreation: '',
            quantityHouse: '',
            designationHouse: '',
            priceHouse: '',
            quantityBuilding: '',
            designationBuilding:'',
            priceBuilding:'',
            loginUserByUsername: '',
        }
    }
    async refreshDevis() {
        const idDevis = this.props.valueFromPrint;
        const { data: devis } = await http.get(apiDevis + 'detail/' + idDevis);
        this.setState({ devis, client: devis.client, firstname: devis.client.clientFirstName, lastname: devis.client.clientLastName,adresse:devis.client.clientAddress,phone: devis.client.clientPhone, dateCreation: devis.date_creation,sex:devis.client.gender,idDevis, quantityHouse:devis.house ? devis.house.quantity:1,priceHouse:devis.house ? devis.house.price:0,designationHouse: devis.house ? devis.house.designation: '',quantityBuilding: devis.building ? devis.building.quantity:1, priceBuilding: devis.building ? devis.building.price:0, designationBuilding: devis.building ? devis.building.designation: '', isQuotation:devis.isQuotation, isInvoice: devis.isInvoice});
    }
    async componentDidMount() {
        this.refreshDevis();
        const user = await auth.getCurrentUser();
        const loginUserByUsername = await auth.getUserObjectByUsername(user ? user : '')
        this.setState({loginUserByUsername});
    
    }
    render() {
        const { devis,client, firstname, lastname, phone, dateCreation, loginUserByUsername,sex,idDevis, adresse, quantityHouse, quantityBuilding, priceHouse, priceBuilding, designationHouse, designationBuilding, isQuotation, isInvoice} = this.state;
        let dateFrench = now.toLocaleDateString('fr-FR', this.optionsDate);
        let quotation = null;
        let quotationArray = [];
        console.log('devis : ', devis)
        console.log('Facture: ', isInvoice)
        console.log('isDevis: ', isQuotation)
        console.log('price house: ', priceHouse)
        console.log('price Building : ', priceBuilding)
        console.log('designation House: ', designationHouse)
        console.log('designation Building : ',designationBuilding)
        console.log('sexe : ', sex)
        console.log('client : ', client)
        console.log('Prénom : ', firstname)
        console.log('username : ', loginUserByUsername[0])
        if (devis.house !== null) {
            quotationArray = [{ id: 0, designation: designationHouse, quantity:quantityHouse, price:priceHouse}]
            quotation = quotationArray.map(dev => {
                return (
                    <tr key={dev.id}>
                        <td>{dev.designation}</td>
                        <td style={{ textAlign: 'center' }}>{dev.quantity}</td>
                        <td style={{ textAlign: 'center' }}>{dev.price}</td>
                        <td style={{ textAlign: 'center' }}>{dev.price}</td>
                    </tr>
                );
            })
        }
        if (devis.building !== null) {
            quotationArray = [{ id: 0, designation: designationBuilding, quantity:quantityBuilding, price:priceBuilding}]
            quotation = quotationArray.map(dev => {
                return (
                    <tr key={dev.id}>
                        <td>{dev.designation}</td>
                        <td style={{ textAlign: 'center' }}>{dev.quantity}</td>
                        <td style={{ textAlign: 'center' }}>{dev.price}</td>
                        <td style={{ textAlign: 'center' }}>{dev.price}</td>
                    </tr>
                );
            })
        }
        return (
            <div>
                <div className="margin">
                <p id="image-domestique" className="left" style={{marginTop:'60px'}}>
                    <img src={logo_final} alt="Logo Kirikou" width = {5} height={5}/>
                </p>
                    <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>{isInvoice ? 'FACTURE' : ''}</h2>
                    <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>{isQuotation ? 'DEVIS':''}</h2>
                <div className="space-between-home">
                    <div className="text-size-order">
                        <p style={{paddingTop:'35px'}}><span>{sex === 'Masculin' ? 'M.' + ' ' + firstname.toUpperCase() + ' ' + lastname.toUpperCase() : ''}</span></p>
                        <p><span>{sex === 'Feminin' ? 'Mme.' +' '+ firstname.toUpperCase()  +' '+lastname.toUpperCase() :''}</span></p>
                        <p><span>{adresse}</span></p>
                        <p><span>{phone}</span></p>
                    </div>
                    <div className="text-size-order">
                        <p className="text-right">Numéro de commande : <span>{devis.ref_devis}
                        </span></p>
                        <p className="text-right">Date de commande: <span>{dateCreation}
                        </span></p>
                        <p className="text-right" style={{width:'500px'}}>Mode de paiement : En espèces ou par chèque</p>
                        <p className="text-right">Conditions d'expédition: <span> LIVRAISON OFFERTE</span></p>
                    </div>
                </div>
                <div style={{marginTop:'10px'}}>
                {devis.house !== null && priceHouse === 89900 &&(
                <>   
                <div className="border-client-black row">
                        <h5 id="first" style={{width:'355px', fontWeight:'bold'}}>Désignation produits</h5>
                        <h5 style={{width:'193px',fontWeight:'bold'}}>Quantité</h5>
                        <h5 style={{width:'230px',fontWeight:'bold'}}>PU</h5>
                        <h5 style={{fontWeight:'bold'}}>Prix HT(francs CFA)</h5>
                </div>
                <div style={{marginTop:'-13px'}} className="border-client-white-first
                text-size-order row">
                        <p style={{width:'370px', paddingTop:'5px'}}>{designationHouse}</p>
                        <p style={{ width: '150px', marginLeft:'20px', paddingTop:'20px'}}>{quantityHouse}</p>
                        <p style={{ width: '241px', paddingTop:'20px'}}>{priceHouse}</p>
                        <p style={{marginLeft:'148px', paddingTop:'20px'}}>{priceHouse}</p>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className=" border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '398px', paddingBottom: '5px', marginLeft:'-11px'}}>Sous-total HT (francs CFA)</p>
                            <p style={{marginLeft:'138px', paddingBottom:'5px'}}>{priceHouse}</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '411px', paddingBottom: '5px', marginLeft:'-11px'}}>Montant TVA(18%)</p>
                            <p style={{width: '262px', marginLeft:'138px', paddingBottom:'5px'}}>0,00</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white-end row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '400px', paddingBottom: '5px', marginLeft:'-11px'}}>Total TTC(francs CFA)</p>
                            <p style={{ width: '262px', marginLeft: '138px', paddingBottom: '5px' }}>{priceHouse}</p>
                        </div>
                </div>               
                <div className="text-right-domestique"><h5 id="two">1/1</h5></div>
                </>)}
                {devis.house !== null && priceHouse > 89900 &&(
                <>   
                <div className="border-client-black row">
                        <h5 id="first" style={{width:'355px', fontWeight:'bold'}}>Désignation produits</h5>
                        <h5 style={{width:'193px',fontWeight:'bold'}}>Quantité</h5>
                        <h5 style={{width:'230px',fontWeight:'bold'}}>PU</h5>
                        <h5 style={{fontWeight:'bold'}}>Prix HT(francs CFA)</h5>
                </div>
                <div style={{marginTop:'-13px'}} className="border-client-white-first
                text-size-order row">
                        <p style={{width:'370px', paddingTop:'5px'}}>{designationHouse}</p>
                        <p style={{ width: '138px', marginLeft:'20px', paddingTop:'20px'}}>{quantityHouse}</p>
                        <p style={{ width: '241px', paddingTop:'20px'}}>{priceHouse}</p>
                        <p style={{marginLeft:'148px', paddingTop:'20px'}}>{priceHouse}</p>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className=" border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '386px', paddingBottom: '5px', marginLeft:'-11px'}}>Sous-total HT (francs CFA)</p>
                            <p style={{marginLeft:'138px', paddingBottom:'5px'}}>{priceHouse}</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '406px', paddingBottom: '5px', marginLeft:'-11px'}}>Montant TVA(18%)</p>
                            <p style={{width: '262px', marginLeft:'138px', paddingBottom:'5px'}}>0,00</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white-end row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '386px', paddingBottom: '5px', marginLeft:'-11px'}}>Total TTC(francs CFA)</p>
                            <p style={{ width: '262px', marginLeft: '138px', paddingBottom: '5px' }}>{priceHouse}</p>
                        </div>
                </div>               
                <div className="text-right-domestique"><h5 id="two">1/1</h5></div>
                </>)}
                {devis.building!==null && priceBuilding <= 982887 &&(
                <>    
                <div className="border-client-black row">
                        <h5 id="first" style={{width:'355px', fontWeight:'bold'}}>Désignation produits</h5>
                        <h5 style={{width:'198px',fontWeight:'bold'}}>Quantité</h5>
                        <h5 style={{width:'230px',fontWeight:'bold'}}>PU</h5>
                        <h5 style={{fontWeight:'bold'}}>Prix HT(francs CFA)</h5>
                </div>
                <div style={{marginTop:'-13px'}} className="border-client-white-first
                text-size-order row">
                        <p style={{width:'370px', paddingTop:'20px'}}>{designationBuilding}</p>
                        <p style={{ width: '150px', marginLeft:'20px', paddingTop:'20px'}}>{quantityHouse}</p>
                        <p style={{ width: '229px', paddingTop:'20px'}}>{priceBuilding}</p>
                        <p style={{marginLeft:'148px', paddingTop:'20px'}}>{priceBuilding}</p>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className=" border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '383px', paddingBottom: '6px', marginLeft:'-11px'}}>Sous-total HT (francs CFA)</p>
                            <p style={{marginLeft:'138px', paddingBottom:'6px'}}>{priceBuilding}</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '411px', paddingBottom: '5px', marginLeft:'-11px'}}>Montant TVA(18%)</p>
                            <p style={{width: '262px', paddingBottom:'5px'}} className="goback">0,00</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white-end row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '383px', paddingBottom: '5px', marginLeft:'-11px'}}>Total TTC(francs CFA)</p>
                            <p style={{ width: '262px', marginLeft: '138px', paddingBottom: '5px' }}>{priceBuilding}</p>
                        </div>
                </div>
                <div className="text-right-domestique"><h5 id="two">1/1</h5></div>
                </>)}
                {devis.building!==null && priceBuilding > 982887 &&(
                <>    
                <div className="border-client-black row">
                        <h5 id="first" style={{width:'355px', fontWeight:'bold'}}>Désignation produits</h5>
                        <h5 style={{width:'198px',fontWeight:'bold'}}>Quantité</h5>
                        <h5 style={{width:'230px',fontWeight:'bold'}}>PU</h5>
                        <h5 style={{fontWeight:'bold'}}>Prix HT(francs CFA)</h5>
                </div>
                <div style={{marginTop:'-13px'}} className="border-client-white-first
                text-size-order row">
                        <p style={{width:'370px', paddingTop:'20px'}}>{designationBuilding}</p>
                        <p style={{ width: '150px', marginLeft:'20px', paddingTop:'20px'}}>{quantityHouse}</p>
                        <p style={{ width: '217px', paddingTop:'20px'}}>{priceBuilding}</p>
                        <p style={{marginLeft:'148px', paddingTop:'20px'}}>{priceBuilding}</p>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className=" border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '374px', paddingBottom: '6px', marginLeft:'-11px'}}>Sous-total HT (francs CFA)</p>
                            <p style={{marginLeft:'138px', paddingBottom:'6px'}}>{priceBuilding}</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '411px', paddingBottom: '5px', marginLeft:'-11px'}}>Montant TVA(18%)</p>
                            <p style={{width: '262px', paddingBottom:'5px'}} className="goback">0,00</p>
                        </div>
                </div>
                <div style={{marginTop:'-13px', marginLeft:'400px'}}
                className="border-client-white-end row">
                        <div className="space-between-resize text-size-order">
                            <p style={{ width: '374px', paddingBottom: '5px', marginLeft:'-11px'}}>Total TTC(francs CFA)</p>
                            <p style={{ width: '262px', marginLeft: '138px', paddingBottom: '5px' }}>{priceBuilding}</p>
                        </div>
                </div>
                <div className="text-right-domestique"><h5 id="two">1/1</h5></div>
                </>)}
                </div>
                </div>
                <div className="space-between-domestique">
                    <div>
                        <h4 className="text-resize">Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <h4 className="space-right" style={{textDecoration:'underline'}}>LE SERVICE TECHNIQUE:<br/></h4>
                        <div className="space-left-domestique text-resize">
                        {loginUserByUsername[0]?loginUserByUsername[0].first_name: '' } {' '} {loginUserByUsername[0]? loginUserByUsername[0].last_name:''}
                        </div>
                    </div>     
                </div>
                <div id="image3" className="text-right-d text-right"><img src={Cachet_Kirikou}
                    alt="Cachet Kirikou" />
                </div>
                <div className="font-smaller footer">
                    <p style={{fontWeight:'bold'}}>
                        KIRIKOU Sarl<br />RC: SN.DKR.2018.B.20233/NINEA: 0069399642Y2<br />Siège social : DAKAR(Sénégal), Yoff Cité BIAGUI, rue YF-496<br />
                        Site internet: <span className="text-primary">www.kirikousystems.com</span> | Email :<span className="text-primary">contact@kirikousystems.com </span><br />Service client : +221 78 601 88 88 | +221 33 860 30 73 | +221 77 277 00 56
                    </p>
                </div>
            </div>
        )
    }
}
