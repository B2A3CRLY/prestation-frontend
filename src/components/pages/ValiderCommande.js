import React, { Component } from 'react';
import Hero from '../common/hero';
import { apiUrl } from "../../config.json";
import TestWhatsApp from './TestwhatsApp';
import { Link } from 'react-router-dom';
import WhatsAppWidget from 'react-whatsapp-widget' //for support team
import 'react-whatsapp-widget/dist/index.css'
import ReactWhatsapp from 'react-whatsapp';
import Pagination from "react-js-pagination";
import '../../custom.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import http from '../../services/httpService';
import {webSocket} from 'rxjs/webSocket';
import { Button, Form, Modal,Table} from 'react-bootstrap';
const apiAgent = apiUrl + '/agent/';
const apiDevis = apiUrl + '/devisVente/';
const apiFilterDevis = apiUrl + '/getnumber/';
const tokenKey = 'token';
const orangeUrlToken = 'https://api.orange.com/oauth/v3/token'
const authorization_header ='Basic TjJlMG1UeFhFckxNemxLVkhrbjVVYm55R2FmajYyclY6SlBlRUdYeXhvbHhtUGtYSg=='
const access_token = 'pIeL8mPyWwEw7Pp9xONOjkTlUM8U' 
const YOUR_CLIENT_ID = 'N2e0mTxXErLMzlKVHkn5UbnyGafj62rV'
const YOUR_CLIENT_SECRET = 'JPeEGXyxolxmPkXJ'
const YOUR_API_IDENTIFIER = '0c2U1NBFtH4Cshun'
const queryString = require('query-string');
const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const now = new Date();
const listNumber = [];
const ws = webSocket('wss://kirikousocketserver.herokuapp.com');
const notyf = new Notyf({
    duration: 4000,
    position: {
        x: 'right',
        y:'top'
    },
    types: [
        {
            type: 'error',
            duration: '4000',
            dismissible:'true'
        },
        {
            type: 'success',
            duration: '4000',
            dismissible:'true'
        },
        {
            type: 'blueSuccess',
            duration: '4000',
            dismissible: 'true',
            background: 'blue',
        },
        {
            type: 'warning',
            duration: '4000',
            dismissible: 'true',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        }
    ]
});
export default class ValiderCommande extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            devis: '',
            sales: '',
            agents: '',
            agent: '',
            ventes: '',
            listDevis: '',
            messageSmS: 'Bonjour',
            numeroKirikou:221775977255,
            show: false,
            showValidation: false,
            activePage: 1,
            search: '',
            client: '',
            firstname: '',
            lastname: '',
            agentFirstname: '',
            agentLastname: '',
            agentsPerPage: 3,
            codeAgent: '',
            order_ongoing: '',
            number:'',
            phone: '',
            adresse:'',
            sex:'',
            idDevis: '',
            idAgent:'',
            isQuotation: '',
            isInvoice: '',
            loginUserByUsername: '',
            selectedFile: '',
            isFilePicked: false,
        }
    }
    async refreshDevis() {
        const idDevis = this.props.match.params.id;
        console.log('id : ',idDevis)
        const { data: devis } = await http.get(apiDevis + 'detail/' + idDevis);
        const { data: listDevis} = await http.get(apiDevis);
        console.log('listes : ', listDevis)
        this.setState({ devis, client: devis.client, firstname: devis.client.clientFirstName, lastname: devis.client.clientLastName,adresse:devis.client.clientAddress,phone: devis.client.clientPhone, dateCreation: devis.date_creation,sex:devis.client.gender,idDevis,isQuotation:devis.isQuotation, isInvoice: devis.isInvoice, sales:devis.sales, listDevis});
    }
    async componentWillMount() {
        this.refreshDevis();
        this.refreshAgents();
    }
    handleChangeFile = (event) => {
        this.setState({selectedFile: event.target.files[0], isFilePicked:true})
    }
    handleClose = () => {
        this.setState({ show: false });
    }
      handleShow = () => {
        this.setState({ show: true });
    }
    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }
    onChoice(id,code, order_ongoing,agentFirstname, agentLastname, agent) {
        this.setState({
            idAgent:id,
            codeAgent: code,
            order_ongoing,
            agentFirstname,
            agentLastname,
            agent,
            show: false
        });   
    }
    async refreshAgents(){
        await http.get(apiAgent).then((res)=>{
        this.setState({
            agents: res.data
        })
        });
    }
    countOrder = (code, id) => {
        const params = {
            code: code
        }
        http.post(apiFilterDevis, params).then(res => {
            console.log('res: ', res.data + ' id: ', id)
            const number = {
                order_ongoing: res.data
            }
            http.put(apiAgent + 'update/' + id + '/', number)
            .then(res => {
            console.log('data ', res.data);
            })
        })
        
    }
    sendLinkClient = (email, order, file) => {
        let formData = new FormData()
        formData.append('order', order)
        formData.append('email', email)
        formData.append('file', file)
        http.post(apiUrl + '/tracking/commande', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            console.log('email:', res)
            if (res.status === 200) {
                notyf.success('email envoyé au client avec succées !')
            }
            if (res.status !== 200) {
                notyf.error('Oops une erreur s\'est produite !')
          }
        })
        
    }
    sendEmailClientWithoutFile = (email, order) => {
        const emailInfos = {
            email: email,
            order: order
        }
        http.post(apiUrl + '/download/facture', emailInfos).then(res => {
            console.log('email:', res)
            if (res.status === 200) {
                notyf.success('email envoyé au client avec succées !')
            }
        }).catch(error => {
            if (error.response) {
                    notyf.error('email non envoyé !')
                }
            })
        
    }
    sendwhatsAppMessage = (phone, document) => {
        return `https://api.whatsapp.com/send?phone=' + ${phone} + '&text=Bonjour         veuillez%20télécharger%20votre%20devis%20en%20cliquant%20sur%20ce%20lien: ' + 
        ${document}`
        
    }
    sendSMS(recipient_phone_number, dev_phone_number, message) {
        const url =
            `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${dev_phone_number}/requests`
        const headers = {
            "Content-type":"application/json",
            "Authorization": `Bearer ${access_token}` 
        }
        const body = {
            "outboundSMSMessageRequest": {
                "address": `tel:+${recipient_phone_number}`,
                "senderAddress": `tel:+${dev_phone_number}`,
                "outboundSMSTextMessage": {
                    "message": message
                }
            
            }
        }
        http.post(url,body,{headers: headers,}).then(res => {
            console.log('status :', res.status);
            console.log('res :', res.data);
            if (res.status === 201) {
                notyf.success('sms envoyé avec succés !');
            }}).catch(err => {
            if (err.response) {
                notyf.error('Une erreur s\'est produite')
            } else if (err.request) {
                console.log(err)
            } else {
                notyf.error('Une erreur inattendue s\'est produite')
            }
        })
        
    }
    getToken = () => {
        http.get(orangeUrlToken,
        {
            data: {
                
                grant_type: 'client_credentials',
                client_id: YOUR_CLIENT_ID,
                client_secret: YOUR_CLIENT_SECRET,
                audience: YOUR_API_IDENTIFIER
            }
        },
        {
            headers: {
                "Authorization": `Bearer ${authorization_header}`,
                "Content-type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
        }
        ).then(res => {
            console.log('status_access_token :', res.status);
            console.log('access_token :', res);
            if (res.status === 200) {
                notyf.success('token obtenu avec succés !');
            }
        }).catch(err => {
            if (err.response) {
                notyf.error('Une erreur s\'est produite')
            } else if (err.request) {
                console.log(err)
            } else {
                notyf.error('Une erreur inattendue s\'est produite')
            }
        })
    }
    refreshPage() {
        window.location.reload(false);
    }
    onSubmitDevisFile = (e) => {
        e.preventDefault();
        const {selectedFile } = this.state;
        const idDevis = this.props.match.params.id;
        let formData = new FormData();
        formData.append('document', selectedFile, selectedFile.name)
        console.log('formData:', formData)
        http.put(apiDevis + 'update/' + idDevis + '/' ,formData)
                .then(res => {
                    if (res.status === 200) {
                        notyf.open({
                            type: 'blueSuccess',
                            message:'fichier enregistré avec succées !'
                        })
                        this.setState({showValidation: true})
                    } if (res.status === 500) {
                        notyf.error('Oops une erreur s\'est produite !')
                }
        })
    }
    onSubmitDevis = (e) => {
        e.preventDefault();
        const idDevis = this.props.match.params.id;
        const { idAgent, order_ongoing, agent, devis} = this.state;
        const devisUpdated = {
            agent: idAgent,
            isInvoice: true,
            isQuotation: false
        }
       
        if (devis.agent === null) {
            const number = {
                order_ongoing: 1 + order_ongoing
            }
            http.put(apiDevis + 'valider-commande/' + idDevis + '/' , devisUpdated)
                .then(res => {
                    console.log('devis:', res.data);
                    console.log('id:', res.data.id);
                    console.log('status :', res.status);
                    if (res.status === 200) {
                        notyf.success('Commande assignée avec succées !')
                        this.setState({
                            agentFirstname: '',
                            agentLastname:  ''
                        })
                        http.put(apiAgent + 'update/' + idAgent + '/' , number)
                        .then(res => {
                            console.log('Agent mise à jour:', res.data);
                            console.log('IdAgent_A_Jour:', res.data.id);
                            console.log('Status_Agent_A_Jour :', res.status);
                            if (res.status === 200) {
                                //this.refreshAgents();
                                ws.next({ message: devis.code, type: 'message' });
                                this.sendLinkClient(devis.client.clientEmail,devis.code);
                                notyf.success('devis assigné avec succés !')
                                setTimeout(this.refreshPage(), 100000)
                            } 
                        });
                    } if (res.status === 500) {
                        notyf.error('Oops une erreur s\'est produite !')
                  }
                })
                .catch(error =>{console.log(error)})
        }
        if (devis.agent !== null && devis.agent.id === agent.id) {
            notyf.open({
                type: 'warning',
                message:'Impossible ! Commande déja assignée à cet agent.'
            })
        }
        if (devis.agent !== null && devis.agent.order_ongoing >=1 && devis.agent.id !== agent.id) {
            const numberNew = {
                order_ongoing: 1 + order_ongoing
            }
            const numberOld = {
                order_ongoing: devis.agent.order_ongoing - 1
            }
            http.put(apiDevis + 'valider-commande/' + idDevis + '/' , devisUpdated)
                .then(res => {
                    console.log('devis:', res.data);
                    console.log('id:', res.data.id);
                    console.log('status :', res.status);
                    if (res.status === 200) {
                        notyf.success('Agent remplacé avec succés !')
                        this.setState({
                            agentFirstname: '',
                            agentLastname:  ''
                        })
                        http.put(apiAgent + 'update/' + idAgent + '/' , numberNew)
                        .then(res => {
                            console.log('Agent mise à jour:', res.data);
                            console.log('IdAgent_A_Jour:', res.data.id);
                            console.log('Status_Agent_A_Jour :', res.status); 
                        });
                        if (devis.agent.id) {
                            http.put(apiAgent + 'update/' + devis.agent.id + '/' , numberOld)
                        .then(res => {
                            console.log('Agent remplacé:', res.data);
                            console.log('IdAgent_Remplacé:', res.data.id);
                            console.log('Status_Agent_Remplacé :', res.status);
                            if (res.status === 200) {
                                //ws.next({ message: devis.code, type: 'message' });
                                this.sendEmailClientWithoutFile(devis.client.clientEmail,devis.code);
                                setTimeout(this.refreshPage(), 100000)
                            } 
                        });
                        }
                  } else {
                    alert("Une erreur s'est produite");
                }
            });
        }
    }
    canBeValidAgent(){
        return this.state.agentFirstname && this.state.agentLastname && this.state.selectedFile;
    }
    render() {
        const { agents, order_ongoing, idAgent, devis, activePage, agentsPerPage,selectedFile, isFilePicked, showValidation, phone, client,messageSmS, numeroKirikou}= this.state;
        console.log('fichier : ', selectedFile)
        const indexOfLastAgent = activePage * agentsPerPage;
        const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
        const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);
        const isEnabled = this.canBeValidAgent()
        ws.subscribe(
            value => console.log(value.message),
            error => console.log(error),
            () => console.log('Complete')
        );
        console.log('Order : ', order_ongoing, 'idAgent : ', idAgent, 'Agent : ',devis.agent);
        let filterAgent = currentAgents.length ? currentAgents.filter((agent)=>{
            let clientInfos = agent.user_agent.first_name.toLowerCase() +
                agent.user_agent.last_name.toLowerCase() + agent.code_agent.toLowerCase();
            return clientInfos.indexOf(this.state.search.toLowerCase())!==-1;
          }) : [];
        let agentsView = filterAgent.map((agent) => {
            return(
            <tr key={agent.id}>
              <td>{agent.user_agent.first_name + ' ' + agent.user_agent.last_name}</td>
              <td style={{textAlign:'center'}}>{agent.order_ongoing}</td>
              <td><Button variant="primary" size="sm" style={{textAlign:'center'}} onClick={this.onChoice.bind(this,agent.id,agent.code_agent,agent.order_ongoing,agent.user_agent.first_name,agent.user_agent.last_name, agent)}>choisir</Button></td>
            </tr>
            )
          })
        let agentsHistorique = filterAgent.map((agent) => {
            return(
            <tr key={agent.id}>
            <td>{agent.user_agent.first_name + ' ' + agent.user_agent.last_name}</td>
            <td style={{textAlign:'center'}}>{agent.order_ongoing}</td>
            </tr>
            )
        })
        const styles = {
            border: '1px solid green',
            backgroundColor: 'white',
            width: '900px',
            marginLeft:'100px',
            textAlign: 'center',
            marginTop:'20px',
            color: 'green'
        }
        return (
            <>
                <Hero hero="defaultHeroConfirmVente">
                    <div className="container">
                        {devis.agent ? <h1 style={styles}>La commande a été assignée à l'agent {devis.agent.user_agent.first_name + ' ' + devis.agent.user_agent.last_name}</h1> : <h1 style={styles}>La commande n'est liée à aucun agent pour le moment.</h1>}
                            <div className="row">
                            <div className="col-md-1"></div>
                            <div className="card mt-2 mr-2 col-md-5 text-white bg-white">
                                    <div className="card-body">
                                    <h3 className="text-success text-center mt-2">Confirmation Commande</h3>
                                    <form onSubmit={this.onSubmitDevisFile}>
                                    <div>
                                    <input type="file" name="file" onChange={this.handleChangeFile} />
                                        {isFilePicked ? (
                                            <div>
                                                <p style={{color:'green'}}>Nom fichier: {selectedFile.name}</p>
                                                <p style={{color:'green'}}>Type fichier: {selectedFile.type}</p>
                                                <p style={{color:'green'}}>Taille fichier: {(selectedFile.size)/1000} ko</p>
                                                <p style={{color:'green'}}>
                                                    dernière date modification:{' '}
                                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                        ) : (
                                            <p style={{color:'green'}}>Choisir un fichier !</p>
                                        )}
                                    </div> 
                                    <Button variant="primary" type="submit" size="sm" className="btn btn-success mt-2" disabled={!isFilePicked}>
                                            Enregistrer
                                    </Button>
                                    </form>
                                    {showValidation ? (
                                        <form onSubmit={this.onSubmitDevis}>
                                        <div className="form-group">
                                            <label>Nom Agent Choisi:  </label>
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            value={this.state.agentFirstname + ' ' + 
                                            this.state.agentLastname}
                                            onChange={this.handleChange}
                                            />      
                                        </div>
                                        <Button variant="secondary" size="sm" className="mt-2 mr-2" onClick={this.handleShow}>Choisir Agent</Button> 
                                        <Button variant="primary" type="submit" size="sm" className="btn btn-success mt-2" disabled={!isEnabled}>
                                                Valider
                                        </Button>
                                        </form>
                                    ) : 
                                    ''}
                                    {devis.document ? (<>
                                        <a className="btn btn-success mt-2 mr-2" href={this.sendwhatsAppMessage(phone, devis.document)}><i className="fab fa-whatsapp"></i>WhatsApp</a>
                                        <Button className="btn btn-success mt-2 mr-2" onClick={() => this.sendSMS(client.clientPhone, numeroKirikou, messageSmS)}>Send SmS</Button>
                                        <Button className="btn btn-success mt-2" onClick={()=>this.getToken()}>Get Token</Button>
                                        </>) : ''}
                                   </div>  
                                </div>
                                <div className="card mt-2 col-md-5">
                                    <div className="card-body">
                                        <h3 className="text-success text-center mt-2">Historique Agents</h3>
                                        <div>
                                        <Table striped>
                                            <thead className="thead-dark">
                                            <tr>
                                                <th style={{textAlign:'left'}}>Agent</th>
                                                <th>Commande en cours</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {agentsHistorique}
                                            </tbody>
                                        </Table>
                                        <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            prevPageText='prev'
                                            nextPageText='next'
                                            activePage={activePage}
                                            itemsCountPerPage={agentsPerPage}
                                            totalItemsCount={15}
                                            pageRangeDisplayed={5}
                                            onChange={this.handlePageChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className="text-success"><marquee direction="right">Choisir Agent !</marquee></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form className="form-inline mt-2 mb-2">
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Chercher agent"size="sm" />
                                    <Button className="btn btn-outline-success my-2 my-sm-0 text-light" size="sm" type="submit">Search</Button>
                                    </Form.Group>
                                </Form>
                                <div>
                                    <Table striped>
                                        <thead className="thead-dark">
                                        <tr>
                                            <th style={{textAlign:'left'}}>Agent</th>
                                            <th>Commande en cours</th>
                                            <th style={{textAlign:'center'}}>choisir</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {agentsView}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            prevPageText='prev'
                                            nextPageText='next'
                                            activePage={activePage}
                                            itemsCountPerPage={agentsPerPage}
                                            totalItemsCount={agents.length}
                                            pageRangeDisplayed={5}
                                            onChange={this.handlePageChange.bind(this)}
                                            />    
                                </div>
                            </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </Hero>
            </>
        )
    }
}
