import React, { Component} from 'react';
import http from '../../services/httpService';
import { Button, Form, Modal,Table} from 'react-bootstrap';
import Select from 'react-select';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify';

import {
    apiUrl
  } from '../../config.json';
const apiEndpoint = apiUrl + '/parcel/';
const apiCulture = apiUrl + '/goutteAgoutte/';
const apiSurfaceCulture = apiUrl + '/surfaceCulture/';
const apiClient = apiUrl + '/client/';
const apiDevis = apiUrl + '/devis/';
const options = [{ value: 'Masculin', label: 'Masculin' }, { value: 'Feminin', label: 'Feminin' }];
const optionWaterSource = [
    { value: 'forage', label: 'Forage' },
    { value: 'puits', label: 'Puits' },
    { value: 'miniForage', label: 'Mini-Forage' },
    { value: 'senEau', label: 'Source SEN\'EAU' }
  ]
  const optionWaterQuality = [
    { value: 'eauBonneQuality', label: 'Eau de bonne qualité' },  
    { value: 'eauSalee', label: 'Eau Salée' },
    { value: 'eauCalcaire', label: 'Eau Contenant du Calcaire' },
    { value: 'eauFer', label: 'Eau Contenant du Fer' },
    { value: 'eauLimons', label: 'Eau Contenant des Limons' },
    { value: 'eauSable', label: 'Eau Contenant du Sable' },
  ]  
const optionCategoryPompe = [
    { value: 'pompeImmergee', label: 'Pompe Immergée' },
    { value: 'pompeSurface', label: 'Pompe Surface' }
  ]
const optionTypePompe = [
    { value: 'pompeSolaire', label: 'Pompe Solaire' },
    { value: 'pompeGazoile', label: 'Pompe Gazoile' },
    { value: 'pompeElectrique', label: 'Pompe Electrique' }
  ]
