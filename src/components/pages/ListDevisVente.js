import React, { Component } from 'react'
import { apiUrl } from "../../config.json";
import http from '../../services/httpService';
import { Notyf } from 'notyf';
import Pagination from "react-js-pagination";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import Spinners from '../../components/common/spinners';
const apiEndpoint = apiUrl + "/devisVente/";
const notyf = new Notyf({
    duration: 4000,
    position: {
        x: 'center',
        y: 'top'
    },
})
export default class ListDevisVente extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            devis: [],
            loaded: false,
            activePage: 1,
            devisPerPage:5,
            search: ""
        };
    }
    async refreshDevis() {
        http.get(apiEndpoint).then(res => {
            this.setState({
                devis: res.data, loaded: true
            });
        });
        console.log('devis:', this.state.devis)
    }
    componentDidMount() {
        this.refreshDevis();
    }
    updateSearch = (event) => {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    gotoViewQuotation(id) {
        window.location.href = '/view/devis-vente/' + id
    }
    gotoViewInvoice(id) {
        window.location.href = '/view/facture-vente/' + id
    }
    gotoViewBL(id) {
        window.location.href = '/view/bon-livraison-vente/' + id
    }
    gotoContenuQuotation(id) {
        window.location.href = '/view/contenu-vente/' + id
    }
    gotoValiderCommande(id) {
        window.location.href = '/view/confirmation/' + id
    }
    deleteQuotation(id, quotation) {
        const mes = window.confirm(
            "Do you really want to delete " + quotation + " ?"
        );
        if (mes) {
            http.delete(apiEndpoint + "delete/" + id + "/").then(resp => {
                this.refreshDevis();
            });
        }
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    render() {
        const { devis, loaded, activePage, devisPerPage} = this.state;
        console.log('devis : ', devis)
        const indexOfLastDevis = activePage * devisPerPage;
        const indexOfFirstAgent = indexOfLastDevis - devisPerPage;
        const currentDevis = devis.slice(indexOfFirstAgent, indexOfLastDevis);
        let devisVente = null;
        if (!this.state.loaded) {
            devisVente = <Spinners />
        }
        else {
            let filterDevis = currentDevis.filter(dev => {
                let devInfos =
                        dev.ref_devis ? dev.ref_devis.toLowerCase() : '' +
                        dev.client ? dev.client.clientFirstName.toLowerCase() : '' +
                        dev.client.clientLastName.toLowerCase() +
                        dev.client.clientAddress.toLowerCase() +
                        dev.client.clientPhone.toLowerCase()
                return devInfos.indexOf(this.state.search.toLowerCase()) !== -1;
            });
            devisVente = filterDevis.map(dev => {
                return (
                    <tr key={dev.id}>
                        <td>{dev.id}</td>
                        <td>{dev.ref_devis}</td>
                        <td>{dev.client ?
                            dev.client.clientFirstName.toUpperCase() : ''} {dev.client ? dev.client.clientLastName.toUpperCase() : ''} </td>
                        <td style={{ textAlign: 'center' }}>{dev.client ? dev.client.clientAddress.toUpperCase() : ''}</td>
                        <td>{dev.client ? dev.client.clientPhone : ''}</td>
                        <td>
                            <Button
                                variant="danger"
                                size="sm"
                                className="mr-2"
                                onClick={this.deleteQuotation.bind(this, dev.id, dev.ref_devis)}
                            >
                                delete
                            </Button>
                            <Button variant="warning" size="sm" className="mr-2" onClick={this.gotoViewInvoice.bind(this, dev.id)}>
                                Facture
                            </Button>
                            <Button variant="secondary" size="sm" className="mr-2" onClick={this.gotoViewQuotation.bind(this, dev.id)}>
                                Devis
                            </Button>
                            <Button variant="dark" size="sm" className="mr-2" onClick={this.gotoViewBL.bind(this, dev.id)}>
                                B. Livraison
                            </Button>
                            <Button variant="success" size="sm" className="mr-2" onClick={this.gotoValiderCommande.bind(this, dev.id)}>
                            Valider
                            </Button>
                            <Button variant="primary" size="sm" className="mt-1" onClick={this.gotoContenuQuotation.bind(this, dev.id)}>
                                contenu
                            </Button>
                        </td>
                    </tr>
                )
              });
            }
            return (
                <div>
                <Row>
                  <Col md={4}>
                  </Col>
                  <Col md={{ offset: 4 }}>
                    <Form className="form-inline mb-2">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          value={this.state.search}
                          onChange={this.updateSearch.bind(this)}
                          placeholder="Chercher devis"
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
                      <th>Ref Devis</th>
                      <th>Nom</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>actions sur client</th>
                    </tr>
                  </thead>
                    <tbody>
                      {devisVente}
                    </tbody>
                  </Table>
                  <div className="alignement">
                        <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        prevPageText='prev'
                        nextPageText='next'
                        activePage={activePage}
                        itemsCountPerPage={devisPerPage}
                        totalItemsCount={devis.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        /> 
                   </div>                
                </React.Fragment>
                }
                {!loaded && <React.Fragment>{devisVente}</React.Fragment>}
                </div>
            )
        }
    }

