import React, { Component } from 'react';
import http from '../../services/httpService';
import Spinners from '../../components/common/spinners';
import AvoidDevisVente from '../../components/common/avoidDevisVente'
import { Table,Form, Row, Col, Button} from "react-bootstrap";
import {
    apiUrl
  } from '../../config.json';
const apiDevis = apiUrl + '/devisVente/';
const apiDevisCreate = apiUrl + '/devisVenteCreate/'
export default class ContenuDevisVente extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            idDevis: '',
            loaded: false,
            devisVentes: '',
            client:'',
            search: '',
            produits:[]
        }
    }
    componentDidMount() {
        this.refreshContentQuotation();
    }
    async refreshContentQuotation() {
        const idDevis = this.props.match.params.id;
        const { data : devisVentes} = await http.get(apiDevis + 'detail/' + idDevis);
        this.setState({ produits: devisVentes.sales,client:devisVentes.client, devisVentes, idDevis});
        if (this.state.produits.length && this.state.produits.length !== 0) {
            this.setState({loaded:true})
        }
        console.log('devis : ', devisVentes);
        console.log('produits : ', this.state.produits);  
    }
    updateSearch = (event) => {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    retireQuotation(id, ugs) {
        const mes = window.confirm(
            "Do you really want to retire " + ugs + " ?"
          );
        if (mes) {
            const produit = {
                sales:[{id:id}]
            }
            http.put(apiDevisCreate + this.state.idDevis + "/",produit).then(resp => {
              this.refreshContentQuotation();
            });
          }
    }
    render() {
        const { produits, loaded,client, devisVentes} = this.state;
        let produitsView = null;
        if (!this.state.loaded) {
            produitsView = <AvoidDevisVente/>
        }
        else {
            let filterProduits = produits.filter(prod => {
                let prodInfos =
                    prod.ugs ? prod.vente.ugs.toLowerCase() : '' +
                    prod.price +
                    prod.designation ? prod.vente.designation.toLowerCase() : '' +
                    prod.marque ? prod.vente.marque.toLowerCase() : ''
                return prodInfos.indexOf(this.state.search.toLowerCase()) !== -1;
            });
            produitsView = filterProduits.map(prod => {
                return (
                    <tr key={prod.id}>
                        <td style={{ textAlign: 'center' }}>{prod.id}</td>
                        <td style={{ textAlign: 'center' }}>{prod.vente.ugs}</td>
                        <td style={{ textAlign: 'center' }}>{prod.vente.price}</td>
                        <td style={{ textAlign: 'center' }}>{prod.quantity}</td>
                        <td style={{ textAlign: 'center' }}>{prod.vente.designation}</td>
                        <td style={{ textAlign: 'center' }}>{prod.vente.marque}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Button
                                variant="danger"
                                size="sm"
                                className="mr-2"
                                onClick={this.retireQuotation.bind(this, prod.id, prod.vente.ugs)}
                            >
                                retirer
                            </Button>
                        </td>
                    </tr>
                )
              });
        }
        
        console.log('loaded : ', loaded)
        return (
            <div>
                <Row>
                  <Col md={6} className="client">
                        <h5>CONTENU devis NUMERO {devisVentes.ref_devis} ADRESSE AU CLIENT {client.clientFirstName + ' ' + client.clientLastName}</h5>
                        <h5>LE DEVIS EST CRÉÉ LE {devisVentes.date_creation}</h5>
                  </Col>
                  <Col md={{ offset: 2 }}>
                    <Form className="form-inline mb-2">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                          placeholder="Chercher produits"
                          size="sm"
                        />
                        <Button
                          className="btn btn-outline-success my-2 my-sm-0 text-light"
                          size="sm"
                          type="submit"
                        >
                          Search
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                {loaded &&
                  <React.Fragment>
                  <Table striped>
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>UGS</th>
                      <th>Prix</th>
                      <th>Quantité</th>
                      <th>Désignation</th>
                      <th>Marque</th>
                      <th>actions sur client</th>
                    </tr>
                  </thead>
                    <tbody>
                      {produitsView}
                    </tbody>
                  </Table>
                </React.Fragment>
                }
                {!loaded && 
                    <React.Fragment>
                    <Table striped>
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>UGS</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Désignation</th>
                        <th>Marque</th>
                        <th>actions sur client</th>
                      </tr>
                    </thead>
                      <tbody>
                        {produitsView}
                      </tbody>
                    </Table>
                  </React.Fragment>
                }
                </div>
        )
    }
}
