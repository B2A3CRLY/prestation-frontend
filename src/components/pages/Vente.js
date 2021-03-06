import React, { Component } from 'react';
import Hero from '../common/hero';
import http from '../../services/httpService';
import Select from 'react-select';
import Image from '../common/image';
import { Notyf } from 'notyf';
import Pagination from "react-js-pagination";
import { Button, Form, Modal,Table} from 'react-bootstrap';
import auth from "../../services/authService";
import {
    apiUrl
  } from '../../config.json';
const apiClient = apiUrl + '/client/';
const apiVente = apiUrl + '/vente/';
const apiDevis = apiUrl + '/devisVenteCreate/';
const apiProduct = apiUrl + '/quantityVenteCreate/';
const options = [{ value: 'Masculin', label: 'Masculin' }, { value: 'Feminin', label: 'Feminin' }];
const tokenKey = 'token';
const idProductCollected = [];
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
export default class Vente extends Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
            clients: [],
            id: '',
            idProduct: '',
            ventes:'',
            firstName: '',
            lastName: '',
            selectedOption: '',
            activePage:1,
            clientsPerPage:5,
            quantity: '',
            sexe: '',
            address: '',
            email: '',
            pays:'',
            phone: '',
            people: '',
            ugs: '',
            img: '',
            price: '',
            marque: '',
            description : '',
            designation: '',
            show: false,
            showAdd: false,
            showProduct: false,
            createProduct: false,
            search:''
        }
    }
    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    handleShowProduct = () =>{
        this.setState({showProduct: true})
    }
    handleCloseProduct = () =>{
        this.setState({showProduct: false})
    }
    handleShowCreateProduct = () =>{
        this.setState({createProduct: true})
    }
    handleCloseCreateProduct = () =>{
        this.setState({createProduct: false})
    }
    handleShowAdd = () =>{
        this.setState({
            showAdd:true
        });
    }
    handleCloseAdd = () =>{
        this.setState({
            showAdd:false
        });
    }
    handleChangeSexe =(sexe)=>{
        this.setState({sexe});
        console.log(`Option selected:`, sexe["value"]);
    }
    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    setChecked = (checked) => {
        this.setState({ checked: !checked, checkedNo: checked})
    }
    setCheckedNo = (checked) => {
        this.setState({ checkedNo: !checked, checked: checked})
    }
    canBeSubmittedClient(){
        if(this.state.sexe){
       return(this.state.firstName.length>0 && this.state.lastName.length > 0 && this.state.phone.length > 0 && this.state.address.length>0 && this.state.pays.length > 0);
        }
    }
    onChoice(id,clientFirstName,clientLastName, phone){
        this.setState({
            id:id,
            firstName: clientFirstName,
            lastName: clientLastName,
            phone: phone,
            show: false
        });   
    }
    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }
    onSubmitClient = (e) =>{
        e.preventDefault();
           const client = {
           clientFirstName:this.state.firstName,
           clientLastName : this.state.lastName,
           clientPhone:this.state.phone,
           clientAddress:this.state.address,
           gender:this.state.sexe["value"],
           clientEmail:this.state.email ? this.state.email : null,
           isvente: true,
           pays: this.state.pays
          };
          http.post(apiClient + 'create/',client)
             .then(res => {
                 console.log('client:', res.data);
                 console.log('status :', res.data.status);
                 this.setState({
                 firstName: this.state.firstName,
                 lastName: this.state.lastName,
                 phone:'',
                 email: '',    
                 address:'',
                 sexe:'',
                 pays:'',
                 id: res.data.data.id
                 });
                 if (res.status === 200) {
                     notyf.success('Client ajouté avec succés !');
                     console.log('idClient : ', this.state.id)
                     this.setState({
                         showAdd : false
                     })
               } else {
                 notyf.error("Une erreur s'est produite");
             }
             });
         }
    onSubmitProduct = (e) => {
        e.preventDefault();
        const product = {
            vente: {id: this.state.selectedOption.id},
            quantity: this.state.quantity
        }
        http.post(apiProduct, product)
        .then(res => {
            console.log('devis:', res.data);
            console.log('id:', res.data.id);
            console.log('status :', res.status);
            this.setState({
                idProduct: res.data.id
            });
            if (res.status === 200) {
                notyf.success('produit ajouté avec succés !');
                idProductCollected.push({id : this.state.idProduct})
                this.setState({ showProduct: false })
                console.log('productCollected: ', idProductCollected)
                
          } 
        }).catch(err=>{
            if (err.response) {
              notyf.error("Une erreur s'est produite")
            }
        });
    }
    onSubmitCreateProduct = (e) =>{
       e.preventDefault();
       const product = {
           ugs: this.state.ugs,
           designation: this.state.designation,
           price: this.state.price,
           url: this.state.url,
           marque: this.state.marque
       }
       http.post(apiVente + 'create/', product)
             .then(res => {
                 console.log('produit:', res.data);
                 console.log('status :', res.data.status);
                 this.setState({

                 });
                 if (res.status === 200) {
                     notyf.success('produit ajouté avec succés !');
                     this.getVentes();
                     this.setState({
                         createProduct : false
                     })
               }}).catch(err=>{
                if (err.response) {
                  notyf.error("Une erreur s'est produite")
                }
            });
    }
    canBeSubmittedProduct (){
        return this.state.selectedOption && this.state.quantity;
    }
    canBeSubmittedCreateProduct (){
        return this.state.designation && this.state.price;
    }
    async componentDidMount() {
        const { data: clients } = await http.get(apiClient)
        console.log('Clients : ', clients);
        this.setState({ clients });
        this.getVentes();
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
    onSubmitDevis = (e) => {
        e.preventDefault();
        let token = auth.getJwt(tokenKey);
        const devis = {
            client: {id:this.state.id},
            sales: idProductCollected,
            isQuotation: this.state.checked,
            isInvoice: this.state.checkedNo
        }
        http.post(apiDevis, devis, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${token}`
            },}).then(res => {
                    console.log('devis:', res.data);
                    console.log('id:', res.data.id);
                    console.log('status :', res.status);
                    if (res.status === 200) {
                        notyf.success('Devis créé avec succés !');
                        this.toDevis();
                  }
                }).catch(err=>{
                    if (err.response) {
                      notyf.error("Une erreur s'est produite")
                    }
                });
        } 
    toDevis = () =>{
        window.location.href = '/liste-devis-vente';
    }
    
    render() {
        const { clients, ventes, sexe, selectedOption, checked, checkedNo, quantity,activePage,clientsPerPage, id } = this.state;
        const indexOfLastClient = activePage * clientsPerPage;
        const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
        console.log('devis : ', checked)
        console.log('idClient : ', id)
        console.log('facture : ', checkedNo)
        console.log('selectedOption: ', selectedOption, 'quantité:', quantity);
        const isEnabledProduct = this.canBeSubmittedProduct();
        const isEnabledCreateProduct = this.canBeSubmittedCreateProduct()
        console.log('img:',selectedOption ? selectedOption.img: '')
        const isEnabledAdd = this.canBeSubmittedClient();
        let filterClient = currentClients.length ? currentClients.filter((client)=>{
            let clientInfos = client.clientFirstName.toLowerCase() + client.clientLastName.toLowerCase() +
                + client.phone;
            return clientInfos.indexOf(this.state.search.toLowerCase())!==-1;
          }) : [];
          let customers = filterClient.map((client)=>{
            return(
            <tr key={client.id}>
              <td>{client.clientFirstName + ' ' + client.clientLastName}</td>
              <td>{client.clientPhone}</td>
              <td><Button variant="primary" size="sm" onClick={this.onChoice.bind(this,client.id,client.clientFirstName,client.clientLastName, client.clientPhone)}>choisir</Button></td>
            </tr>
            )
          })
        return (
            <Hero hero="defaultHeroVente">
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="card mt-2 col-md-6">
                    <div className="card-header mt-4">
						<h3 style={{textAlign:'center'}}>création d'un nouveau devis vente</h3>
  					</div>
                    <div className="card-body">
                            <form onSubmit={this.onSubmitDevis}>
                            <div className="form-group">
                                <label>Nom Client:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.firstName + ' ' + this.state.lastName}
                                onChange={this.handleChange}
                                    />
                                <Button variant="secondary" size="sm" className="mt-2 mr-2" onClick={this.handleShow}>Choisir client</Button>
                                <Button variant="secondary" size="sm" className="mt-2" onClick={this.handleShowAdd}>Créer nouveau client</Button>
                                    
                            </div>
                            <span></span>
                            <div className="form-group">
                            <label>Produit ajouté:  </label>
                                <input
                                readonly
                                type="text" 
                                className="form-control" 
                                value={selectedOption ? selectedOption.designation : ''}
                                    />
                            <label>Quantité:  </label>
                                <input
                                readonly
                                type="number" 
                                className="form-control" 
                                value={this.state.quantity}
                                onChange={this.handleChange}
                                />
                                <Button variant="secondary" size="sm" className="mt-2 mr-2" onClick={this.handleShowCreateProduct}>Créer produit</Button>
                                <Button variant="secondary" size="sm" className="mt-2" onClick={this.handleShowProduct}>Ajouter produit</Button>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                      checked></input>
                                <label className="form-check-label">
                                     Voulez-vous un devis ou une facture ?
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"
                                        checked={checked}
                                        
                                        onChange={() => this.setChecked(checked)}></input>
                                <label className="form-check-label">
                                     DEVIS
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedNo}
                                        onChange={() => this.setCheckedNo(checkedNo)}></input>
                                <label className="form-check-label">
                                     FACTURE
                                </label>
                            </div>
                            <Button variant="primary" type="submit" size="sm" className="btn btn-primary" click = {this.toDevis}>
                                    Créer devis
                            </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-success"><marquee direction="right">Choisir client !</marquee></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="form-inline mt-2 mb-2">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Chercher client"size="sm" />
                            <Button className="btn btn-outline-success my-2 my-sm-0 text-light" size="sm" type="submit">Search</Button>
                            </Form.Group>
                        </Form>
                        <div>
                            <Table striped>
                                <thead className="thead-dark">
                                <tr>
                                    <th>client</th>
                                    <th>phone</th>
                                    <th>choisir</th>
                                </tr>
                                </thead>
                                 <tbody>
                                        {customers}
                                 </tbody>
                            </Table>
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                prevPageText='prev'
                                nextPageText='next'
                                activePage={activePage}
                                itemsCountPerPage={clientsPerPage}
                                totalItemsCount={clients.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                            />    
                        </div>
                    </Modal.Body>
                    </Modal>
                </div>
                <div>
                    <Modal show={this.state.showAdd} onHide={this.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-success"><marquee direction="right">Ajouter un nouveau client !</marquee></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.onSubmitClient}>
                                <div className="form-group">
                                    <label>Prénom:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="firstName"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="lastName"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Adresse:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="address"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Téléphone:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="phone"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                <label>Sexe:  </label>
                                <Select
                                value={sexe}
                                onChange={this.handleChangeSexe}
                                options={options}
                                />
                                </div>
                                <div className="form-group">
                                    <label>Email:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="email"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pays:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="pays"
                                    onChange={this.handleChange}
                                    />
                                </div>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseAdd}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" className="btn btn-primary"  disabled={!isEnabledAdd}>
                                Ajouter Client
                            </Button>
                    </Modal.Footer>
                    </form>     
                    </Modal.Body>
                    </Modal>
                </div>
                <div>
                    <Modal show={this.state.showProduct}
                        onHide={this.handleCloseProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-success"><marquee direction="right">Ajout de produit (s)!</marquee></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.onSubmitProduct}>
                            <div className="form-group">
                                <label>Listes des produits:  </label>
                                <Select 
                                isSearchable={true}
                                getOptionLabel={option => option.designation}
                                value={selectedOption}
                                isClearable= {true}
                                onChange={this.handleChangeSelect}
                                options={ventes} />
                            </div>
                            {selectedOption && <>
                               <div className="form-group">
                                    <label>Quantité:  </label>
                                    <input 
                                    type="number"
                                    placeholder = "1,2,3....."
                                    className="form-control" 
                                    name="quantity"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <Image vente={selectedOption}/>
                            </>}       
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseProduct}>
                                Close
                        </Button>
                        <Button variant="primary" type="submit" className="btn btn-primary"  disabled={!isEnabledProduct}>
                                Valider
                        </Button>
                    </Modal.Footer>
                    </form>     
                    </Modal.Body>
                    </Modal>
                </div>
                <div>
                    <Modal show={this.state.createProduct}
                        onHide={this.handleCloseCreateProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-success"><marquee direction="right">Création de produit (s)!</marquee></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.onSubmitCreateProduct}>
                            <div className="form-group">
                                <label>Référence:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="ugs"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Désignation:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="designation"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prix:  </label>
                                <input 
                                type="number" step = "any"
                                className="form-control" 
                                name="price"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Marque:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="marque"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Url de l'image:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="https://kirikousystems.com/nom_image"
                                name="img"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                name="description"
                                onChange={this.handleChange}
                                />
                            </div>   
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseCreateProduct}>
                                Close
                        </Button>
                        <Button variant="primary" type="submit" className="btn btn-primary"  disabled={!isEnabledCreateProduct}>
                                Valider
                        </Button>
                    </Modal.Footer>
                    </form>     
                    </Modal.Body>
                    </Modal>
                </div>
            </div>
            </Hero>
        )   
    }
    
}