const optionTypeLight = [
    { value: 'eSolaire', label: 'Eclairage Solaire' },
    { value: 'eReseauSenelec', label: 'Eclairage Réseau Senelec' },
]
const optionWind = [
    { value: '1.5', label: 'Pas de vent', percentage: '0.65'},
    { value: '2', label: '2m/s', percentage: '0.6' },
    { value: '3.5', label: '3.5m/s', percentage: '0.5' },
    { value: '3.9', label: '3.9m/s', percentage: '0.3' },
]
const optionTaster = [
    {
        value: 'goutteurNonPerfore',
        label: 'Rouleau de Goutteurs Non Perforé',
        price: 60000
    },
    {
        value: 'goutteurIntegre',
        label: 'Rouleau avec Goutteurs Intégrés',
        price: 70000
    },
    {
        value: 'goutteurBasseDensite',
        label: 'Rouleau de Goutteurs Basse Densité',
        price: 30000
    }
]
const idCultureCollected = [];
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if( dd < 10) {
dd = '0' + dd
}
if(mm<10) {
mm = '0' + mm
}
today = yyyy+'-'+mm+'-'+dd;
export default class AddColis extends Component {
    constructor(props,context){
        super(props,context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitClient = this.onSubmitClient.bind(this);
        this.addClient = this.addClient.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleChangeSexe = this.handleChangeSexe.bind(this);
        this.onChoice = this.onChoice.bind(this);
        
        this.state = {
            cultures: [],
            clients: [],
            values: [],
            checked: false,
            checkedNo: false,
            checkedPompe: false,
            checkedPompeNo: false,
            checkedCaptage: false,
            checkedCaptageNo: false,
            checkedlight: false,
            checkedlightNo: false,
            checkedFence: false,
            checkedNoFence: false,
            checkedEclairage: false,
            checkedNoEclairage: false,
            checkedWorkForce: false,
            checkedWorkForceNo: false,
            show:false,
            showAdd:false,
            showUpdate: false,
            showSurfaceCulture: false,
            showWaterSource: false,
            waterQuality: '',
            selectedOption: '',
            firstName: '',
            lastName: '',
            email: '',
            pays: '',
            adresseChamp: '',
            search:'',
            options:'',
            address: '',
            superficieAmenager: '',
            superficieTotale: '',
            surfaceAllouee: '',
            selectedWind : null,
            porteeTheorique: null,
            waterSource: '',
            typeTaster: '',
            debitExploitation: '',
            profondeur: '',
            perimetre: '',
            eclairage: '',
            niveauStatique: '',
            selectedPump: '',
            selectedTypePump: '',
            courantNominalePompe: '',
            tensionPompe: '',
            puissancePompe: '',
            hauteurManoPompe: '',
            debitPompe: '',
            light: '',
            profondeurMoyenne: '',
            name:'',
            phone:'',
            sexe:'',
            weight:'',
            id: '',
            idCulture: '',
            idCultureCollected: [],
            newId:''
            
            
        };
    }
    handleClose() {
        this.setState({ show: false });
    }
      handleShow() {
        this.setState({ show: true });
    }
    handleChangeSelect = selectedOption => {
      this.setState({ selectedOption });
    };
    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }
    setChecked = (checked) => {
        this.setState({ checked: !checked, checkedNo: checked})
    }
    setCheckedNo = (checked) => {
        this.setState({ checkedNo: !checked, checked: checked})
    }
    setCheckedWorkForce = (checkedWorkForce) => {
        this.setState({ checkedWorkForce: !checkedWorkForce, checkedWorkForceNo: checkedWorkForce})
    }
    setCheckedWorkForceNo = (checkedWorkForce) => {
        this.setState({ checkedWorkForceNo: !checkedWorkForce, checkedWorkForce: checkedWorkForce})
    }
    setCheckedFence = (checked) => {
        this.setState({ checkedFence: !checked, checkedNoFence:checked})
    }
    setCheckedNoEclairage = (checked) => {
        this.setState({ checkedNoEclairage: !checked, checkedEclairage: checked})
    }
    setCheckedEclairage = (checked) => {
        this.setState({ checkedEclairage: !checked, checkedNoEclairage:checked})
    }
    setCheckedNoFence = (checked) => {
        this.setState({ checkedNoFence: !checked, checkedFence: checked})
    }
    setCheckedPompe = (checked) => {
        this.setState({ checkedPompe: !checked, checkedPompeNo: checked}) 
    }
    setCheckedPompeNo = (checked) => {
        this.setState({ checkedPompeNo: !checked, checkedPompe : checked})
    }
    setCheckedCaptage = (checked) => {
        this.setState({ checkedCaptage: !checked, checkedCaptageNo: checked})
    }
    setCheckedCaptageNo = (checked) => {
        this.setState({ checkedCaptageNo: !checked, checkedCaptage: checked})
    }
    setCheckedlight = (checked) => {
        this.setState({ checkedlight: !checked,checkedlightNo:checked})
    }
    setCheckedlightNo = (checked) => {
        this.setState({ checkedlightNo: !checked, checkedlight :checked})
    }
    addClient(e){
        this.setState({
            name:e.target.value,
            show:false
        });
    }
    handleShowAdd(e){
        this.setState({
            showAdd:true
        });
    }
    handleCloseAdd(e){
        this.setState({
            showAdd:false
        });
    }
    handleShowSurfaceCulture = (e) =>{
        this.setState({
            showSurfaceCulture:true
        });
    }
    handleCloseSurfaceCulture = (e) =>{
        this.setState({
            showSurfaceCulture:false
        });
    }
    handleCloseWaterSource = () => {
        this.setState({showWaterSource : false});
    }
    handleShowWaterSource = () => {
        this.setState({showWaterSource : true});
    }
    handleChangeSexe(sexe){
        this.setState({sexe});
        
        console.log(`Option selected:`, sexe["value"]);
    }
    handleChangeOption(selectedOption){
        this.setState({selectedOption});
    }
    handleChangeSelectTasterType = typeTaster => {
        this.setState({typeTaster})
    }
    handleChangeSelectVent = selectedWind => {
        this.setState({selectedWind})
    }
    handleChangeSelectWaterQuality = waterQuality => {
        this.setState({waterQuality})
    }
    handleChangeSelectWaterSource = waterSource => {
        this.setState({waterSource})
    }
    handleChangeSelectTypePump = selectedTypePump => {
        this.setState({selectedTypePump})
    }
    handleChangeSelectPump = selectedPump => {
        this.setState({selectedPump})
    }
    handleChangeSelectLight = light => {
        this.setState({light})
    }
    refreshCultures(){
        http.get(apiCulture).then((res) => {
          console.log('res:', res)  
          this.setState({
            cultures: res.data
          })
        });
       }
    async componentDidMount() {
        this.refreshCultures();
        const { data : clients } = await http.get(apiClient);
        console.log('Clients : ', clients);
        console.log('Eclairage:', this.state.eclairage);
        console.log('Perimetre : ', this.state.perimetre);
        this.setState({ clients });

    }
    addProduit(){} 
    onChoice(id,clientFirstName,clientLastName, phone) {
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
    canBeSubmitted(){
       if(this.state.name){
         return(this.state.weight.length>0);
        }
    }
    canBeSubmittedClient(){
        if(this.state.sexe){
       return(this.state.firstName.length>0 && this.state.lastName.length > 0 && this.state.phone.length > 0 && this.state.address.length>0 && this.state.pays.length > 0);
        }
    }
    canBeSubmittedSurfaceCulture = () => {
        if ((this.state.surfaceAllouee && this.state.selectedOption)  || (this.state.selectedWind && this.state.porteeTheorique && this.state.surfaceAllouee)) return true;
        else return false;
    }
   
        
       onSubmit(e){
           e.preventDefault();
           this.setState({number_deliveries:this.state.number_deliveries+1})
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
           }
        
           const colis = {

            client:{
                   id: this.state.id,
                   full_name: this.state.name,
                   phone:this.state.phone
            },
           weight: this.state.weight,
           delivery_price:this.state.delivery_price,
           articles:[]
        
           };
           http.post(apiEndpoint+'create/',colis)
            .then(res => {
                console.log('data ', res.data);
                this.setState({
                  name:'',    
                  weight: ''
                });
            });
            const client = {
                last_delivery_date: today,
                number_deliveries:this.state.number_deliveries+1
            }
            http.put(apiCulture+'update/'+this.state.id+'/',client)
            .then(res => {
                console.log('data ', res.data);
            });
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
        onSubmitCulture = (e) =>{
            e.preventDefault();
            const surfaceCulture = {
                cAssociated: this.state.selectedOption.id,
                surfaceAllocated: this.state.surfaceAllouee,
                vitesseVent: this.state.selectedWind ? this.state.selectedWind["value"] : null,
                pourcentage : this.state.selectedWind ? this.state.selectedWind["percentage"]:1,
                porteeTheorique: this.state.porteeTheorique ? this.state.porteeTheorique : null
            }
            http.post(apiSurfaceCulture + 'create/', surfaceCulture)
                .then(res => {
                    console.log('culture:', res.data.id);
                    console.log('IDculture:', res.data.id);
                    console.log('status :', res.status);
                    this.setState({
                        idCulture: res.data.id,
                    });
                    if (res.status === 200) {
                        idCultureCollected.push({id : this.state.idCulture})
                        alert('Culture ajoutée avec succés !');
                        this.setState({
                            showSurfaceCulture: false,
                            vitesseVent: '',
                            porteeTheorique:''
                        })
                  } else {
                    alert("Une erreur s'est produite");
                }
                });
        }
    onSubmitDevis = (e) => {
        e.preventDefault();
        const devis = {
            client: {id:this.state.id},
            surfaceCultures: idCultureCollected,
            fieldAddress: this.state.adresseChamp,
            totalAreaPerimeter: this.state.superficieTotale,
            totalAreaDevelopable:this.state.superficieAmenager,
            designation: this.state.waterSource ? this.state.waterSource['value'] : null,
            staticLevel: this.state.niveauStatique ? this.state.niveauStatique : null,
            waterQuality: this.state.waterQuality ? this.state.waterQuality['value'] : null,
            typeTaster: this.state.typeTaster ? this.state.typeTaster['value'] : null,
            isWorkForce: this.state.checkedWorkForce,
            depth: this.state.profondeur ? this.state.profondeur : null,
            operatingRate: this.state.debitExploitation ? this.state.debitExploitation : null,
            isRegularWater: false,
            pumpType: this.state.selectedTypePump ? this.state.selectedTypePump['value'] : null,
            pumpName: this.state.selectedPump ? this.state.selectedPump['value'] : null,
            pumpDebit: this.state.debitPompe ? this.state.debitPompe : null,
            pumpHeight: this.state.hauteurManoPompe ? this.state.hauteurManoPompe : null,
            pumpCapacity: this.state.puissancePompe ? this.state.puissancePompe : null,
            pumpVolt: this.state.tensionPompe ? this.state.tensionPompe : null,
            pumpAmpere: this.state.courantNominalePompe ? this.state.courantNominalePompe : null,
            light: this.state.light ? this.state.light['value'] : null,
            eclairage: this.state.eclairage ? this.state.eclairage : null,
            perimetre: this.state.perimetre ? this.state.perimetre: null,
            profondeurMoyenne: this.state.profondeurMoyenne ? this.state.profondeurMoyenne : null
        }
        http.post(apiDevis + 'createdevis/', devis)
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
        window.location.href = '/devis';
        }
    render() {
        const {selectedOption,sexe,clients, checked, checkedNo, checkedPompe, checkedPompeNo, checkedCaptage, checkedCaptageNo, checkedlight, checkedlightNo, cultures, checkedFence,checkedNoFence,superficieAmenager, superficieTotale, selectedWind , porteeTheorique, surfaceAllouee, idCulture, waterSource, waterQuality, debitExploitation, profondeur, niveauStatique, selectedPump, selectedTypePump, courantNominalePompe, tensionPompe, puissancePompe, debitPompe, light, adresseChamp, id, perimetre, checkedEclairage, checkedNoEclairage, eclairage,typeTaster, checkedWorkForce,checkedWorkForceNo} = this.state;
        console.log('courant :', courantNominalePompe);
        console.log('Main d\oeuvre',checkedWorkForce);
        console.log('Goutteur Choisi :', typeTaster);
        console.log('Perimetre:', perimetre);
        console.log('Eclairage:', eclairage);
        console.log('idClient :',id);
        console.log('Adresse Champ :', adresseChamp);
        console.log('light :', light)
        console.log('tension :', tensionPompe);
        console.log('debit :', debitPompe);
        console.log('puissance :', puissancePompe);
        console.log('Profondeur :', profondeur);
        console.log('waterSource :', waterSource ? waterSource['value']: '');
        console.log('waterQuality :', waterQuality ? waterQuality['value']: '');
        console.log('debitExploitation :', debitExploitation);
        console.log('Profondeur :', profondeur);
        console.log('NiveauStatique :', niveauStatique);
        console.log('Selected FirstName :', this.state.firstName);
        console.log('Selected phone:', this.state.phone);
        console.log('Selected Email:', this.state.email);
        console.log('Selected lastName:', this.state.lastName);
        console.log('Selected Pays:', this.state.pays);
        console.log('Superficie Totale:', superficieTotale);
        console.log('Superficie Aménager:', superficieAmenager);
        console.log('Surface Allouée:', surfaceAllouee);
        console.log('Vitesse Vent:', selectedWind );
        console.log('Portée Théorique:', porteeTheorique);
        console.log('Selected Option:', selectedOption);
        console.log('idCulture :', idCulture)
        console.log('idCultureCollected :', idCultureCollected)
        console.log('SelectedPump :', selectedPump)
        console.log('idChoisis:', this.state.selectedOption ? this.state.selectedOption.id:'')
        console.log('SelectedTypePump :', selectedTypePump)
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
        const isEnabledAdd = this.canBeSubmittedClient();
        const isEnabledSurfaceCulture = this.canBeSubmittedSurfaceCulture();
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="card mt-2 col-md-6">
                    <div className="card-body">
                            <h3 className="text-success text-center mt-2">création d'un nouveau devis</h3>
                            <ToastContainer draggable={false} transition={Zoom} autoClose ={8000}/>
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
                            <div className="form-group">
                                <label>Adresse Champ:  </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Adresse où se trouve le champ"
                                name="adresseChamp"
                                value={this.state.adresseChamp} 
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Superficie Totale Périmetre:  </label>
                                <input 
                                type="number" step="any" 
                                className="form-control" 
                                placeholder="00.00 ha"
                                name="superficieTotale"
                                value={this.state.superficieTotale} 
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Superficie à Aménager:  </label>
                                <input 
                                type="number" step="any" 
                                className="form-control" 
                                placeholder="00.00 ha"
                                name="superficieAmenager"
                                value={this.state.superficieAmenager} 
                                onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                            <label>Culture Choisie:  </label>
                                <input
                                readonly
                                type="text" 
                                className="form-control" 
                                value={selectedOption ? selectedOption.culture : ''}
                                    />
                            <label>Surface Allouée:  </label>
                                <input
                                readonly
                                type="number" step="any" 
                                className="form-control" 
                                value={this.state.surfaceAllouee}
                                onChange={this.handleChange}
                                    />
                                <Button variant="secondary" size="sm" className="mt-2" onClick={this.handleShowSurfaceCulture}>Ajouter culture</Button>
                            </div>
                            <div className="form-group">
                                    <label>Quel Type de Rouleau de Goutteurs préférez-vous ?</label>
                                    <Select isSearchable={true}
                                        isClearable = {true}
                                        value={typeTaster ? typeTaster : ''}
                                        onChange={this.handleChangeSelectTasterType}
                                        options={optionTaster}
                                    />
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="radio" checked/>
                                    <label className="form-check-label">
                                        Voulez-vous que l'on inclut la main d'oeuvre ?
                                    </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedWorkForce}
                                        onChange={() => 
                                            this.setCheckedWorkForce(checkedWorkForce)}>
                                    </input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                            </div>
                            <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                            checked={checkedWorkForceNo}
                                            onChange={() => 
                                            this.setCheckedWorkForceNo(checkedWorkForceNo)}>
                                        </input>
                                    <label className="form-check-label">
                                        NON
                                    </label>
                            </div>     
                            <span></span>
                            <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                      checked></input>
                                <label className="form-check-label">
                                     Voulez-vous que l'on vous réalise une clôture ?
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedFence}
                                        
