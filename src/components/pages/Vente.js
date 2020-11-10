import React, { Component} from 'react';
import http from '../../services/httpService';
import Select from 'react-select';
import { Button, Form, Modal,Table} from 'react-bootstrap';
import {
    apiUrl
  } from '../../config.json';
const apiClient = apiUrl + '/client/';
const apiVente = apiUrl + '/vente/';
const apiDevis = apiUrl + '/devisDomestique/';
const options = [{ value: 'Masculin', label: 'Masculin' }, { value: 'Feminin', label: 'Feminin' }];
export default class Vente extends Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
            clients: [],
            id: '',
            ventes:'',
            firstName: '',
            lastName: '',
            selectedOption: '',
            quantity: '',
            sexe: '',
            address: '',
            email: '',
            pays:'',
            phone: '',
            people: '',
            show: false,
            showAdd: false,
            showProduct: false,
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
                     alert('Client ajouté avec succés !');
                     console.log('idClient : ', this.state.id)
                     this.setState({
                         showAdd : false
                     })
               } else {
                 alert("Une erreur s'est produite");
             }
             });
         }
    onSubmitProduct = () =>{

    }
    canBeSubmittedProduct (){
        return true;
    }
    async componentDidMount() {
        const { data : clients } = await http.get(apiClient);
        const { data : ventes } = await http.get(apiVente);
        console.log('Clients : ', clients);
        console.log('Ventes : ', ventes);
        this.setState({ clients, ventes});
    }
    onSubmitDevis = (e) => {
        e.preventDefault();
        const devis = {
            client: this.state.id,
        }
        http.post(apiDevis + 'create/', devis)
                .then(res => {
                    console.log('devis:', res.data);
                    console.log('id:', res.data.id);
                    console.log('status :', res.status);
                    if (res.status === 200) {
                        alert('Devis créé avec succés !');
                        this.toDevis();
                        this.setState({
                            surfaceAllocated: ''
                        })
                  } else {
                    alert("Une erreur s'est produite");
                }
                });
        } 
    toDevis = () =>{
        window.location.href = '/devis-vente';
    }
    render() {
        const { clients,ventes,sexe, selectedOption,
                selectedPerson,people, checked, checkedNo, quantity} = this.state;
        console.log('selectedOption: ', selectedOption, 'quantité:', quantity);
        const isEnabledProduct = this.canBeSubmittedProduct();
        console.log('img:',selectedOption ? selectedOption.img: '')
        const isEnabledAdd = this.canBeSubmittedClient();
        let filterClient = clients.length ? clients.filter((client)=>{
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
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="card mt-2 col-md-6">
                    <div className="card-body">
                            <h3 className="text-success text-center mt-2">création d'un nouveau devis vente</h3>
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
                                <label>Produits:  </label>
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
            </div>
            
        )   
    }
    
}