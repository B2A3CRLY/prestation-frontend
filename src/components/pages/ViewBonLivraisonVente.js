import React, { Component } from 'react';
import { apiUrl } from "../../config.json";
import '../../custom.css';
import http from '../../services/httpService';
import auth from "../../services/authService";
import logo_final from '../../images/logo_final.png';
import Cachet_Kirikou from '../../images/Cachet_Kirikou.jpg';
const apiVente = apiUrl + '/vente/';
const apiDevis = apiUrl + '/devisVente/';
const tokenKey = 'token';
const now = new Date();
export default class ViewBonLivraisonVente extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            devis: '',
            ventes:'',
            client: '',
            firstname: '',
            lastname: '',
            phone: '',
            adresse:'',
            sex:'',
            idDevis: '',
            isQuotation: '',
            isInvoice: '',
            loginUserByUsername: '',
        }
    }
    async refreshDevis() {
        const idDevis = this.props.valueFromPrint;
        console.log('id : ',idDevis)
        const { data: devis } = await http.get(apiDevis + 'detail/' + idDevis);
        this.setState({ devis, client: devis.client, firstname: devis.client.clientFirstName, lastname: devis.client.clientLastName,adresse:devis.client.clientAddress,phone: devis.client.clientPhone, dateCreation: devis.date_creation,sex:devis.client.gender,idDevis,isQuotation:devis.isQuotation, isInvoice: devis.isInvoice});
    }
    async componentDidMount() {
        this.refreshDevis();
        const user = await auth.getCurrentUser();
        const loginUserByUsername = await auth.getUserObjectByUsername(user ? user : '')
        this.setState({loginUserByUsername});
        this.getVentes()
    
    }
    async getVentes() {
        let token = auth.getJwt(tokenKey)
        const { data: ventes } = await http.get(apiVente,{
            headers:{
                "Content-type": "application/json",
                "Authorization": `Token ${token}`
            },
        });
        console.log('Ventes : ', ventes);
        console.log('headers:',"Token " + token)
        this.setState({ventes});
    }
    getArraysVente(params, a, b) {
        let n = params.length, n1 = 0, n2 = 0, n3 = 0, n4 = 0,n5 = 0,n6 = 0,n7 = 0,n8 = 0,n9 = 0,n10 = 0,n11 = 0,n12 = 0,n13 = 0,n14 = 0,n15 = 0,n16 = 0,n17 = 0, n18 = 0, n19 = 0;
        let l1 = [], l2 = [], l3 = [], l4 = [], l5 = [], l6 = [], l7 = [], l8 = [], l9 = [], l10 = [], l11 = [], l12 = [], l13 = [], l14 = [], l15 = [], l16 = [], l17 = [], l18 = [], l19 = [], l20 = [];
        let total = 0;
        for (let i = 0; i < n; i++){
            total += params[i].quantity * params[i].price;
            if (n <=a) {
                l1.push(params[i])
            }
            if (n > a && i < a) {
                l1.push(params[i])
                n1 = n - a;
            }
            if (n1 <= b && i >= a && i < a + n1){
                l2.push(params[i]);
            }
            if (n1 > b && i >= a && i < a+b) {
                l2.push(params[i])
                n2 = n1 - b;
            }
            if (n2 <= b && i >= a+b && i< a+b + n2) {
                l3.push(params[i])
            }
            if (n2 > b && i >= a+b && i < a+b+b) {
                l3.push(params[i])
                n3 = n2 - b;
            }
            if (n3 <= b && i >= a+b+b && i< a+b+b + n3) {
                l4.push(params[i])
            }
            if (n3 > b && i >= a+b+b && i < a+b+b+b) {
                l4.push(params[i])
                n4 = n3 - b;
            }
            if (n4 <= b && i >= a+3*b && i < a + 3*b + n4) {
                l5.push(params[i])
            }
            if (n4 > b && i >= a + 3*b && i < a + 4*b) {
                l5.push(params[i])
                n5 = n4 - b;
            }
            if (n5 <= b && i >= a + 4*b && i < a + 4*b + n5) {
                l6.push(params[i])
            }
            if (n5 > b && i >= a + 4*b && i < a+ 5*b) {
                l6.push(params[i])
                n6 = n5 - b;
            }
            if (n6 <= b && i >= a+ 5*b && i< a+ 5*b + n6) {
                l7.push(params[i])
            }
            if (n6 > b && i >= a+ 5*b && i < a+ 6*b) {
                l7.push(params[i])
                n7 = n6 - b;
            }
            if (n7 <= b && i >= a+ 6*b && i< a+ 6*b + n7 ) {
                l8.push(params[i])
            }
            if (n7 > b && i >= a+ 6*b && i < a+ 7*b) {
                l8.push(params[i])
                n8 = n7 - b;
            }
            if (n8 <= b && i >=  a+ 7*b && i<  a+ 7*b + n8) {
                l9.push(params[i])
            }
            if (n8 > b && i >=  a+ 7*b && i <  a+ 8*b) {
                l9.push(params[i])
                n9 = n8 - b;
            }
            if (n9 <= b && i >=  a+ 8*b && i<  a+ 8*b + n9) {
                l10.push(params[i])
            }
            if (n9 > b && i >=  a+ 8*b && i < a+ 9*b) {
                l10.push(params[i])
                n10 = n9 - b;
            }
            if (n10 <= b && i >= a+ 9*b && i< a+ 9*b + n10) {
                l11.push(params[i])
            }
            if (n10 > b && i >= a+ 9*b && i < a+ 10*b) {
                l11.push(params[i])
                n11 = n10 - b;
            }
            if (n11 <= b && i >= a+ 10*b && i < a+ 10*b + n11) {
                l12.push(params[i])
            }
            if (n11 > b && i >= a+ 10*b && i < a+ 11*b) {
                l12.push(params[i])
                n12 = n11 - b;
            }
            if (n12 <= b && i >= a+ 11*b && i< a+ 11*b + n12) {
                l13.push(params[i])
            }
            if (n12 > b && i >= a+ 11*b && i < a+ 12*b) {
                l13.push(params[i])
                n13 = n12 - b;
            }
            if (n13 <= b && i >= a+ 12*b && i< a+ 12*b + n13) {
                l14.push(params[i])
            }
            if (n13 > b && i >= a+ 12*b && i < a+ 13*b) {
                l14.push(params[i])
                n14 = n13 - b;
            }
            if (n14 <= b && i >= a+ 13*b && i< a+ 13*b + n2) {
                l15.push(params[i])
            }
            if (n14 > b && i >= a+ 13*b && i < a+ 14*b) {
                l15.push(params[i])
                n15 = n14 - b;
            }
            if (n15 <= b && i >= a+ 14*b && i< a+ 14*b + n15) {
                l16.push(params[i])
            }
            if (n15 > b && i >= a+ 14*b && i < a+ 15*b) {
                l16.push(params[i])
                n16 = n15 - b;
            }
            if (n16 <= b && i >= a+ 15*b && i< a+ 15*b + n16) {
                l17.push(params[i])
            }
            if (n16 > b && i >= a+ 15*b && i < a+ 16*b) {
                l17.push(params[i])
                n17 = n16 - b;
            } 
            if (n17 <= b && i >= a+ 16*b && i < a+ 16*b + n17) {
                l18.push(params[i])
            }
            if (n17 > b && i >= a+ 16*b && i < a+ 17*b) {
                l18.push(params[i])
                n18 = n17 - b;
            }
            if (n18 <= b && i >= a+ 17*b && i < a+ 17*b + n18) {
                l19.push(params[i])
            }
            if (n18 > b && i >= a+ 17*b && i < a+ 18*b) {
                l19.push(params[i])
                n19 = n18 - b;
            }
            if (n19 <= b && i >= a+ 18*b && i< a+ 18*b + n19) {
                l20.push(params[i])
            }
            if (n19 > b && i >= a+ 18*b && i < a+ 19*b) {
                l20.push(params[i])
            }

        }
        return {
            l1: l1,
            l2: l2,
            l3: l3,
            l4: l4,
            l5: l5,
            l6: l6,
            l7: l7,
            l8: l8,
            l9: l9,
            l10: l10,
            l11: l11,
            l12: l12,
            l13: l13,
            l14: l14,
            l15: l15,
            l16: l16,
            l17: l17,
            l18: l18,
            l19: l19,
            l20: l20,
            total: total
        }
    }
    addNewlines(str, n) {
        let result = '';
        while (str.length > 0) {
            result += str.substring(0, n) + '\n';
            str = str.substring(n);
        }
    return result;
    }
    render() {
        const { devis, firstname, lastname, phone, dateCreation, sex, adresse, isQuotation, isInvoice, loginUserByUsername } = this.state;
        let dateFrench = now.toLocaleDateString('fr-FR', this.optionsDate);
        let returnArrays = null;
        console.log('devis:', devis)
        let produits = [];
        let produitsTest = []
        let produits1 = [];
        let produits2 = [];
        let produits3 = [];
        let produits4 = [];
        let produits5 = [];
        let produits6 = [];
        let produits7 = [];
        let produits8 = [];
        let produits9 = [];
        let produits10 = [];
        let produits11 = [];
        let produits12 = [];
        let produits13 = [];
        let produits14 = [];
        let produits15 = [];
        let produits16 = [];
        let produits17 = [];
        let produits18 = [];
        let produits19 = [];
        let produits20 = [];
        let total = 0;
        let produitsView1 = null;
        let produitsView2 = null;
        let produitsView3 = null;
        let produitsView4 = null;
        let totalView = null;
        let length = 48
        let maxlength = 96
        let tst = 'Pulvérisateur à dos manuel Ingco 16 litrespppppppppppppp'
        
        console.log('tst:', tst.length)
        produitsTest = [
            { id: 0, designation: 'PulvérisateuràdosmanuelIngo16', quantity:1, price: 175000, totalPrice: Math.round(175000) },
            { id: 1, designation: 'ppppppppppppppppppp', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500) },
            {
                id: 3, designation: 'Pulvérisateur à dos manuel Ingco 16', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 4, designation: 'Pulvérisateur à dos manuel Ingco 16', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 5, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 6, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 7, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 8, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 9, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 10, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 11, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 12, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 13, designation: 'Pulvérisateur à dos manuel Ingco 16 litres', quantity: 2, price: 17500, totalPrice: Math.round(2 * 17500),
            },
            {
                id: 14, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 15, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 16, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 17, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 18, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 19, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 20, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 21, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 22, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 23, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 24, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 25, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 26, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 27, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 28, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 29, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 30, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 31, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 32, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 33, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 34, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 35, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 36, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 37, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 38, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
            {
                id: 39, designation: 'Pulvérisateur à dos manuel Ingco 16 litresppppppppppppppppp', quantity: 2, price: 16000, totalPrice: Math.round(2 * 16000),
            },
        ]
        

        returnArrays = this.getArraysVente(produitsTest,8,12)
        if (returnArrays) {
            produits1 = returnArrays.l1
            produits2 = returnArrays.l2
            produits3 = returnArrays.l3
            produits4 = returnArrays.l4
            produits5 = returnArrays.l5
            produits6 = returnArrays.l6
            produits7 = returnArrays.l7
            produits8 = returnArrays.l8
            produits9 = returnArrays.l9
            produits10 = returnArrays.l10
            produits11 = returnArrays.l11
            produits12 = returnArrays.l12
            produits13 = returnArrays.l13
            produits14 = returnArrays.l14
            produits15 = returnArrays.l15
            produits16 = returnArrays.l16
            produits17 = returnArrays.l17
            produits18 = returnArrays.l18
            produits19 = returnArrays.l19
            produits20 = returnArrays.l20
            total = returnArrays.total
        }
        console.log('array 1 :', produits1)
        console.log('array 2 :', produits2.length)
        console.log('array 3 :', produits3.length)
        produitsView1 = produits1.map(dev => {
            return (
                <tr key={dev.id} style={{height:'30px'}}>
                    {
                        dev.designation.length > 48 && <td style={{ width: '500px', height: '90px', paddingTop: '35px', paddingBottom: '10px', textAlign: 'left' }}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>
                    }
                    {
                        dev.designation.length < 48 && <td style={{ width: '500px', height: '90px', paddingTop: '35px', paddingBottom: '10px', textAlign: 'left' }}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>
                    }
                    <td style={{width:'200px',height:'90px',paddingTop:'35px',paddingBottom:'10px',textAlign: 'center'}}>{dev.quantity}</td>
                </tr>
            );
        })
        produitsView2 = produits2.map(dev => {
            return (
                <tr key={dev.id} style={{height:'30px'}}>
                    {dev.designation.length > 48 && <td style={{ width: '500px', height: '90px', paddingTop: '35px', paddingBottom: '10px', textAlign: 'left' }}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    {dev.designation.length < 48 && <td style={{width:'500px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'left'}}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    <td style={{width:'200px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'center'}}>{dev.quantity}</td>
                </tr>
            );
        })
        produitsView3 = produits3.map(dev => {
            return (
                <tr key={dev.id} style={{height:'30px'}}>
                    {dev.designation.length > 48 && <td style={{ width: '500px', height: '90px', paddingTop: '35px', paddingBottom: '10px', textAlign: 'left' }}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    {dev.designation.length < 48 && <td style={{width:'500px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'left'}}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    <td style={{width:'200px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'center'}}>{dev.quantity}</td>
                </tr>
            );
        })
        produitsView4 = produits4.map(dev => {
            return (
                <tr key={dev.id} style={{height:'30px'}}>
                    {dev.designation.length > 48 && <td style={{ width: '500px', height: '90px', paddingTop: '35px', paddingBottom: '10px', textAlign: 'left' }}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    {dev.designation.length < 48 && <td style={{width:'500px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'left'}}>{this.addNewlines((dev.designation.substring(0, maxlength)), length)}</td>}
                    <td style={{width:'200px', height:'90px', paddingTop:'35px',paddingBottom:'10px',textAlign: 'center'}}>{dev.quantity}</td>
                </tr>
            );
        })
    
        return (
            <div>
                <div className="margin-vente">
                    <p id="image-domestique" className="left" style={{marginTop:'40px'}}>
                        <img src={logo_final} alt="Logo Kirikou" width = {5} height={5}/>
                    </p>
                    <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>BON DE LIVRAISON</h2>
                    <div className="space-between-home">
                        <div className="text-size-order">
                            <p style={{paddingTop:'35px'}}><span>{sex === 'Masculin' ? 'M.' + ' ' + firstname.toUpperCase() + ' ' + lastname.toUpperCase() : ''}</span></p>
                            <p><span>{sex === 'Feminin' ? 'Mme.' +' '+ firstname.toUpperCase()  +' '+lastname.toUpperCase() :''}</span></p>
                            <p><span>{adresse.toUpperCase()}</span></p>
                            <p><span>{phone}</span></p>
                        </div>
                        <div className="text-size-order">
                            <p className="text-right">Numéro de commande : <span>{devis.ref_devis}
                            </span></p>
                            <p className="text-right">Date de commande : <span>{dateCreation}
                            </span></p>
                            <p className="text-right" style={{width:'500px'}}>Mode de paiement : En espèces ou par chèque</p>
                            <p className="text-right">Conditions d'expédition : <span> LIVRAISON OFFERTE</span></p>
                        </div>
                    </div>
                    <div className="border-client-black-vente row">
                            <h5 className = "widthRegular" style={{width:'650px', fontWeight:'bold'}}>Désignation produits</h5>
                            <h5 style={{fontWeight:'bold', textAlign:'right'}} className="regulator">Quantité</h5>
                    </div>
                    <div style={{ marginTop: '-14px' }}>
                        {produits1.length !== null && produits2.length === 0 && (
                        <>
                        <table className ="table table-striped">
                            <tbody>
                                {produitsView1}
                            </tbody>
                        </table>
                        
                        {produits1.length === 1  && <div className="text-right text-right-venteBL1_1"><h5>1/1</h5></div>}
                        {produits1.length === 2  && <div className="text-right text-right-venteBL1_2"><h5>1/1</h5></div>}
                        {produits1.length === 3  && <div className="text-right text-right-venteBL1_3"><h5>1/1</h5></div>}
                        {produits1.length === 4  && <><div className="text-right text-right-venteBL1_4"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        <div className="text-right-venteBL1_4_1"><h5>2/2</h5></div>
                        </>
                        }
                        {produits1.length === 5  && <><div className="text-right text-right-venteBL1_5"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        <div className="text-right-venteBL1_4_1"><h5>2/2</h5></div>
                        </>
                        }
                        {produits1.length === 6  && <><div className="text-right text-right-venteBL1_6"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        <div className="text-right-venteBL1_4_1"><h5>2/2</h5></div>
                        </>
                        }
                        {produits1.length === 7  && <><div className="text-right text-right-venteBL1_7"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        <div className="text-right-venteBL1_4_1"><h5>2/2</h5></div>
                        </>
                        }
                        {produits1.length === 8  && <><div className="text-right text-right-venteBL1_8"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        <div className="text-right-venteBL1_4_1"><h5>2/2</h5></div>
                        </>
                        }
                        </>)}
                        {produits1.length === 8 && produits2.length !== 0 && produits3.length === 0&& (
                        <>
                        <table className="table table-striped">
                            <tbody>
                                {produitsView1}
                            </tbody>
                        </table>
                        {produits1.length === 8 && produits2.length <= 7 && <><div className="text-right text-right-venteBL_0"><h5>1/2</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        </>}
                        {produits1.length === 8 && produits2.length > 7 && <><div className="text-right text-right-venteBL_0"><h5>1/3</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        </>}
                        <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView2}
                            </tbody>
                        </table>
                        {produits1.length===8 && produits2.length === 1 && (
                            <div className="text-right text-right-venteBL_1">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 2 && (
                            <div className="text-right text-right-venteBL_2">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 3 && (
                            <div className="text-right text-right-venteBL_3">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 4 && (
                            <div className="text-right text-right-venteBL_4">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 5 && (
                            <div className="text-right text-right-venteBL_5">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 6 && (
                            <div className="text-right text-right-venteBL_6">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 7 && (
                            <div className="text-right text-right-venteBL_7">
                                <h5>2/2</h5>
                            </div>
                        )}
                        {produits1.length===8 && produits2.length === 8 && (
                            <>
                            <div className="text-right text-right-venteBL_8">
                                <h5>2/3</h5>
                            </div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_8_1">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 9 && (
                            <>
                            <div className="text-right text-right-venteBL_9">
                                <h5>2/3</h5>
                            </div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_8_1">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 10 && (
                            <>
                            <div className="text-right text-right-venteBL_10">
                                <h5>2/3</h5>
                            </div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_8_1">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                         {produits1.length===8 && produits2.length === 11 && (
                            <>
                            <div className="text-right text-right-venteBL_11">
                                <h5>2/3</h5>
                            </div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_8_1">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && (
                            <>
                            <div className="text-right text-right-venteBL_12">
                                <h5>2/3</h5>
                            </div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_8_1">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
    
                        </>)}
                        {produits1.length === 8 && produits2.length === 12 && produits3.length !== 0 && produits4.length === 0 && (
                        <>
                        <table className="table table-striped">
                            <tbody>
                                {produitsView1}
                            </tbody>
                        </table>
                        {produits1.length === 8 && produits2.length === 12 && produits3.length <=7 
                        &&<><div className="text-right text-right-venteBL_0"><h5>1/3</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        </>}
                        {produits1.length === 8 && produits2.length === 12 && produits3.length > 7 
                        &&<><div className="text-right text-right-venteBL_0"><h5>1/4</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        </>}
                        <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView2}
                            </tbody>
                        </table>
                        {produits1.length === 8 && produits2.length === 12 && produits3.length <=7  && (
                            <>
                                <div className="text-right text-right-venteBL_12">
                                    <h5>2/3</h5>
                                </div>
                                <p style={{ pageBreakAfter: "always" }}></p>
                            </>
                        )}
                        {produits1.length === 8 && produits2.length === 12 && produits3.length > 7  && (
                            <>
                                <div className="text-right text-right-venteBL_12">
                                    <h5>2/4</h5>
                                </div>
                                <p style={{ pageBreakAfter: "always" }}></p>
                            </>
                        )}
                         <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView3}
                            </tbody>
                        </table>
                        {produits1.length===8 && produits2.length === 12 && produits3.length===1 && (
                            <>
                            <div className="text-right text-right-venteBL_13">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length===2 && (
                            <>
                            <div className="text-right text-right-venteBL_14">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length===3 && (
                            <>
                            <div className="text-right text-right-venteBL_15">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length===4 && (
                            <>
                            <div className="text-right text-right-venteBL_16">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        
                        {produits1.length===8 && produits2.length === 12 && produits3.length===5 && (
                            <>
                            <div className="text-right text-right-venteBL_17">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        
                        {produits1.length===8 && produits2.length === 12 && produits3.length===6 && (
                            <>
                            <div className="text-right text-right-venteBL_18">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length=== 7 && (
                            <>
                            <div className="text-right text-right-venteBL_19">
                                <h5>3/3</h5>
                            </div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length=== 8 && (
                            <>
                            <div className="text-right text-right-venteBL_20"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_20_1"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length=== 9 && (
                            <>
                            <div className="text-right text-right-venteBL_21"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_20_1"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length=== 10 && (
                            <>
                            <div className="text-right text-right-venteBL_22"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_20_1"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length=== 11 && (
                            <>
                            <div className="text-right text-right-venteBL_23"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_20_1"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && (
                            <>
                            <div className="text-right text-right-venteBL_24"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <div className="text-right text-right-venteBL_20_1"><h5>4/4</h5></div>
                            </>
                        )}
                        
                        </>)}
                        {produits1.length === 8 && produits2.length === 12 && produits3.length !== 0 && produits4.length !== 0 && produits5.length === 0 && (
                        <>
                        <table className="table table-striped">
                            <tbody>
                                {produitsView1}
                            </tbody>
                        </table>
                        {produits1.length === 8 && produits2.length === 12 && produits3.length > 7 
                        &&<><div className="text-right text-right-venteBL_0"><h5>1/4</h5></div>
                        <p style={{ pageBreakAfter: "always" }}></p>
                        </>}
                        <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView2}
                            </tbody>
                        </table>
                        {produits1.length === 8 && produits2.length === 12 && produits3.length > 7  && (
                            <>
                                <div className="text-right text-right-venteBL_12">
                                    <h5>2/4</h5>
                                </div>
                                <p style={{ pageBreakAfter: "always" }}></p>
                            </>
                        )}
                         <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView3}
                            </tbody>
                        </table>
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && (
                            <>
                            <div className="text-right text-right-venteBL_24"><h5>3/4</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            </>
                        )}
                        <table style={{marginTop:'70px'}} className="table table-striped">
                            <tbody>
                                {produitsView4}
                            </tbody>
                        </table>
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 1 && (
                            <>
                            <div className="text-right text-right-venteBL_25"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 2 && (
                            <>
                            <div className="text-right text-right-venteBL_26"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 3 && (
                            <>
                            <div className="text-right text-right-venteBL_27"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 4 && (
                            <>
                            <div className="text-right text-right-venteBL_28"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 5 && (
                            <>
                            <div className="text-right text-right-venteBL_29"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 6 && (
                            <>
                            <div className="text-right text-right-venteBL_30"><h5>4/4</h5></div>
                            </>
                        )}
                        {produits1.length===8 && produits2.length === 12 && produits3.length === 12 && produits4.length === 7 && (
                            <>
                            <div className="text-right text-right-venteBL_31"><h5>4/4</h5></div>
                            </>
                        )}
                        </>)}
                    </div>
                </div>
                {produits1.length === 1 && (
                 <div className="space-between-venteBL1_1">
                 <div>
                     <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                 </div>
                 <div>
                     <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                     <h4 className="space-left">
                         {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                     </h4>
                 </div>
                </div>
                )}
                {produits1.length === 2 && (
                 <div className="space-between-venteBL1_2">
                 <div>
                     <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                 </div>
                 <div>
                     <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                     <h4 className="space-left">
                         {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                     </h4>
                 </div>
                </div>
                )}
                {produits1.length === 3 && (
                 <div className="space-between-venteBL1_3">
                 <div>
                     <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                 </div>
                 <div>
                     <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                     <h4 className="space-left">
                         {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                     </h4>
                 </div>
                </div>
                )}
                {(produits1.length === 4 || produits1.length === 5 || produits1.length === 6 || produits1.length === 7 || produits1.length === 8) && produits2.length === 0 && (
                 <div className="space-between-venteBL1_4">
                 <div>
                     <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                 </div>
                 <div>
                     <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                     <h4 className="space-left">
                         {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                     </h4>
                 </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 1 && (
                <div className="space-between-venteBL_1">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 2 && (
                <div className="space-between-venteBL_2">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 3 && (
                <div className="space-between-venteBL_3">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 4 && (
                <div className="space-between-venteBL_4">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 5 && (
                <div className="space-between-venteBL_5">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 6 && (
                <div className="space-between-venteBL_6">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length === 7 && (
                <div className="space-between-venteBL_7">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && (produits2.length === 8 ||produits2.length === 9 || produits2.length === 10 || produits2.length ===  11 || produits2.length ===  12)&& produits3.length ===0 && (
                <div className="space-between-venteBL_8">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  1 && (
                <div className="space-between-venteBL_9">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  2 && (
                <div className="space-between-venteBL_10">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  3 && (
                <div className="space-between-venteBL_11">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  4 && (
                <div className="space-between-venteBL_12">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  5 && (
                <div className="space-between-venteBL_13">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  6 && (
                <div className="space-between-venteBL_14">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  7 && (
                <div className="space-between-venteBL_15">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && (produits3.length ===  8||produits3.length === 9 || produits3.length === 10 || produits3.length ===  11 || produits3.length ===  12) && produits4.length === 0 && (
                <div className="space-between-venteBL_16">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 1 && (
                <div className="space-between-venteBL_17">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 2 && (
                <div className="space-between-venteBL_18">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 3 && (
                <div className="space-between-venteBL_19">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                 {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 4 && (
                <div className="space-between-venteBL_20">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 5 && (
                <div className="space-between-venteBL_21">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 6 && (
                <div className="space-between-venteBL_22">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 7 && (
                <div className="space-between-venteBL_23">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                {produits1.length === 8 && produits2.length ===  12 && produits3.length ===  12 && produits4.length === 8 && (
                <div className="space-between-venteBL_23">
                    <div>
                        <h4>Fait à Dakar (Sénégal), le {dateFrench}</h4>
                    </div>
                    <div>
                        <div className="space-right"><h4>LE SERVICE COMMERCIAL:</h4><br /></div>
                        <h4 className="space-left">
                            {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                        </h4>
                    </div>
                </div>
                )}
                <div id="image2" className="text-right"><img src={Cachet_Kirikou}
                    alt="Cachet Kirikou"/>
                </div>
                <div className="font-smaller footer">
                    <p>
                        KIRIKOU Sarl<br />RC: SN.DKR.2018.B.20233/NINEA: 0069399642Y2<br />Siège social : DAKAR(Sénégal), Yoff Cité BIAGUI, rue YF-496<br />
                        Site internet: <span className="text-primary">www.kirikousystems.com</span> | Email :<span className="text-primary">contact@kirikousystems.com </span><br />Service client : +221 78 601 88 88 | +221 33 860 30 73 | +221 77 277 00 56
                    </p>
                </div>
            </div>
        )
    }
}