                                        onChange={() => this.setCheckedFence(checkedFence)}></input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedNoFence}
                                        onChange={() => this.setCheckedNoFence(checkedNoFence)}></input>
                                <label className="form-check-label">
                                     NON
                                </label>
                            </div>
                            {checkedFence && 
                                <div className="form-group">
                                    <label>Périmetre du champ de clôture:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m" 
                                    name="perimetre"
                                    onChange={this.handleChange}
                                />
                                </div>   
                            }
                            <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                      checked></input>
                                <label className="form-check-label">
                                     Voulez-vous que l'on vous réalise un système d'éclairage  ?
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedEclairage}
                                        
                                        onChange={() => this.setCheckedEclairage(checkedEclairage)}></input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedNoEclairage}
                                        onChange={() => this.setCheckedNoEclairage(checkedNoEclairage)}></input>
                                <label className="form-check-label">
                                     NON
                                </label>
                            </div>
                            {checkedEclairage && 
                                <div className="form-group">
                                    <label>Périmetre du champ d'éclairage:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m" 
                                    name="eclairage"
                                    onChange={this.handleChange}
                                />
                                </div>   
                            }
                            <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                      checked></input>
                                <label className="form-check-label">
                                     Disposez-vous d'une source d'eau ?
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"
                                        checked={checked}
                                        
                                        onChange={() => this.setChecked(checked)}></input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                            </div>
                            <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedNo}
                                        onChange={() => this.setCheckedNo(checkedNo)}></input>
                                <label className="form-check-label">
                                     NON
                                </label>
                            </div>
                               {checked && <>
                                <div className="form-group">
                                <label>Source d'eau:  </label>
                                        <Select isSearchable={true}
                                        isClearable = {true}
                                        value={waterSource ? waterSource : ''}
                                        onChange={this.handleChangeSelectWaterSource}
                                        options={optionWaterSource}
                                    />
                                </div>
                                {(waterSource ? waterSource['value'] === 'forage' : '' || waterSource ? waterSource['value'] === 'miniForage' : '') && <>
                                <div className="form-group">
                                    <label>Débit d'Exploitation:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m3/s" 
                                    name="debitExploitation"
                                    onChange={this.handleChange}
                                />
                                </div> 
                                </>
                                }
                                <div className="form-group">
                                    <label>Profondeur:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m" 
                                    name="profondeur"
                                    onChange={this.handleChange}
                                />
                                    </div>
                                    <div className="form-group">
                                    <label>Niveau Statique:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m" 
                                    name="niveauStatique"
                                    onChange={this.handleChange}
                                />
                                </div>
                                <div className="form-group">
                                    <label>Qualité Eau:  </label>
                                    <Select isSearchable={true}
                                        isClearable = {true}
                                        value={waterQuality ? waterQuality : ''}
                                        onChange={this.handleChangeSelectWaterQuality}
                                        options={optionWaterQuality}
                                    />
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked/>
                                    <label className="form-check-label">
                                        Disposez-vous d'une pompe ?
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedPompe}
                                        onChange={() => this.setCheckedPompe(checkedPompe)}></input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                                </div>
                                <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                            checked={checkedPompeNo}
                                            onChange={() => this.setCheckedPompeNo(checkedPompeNo)}></input>
                                    <label className="form-check-label">
                                        NON
                                    </label>
                                </div>
                                {checkedPompe && <>
                                <div className="form-group">
                                    <label>Catégorie de Pompe:  </label>
                                    <Select isSearchable={true} value = {selectedPump} onChange={this.handleChangeSelectPump} options={optionCategoryPompe} />
                                </div>
                                <div className="form-group">
                                    <label>Type de Pompe:  </label>
                                    <Select isSearchable={true} value = {selectedTypePump} onChange={this.handleChangeSelectTypePump} options={optionTypePompe} />
                                </div>
                                <div className="form-group">
                                    <label>Débit de la pompe:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m3/s" 
                                    name="debitPompe"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hauteur Manométrique de la pompe:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 m"  
                                    name="hauteurManoPompe"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Puissance Nominale de la pompe:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 Watt"  
                                    name="puissancePompe"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tension Nominale de la pompe:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 Volt"  
                                    name="tensionPompe"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Courant Nominale de la pompe:  </label>
                                    <input 
                                    type="number" step="any" 
                                    className="form-control"
                                    placeholder = "0.0 Ampere" 
                                    name="courantNominalePompe"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                </>}
                                </>    
                                }
                                {checkedNo && <>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked/>
                                    <label className="form-check-label">
                                        Voulez-vous qu'on vous réalise un ouvrage de captage (Forage, Puits, Mini-forage) ?
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedCaptage}
                                        onChange={() => this.setCheckedCaptage(checkedCaptage)}></input>
                                <label className="form-check-label">
                                     OUI
                                </label>
                                </div>
                                <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                            checked={checkedCaptageNo}
                                            onChange={() => this.setCheckedCaptageNo(checkedCaptageNo)}/>
                                    <label className="form-check-label">
                                        NON
                                    </label>
                                </div>
                                {checkedCaptage && <>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" checked/>
                                    <label className="form-check-label">
                                        Quelle est la profondeur moyenne des forages qui sont réalisés dans votre localité ?
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Profondeur moyenne:  </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    name="profondeurMoyenne"
                                    onChange={this.handleChange}
                                    />
                                </div>    
                                </>
                                }  
                                </>}
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                      checked></input>
                                    <label className="form-check-label">
                                        Voulez-vous qu'on vous réalise un système d'éclairage dans votre champ ?
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedlight}
                                        onChange={() => this.setCheckedlight(checkedlight)}></input>
                                    <label className="form-check-label">
                                        OUI
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={checkedlightNo}
                                        onChange={() => this.setCheckedlightNo(checkedlightNo)}></input>
                                    <label className="form-check-label">
                                        NON
                                    </label>
                                </div>
                                {checkedlight && <>
                                <div className="form-group">
                                    <label>Type d'éclairage:  </label>
                                    <Select isSearchable={true} isClearable = {true} value = {light ? light : ''} onChange={this.handleChangeSelectLight} options={optionTypeLight} />
                                </div>
                                </>}
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
                    <Modal show={this.state.showSurfaceCulture}
                        onHide={this.handleCloseSurfaceCulture}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-success"><marquee direction="right">Ajouter Type de Culture!</marquee></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.onSubmitCulture}>
                            <div className="form-group">
                                <label>Type de Culture:  </label>
                                <Select 
                                isSearchable={true}
                                getOptionLabel={option => option.culture}
                                value={selectedOption}
                                isClearable= {true}
                                onChange={this.handleChangeSelect}
                                options={cultures} />
                            </div>
                            {selectedOption && selectedOption.systemegoutteAgoutte === true && <>
                               <div className="form-group">
                                    <label>Surface Allouée:  </label>
                                    <input 
                                    type="number" step="any"
                                    placeholder = "0.0 ha"
                                    className="form-control" 
                                    name="surfaceAllouee"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Culture Goutte à Goutte choisie</label>
                                </div>
                            </>}
                            {selectedOption && selectedOption.systemegoutteAgoutte === false && <>
                                <div className="form-group">
                                    <label>Vitesse du vent:  </label>
                                    <Select isSearchable={true} value = {selectedWind} isClearable = {true} onChange={this.handleChangeSelectVent} options={optionWind} />
                                </div>
                                <div className="form-group">
                                    <label>Portée Théorique:  </label>
                                    <input 
                                    type="number"
                                    placeholder = "0.0 m" step="any"
                                    className="form-control" 
                                    name="porteeTheorique"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Surface Allouée:  </label>
                                    <input 
                                    type="number" step="any"
                                    className="form-control"
                                    placeholder = "0.0 ha"
                                    name="surfaceAllouee"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Culture Apersion choisie</label>
                                </div>
                            </>}
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseSurfaceCulture}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" className="btn btn-primary"  disabled={!isEnabledSurfaceCulture}>
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
