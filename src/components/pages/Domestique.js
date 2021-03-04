import React, { Component } from 'react';
import Hero from '../common/hero';
import http from '../../services/httpService';
import { Notyf } from 'notyf';
import Select from 'react-select';
import Pagination from "react-js-pagination";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { CountryDropdown} from 'react-country-region-selector';
import {
    apiUrl
  } from '../../config.json';
const apiClient = apiUrl + '/client/';
const apiHouse = apiUrl + '/house/';
const apiBuilding = apiUrl + '/building/';
const apiDevis = apiUrl + '/devisDomestique/';
const options = [{ value: 'Masculin', label: 'Masculin' }, { value: 'Feminin', label: 'Feminin' }];
const optionDomestique = [
    { value: 'RDC', label: 'Kit kirikou House rez de chaussée' },
    { value: 'R+1', label: 'Kit kirikou House R+1'},
    { value: 'R+2', label: 'Kit kirikou Building R+2'},
    { value: 'R+3', label: 'Kit kirikou Building R+3'},
    { value: 'R+4', label: 'Kit kirikou Building R+4'},
    { value: 'R+5', label: 'Kit kirikou Building R+5'},
    { value: 'R+6', label: 'Kit kirikou Building R+6'},
    { value: 'R+7', label: 'Kit kirikou Building R+7'},
    { value: 'R+8', label: 'Kit kirikou Building R+8'},
    { value: 'R+9', label: 'Kit kirikou Building R+9'},
    { value: 'R+10', label: 'Kit kirikou Building R+10'},
    { value: 'R+11', label: 'Kit kirikou Building R+11'},
    { value: 'R+12', label: 'Kit kirikou Building R+12'},
    { value: 'R+13', label: 'Kit kirikou Building R+13'},
    { value: 'R+14', label: 'Kit kirikou Building R+14'},
    { value: 'R+15', label: 'Kit kirikou Building R+15'},
    { value: 'R+16', label: 'Kit kirikou Building R+16'},
    { value: 'R+17', label: 'Kit kirikou Building R+17'},
    { value: 'R+18', label: 'Kit kirikou Building R+18'},
    { value: 'R+19', label: 'Kit kirikou Building R+19'}
  ]
  const notyf = new Notyf({
    duration: 4000,
    position: {
        x: 'center',
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
            duration: '10000',
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
export default class Domestique extends Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
            clients: [],
            id: '',
            building:'',
            firstName: '',
            lastName: '',
            sexe: '',
            address: '',
            email: '',
            pays:'',
            country: '',
            region:'',
            phone: '',
            people: '',
            activePage: 1,
            clientsPerPage:5,
            selectedOption: '',
            selectedPerson: '',
            selectedBuilding: '',
            checked: false,//devis
            checkedNo:false,//facture
            show: false,
            showAdd: false,
            checkedStairs: false,
            checkedNoStairs: false,
            search:''
        }
    }
    selectCountry (country) {
        this.setState({ country});
    }
    
      selectRegion (region) {
        this.setState({ region});
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
    setCheckedStairs= (checked) => {
        this.setState({ checkedStairs: !checked, checkedNoStairs:checked})
    }
    setCheckedNoStairs = (checked) => {
        this.setState({ setCheckedNoStairs: !checked, checkedStairs: checked})
    }
    handleChangeSexe =(sexe)=>{
        this.setState({sexe});
        
        console.log(`Option selected:`, sexe["value"]);
    }
    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
    };
    handleChangeSelectBuiding = selectedBuilding => {
        this.setState({selectedBuilding});
    };
    handleChangeSelectPerson = selectedPerson => {
        this.setState({ selectedPerson });
    };
    setChecked = (checked) => {
        this.setState({ checked: !checked, checkedNo: checked})
    }
    setCheckedNo = (checked) => {
        this.setState({ checkedNo: !checked, checked: checked})
    }
    canBeSubmittedClient(){
        if(this.state.sexe){
       return(this.state.firstName.length>0 && this.state.lastName.length > 0 && this.state.phone.length > 0 && this.state.address.length>0 && this.state.country.length > 0);
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
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    setPhone = (phone) => {
        this.setState({phone})
    }
      setPhone = (phone) => {
        this.setState({phone})
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
           isdomestique: true,
           pays: this.state.country
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
                 country:'',
                 id: res.data.data.id
                 });
                 if (res.status === 200) {
                     notyf.success('Client ajouté avec succés !')
                     console.log('idClient : ', this.state.id)
                     this.setState({
                         showAdd : false
                     })
               } }).catch(err=>{
                if (err.response) {
                  notyf.error("Une erreur s'est produite")
                }
            });
         }
    async componentDidMount() {
        this.refreshDomestique();
        this.refreshBuilding();
        const { data : clients } = await http.get(apiClient);
        console.log('Clients : ', clients);
        this.setState({ clients });

    }
    refreshDomestique(){
        http.get(apiHouse).then((res) => {
          console.log('res:', res)  
          this.setState({
            people: res.data
          })
        });
    }
    refreshBuilding(){
        http.get(apiBuilding).then((res) => {
          console.log('res:', res)  
          this.setState({
            building: res.data
          })
        });
    }
    onSubmitDevis = (e) => {
        e.preventDefault();
        const devis = {
            client: this.state.id,
            house: this.state.selectedPerson ? this.state.selectedPerson.id : null,
            building: this.state.selectedBuilding ? this.state.selectedBuilding.id : null,
            isdomestique: true,
            isQuotation: this.state.checked,
            isInvoice: this.state.checkedNo
        }
        http.post(apiDevis + 'create/', devis)
                .then(res => {
                    console.log('devis:', res.data);
                    console.log('id:', res.data.id);
                    console.log('status :', res.status);
                    if (res.status === 200) {
                        notyf.success('Devis créé avec succés !');
                        this.toDevis();
                        this.setState({
                            surfaceAllocated: ''
                        })
                  }
                }).catch(err=>{
                    if (err.response) {
                      notyf.error("Une erreur s'est produite")
                    }
                });
        } 
    toDevis = () =>{
        window.location.href = '/liste-devis-domestique';
    }
    render() {
        const { clients, sexe,phone, selectedOption,selectedPerson,selectedBuilding, people, building, checked, checkedNo,activePage, clientsPerPage,country} = this.state;
        const isEnabledAdd = this.canBeSubmittedClient();
        const indexOfLastClient = activePage * clientsPerPage;
        const indexOfFirstClient = indexOfLastClient - clientsPerPage;
        const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
        let filterClient = currentClients.length ? currentClients.filter((client)=>{
            let clientInfos = client.clientFirstName.toLowerCase() + client.clientLastName.toLowerCase()+ client.phone;
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
            <Hero hero="defaultHeroDomestique">
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="card mt-2 col-md-6">
                    <div className="card-header mt-4">
						<h3 style={{textAlign:'center'}}>création d'un nouveau devis domestique</h3>
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
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="radio"
                                checked>
                                </input>
                                <label className="form-check-label">
                                     Votre bâtiment fait combien d'étage ?
                                </label>
                            </div>
                            <div className="form-group">
                                <Select 
                                isSearchable={true}
                                value={selectedOption ? selectedOption: ''}
                                isClearable= {true}
                                onChange={this.handleChangeSelect}
                                options={optionDomestique} />
                            </div>
                            {selectedOption && (selectedOption.value === 'RDC' || selectedOption.value === 'R+1') && <>
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="radio"
                                checked>
                                </input>
                                <label className="form-check-label">
                                    Vous êtes combien de personnes dans votre maison ?
                                </label>
                            </div>
                            <div className="form-group">
                                <Select 
                                isSearchable={true}
                                getOptionLabel={option => option.designation}
                                value={selectedPerson}
                                isClearable= {true}
                                onChange={this.handleChangeSelectPerson}
                                options={people} />
                            </div>
                            </>}
                            {selectedOption && (selectedOption.value !== 'RDC' && selectedOption.value !== 'R+1') && <>
                            <div className="form-check">
                                <input className="form-check-input" 
                                type="radio"
                                checked>
                                </input>
                                <label className="form-check-label">
                                    Veuillez choisir votre Kit building?
                                </label>
                            </div>
                            <div className="form-group">
                                <Select 
                                isSearchable={true}
                                getOptionLabel={option => option.designation}
                                value={selectedBuilding}
                                isClearable= {true}
                                onChange={this.handleChangeSelectBuiding}
                                options={building} />
                            </div>
                            </>}
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
                                    <PhoneInput
                                        defaultCountry="SN"
                                        className="form-control"
                                        placeholder="Entrer votre numéro de téléphone"
                                        value={phone}
                                        onChange={this.setPhone}/>
                                    )
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
                                    <CountryDropdown
                                    className="form-control" 
                                    value={country}
                                    onChange={(val) => this.selectCountry(val)}/>
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
            </div>
            </Hero>
        )   
    }
    
}