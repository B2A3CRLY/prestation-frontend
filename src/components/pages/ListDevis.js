import React, { Component } from 'react'
import { apiUrl } from "../../config.json";
import http from '../../services/httpService';
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import Spinners from '../../components/common/spinners';
import Pagination from "react-js-pagination";
const apiEndpoint = apiUrl + "/devis/";
export default class ListDevis extends Component {
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
            devis: res.data, loaded:true
          });
        });
        
        }
      componentDidMount() {
       this.refreshDevis();
    }
    updateSearch = (event) =>{
        this.setState({ search: event.target.value.substr(0, 20) });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  gotoViewQuotation (id) {
    window.location.href = '/view/devis/' + id
  }
  deleteQuotation(id, quotation) {
    const mes = window.confirm(
        "Do you really want to delete " + quotation + " ?"
      );
      if (mes) {
        http.delete(apiEndpoint + "update/" + id + "/").then(resp => {
          this.refreshDevis();
        });
      }
  }
  
    render() {
        const { devis, loaded, activePage, devisPerPage} = this.state;
        console.log('devis : ', devis)
        const indexOfLastDevis = activePage * devisPerPage;
        const indexOfFirstAgent = indexOfLastDevis - devisPerPage;
        const currentDevis = devis.slice(indexOfFirstAgent, indexOfLastDevis);
        let devisAgricole = null;
        if (!this.state.loaded) {
            devisAgricole = <Spinners />
          }
          else {
            let filterDevis = currentDevis.filter(dev => {
              let devInfos =
              dev.ref_devis.toLowerCase() +
              dev.client.clientFirstName.toLowerCase() +
              dev.client.clientLastName.toLowerCase() + 
              dev.client.clientAddress.toLowerCase() +
              dev.client.clientPhone.toLowerCase() +
              dev.fieldAddress.toLowerCase()
              return devInfos.indexOf(this.state.search.toLowerCase()) !== -1;
            });
            devisAgricole = filterDevis.map(dev => {
              return (
                <tr key={dev.id}>
                  <td>{dev.id}</td>
                  <td>{dev.ref_devis}</td>
                      <td>{dev.client ? dev.client.clientFirstName : ''} {dev.client ? dev.client.clientLastName : ''} </td>
                  <td style={{textAlign:'center'}}>{dev.client ? dev.client.clientAddress: ''}</td>
                  <td>{dev.client ? dev.client.clientPhone: ''}</td>
                  <td>{dev.client ? dev.client.clientEmail : ''}</td>
                  <td>{dev.fieldAddress}</td>
                  <td>{dev.totalAreaPerimeter}</td>
                  <td>{dev.totalAreaDevelopable}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="mr-2"
                      onClick = {this.deleteQuotation.bind(this, dev.id, dev.ref_devis)}
                    >
                      delete
                  </Button>
                    <Button variant="primary" size="sm" className="mt-1" onClick = {this.gotoViewQuotation.bind(this, dev.id)}>
                      view
                  </Button>
                  </td>
                </tr>
              );
            })
          };
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
              <th>Email</th>
              <th>Adresse Champ</th>
              <th>Superficie Totale</th>
              <th>Superficie à Aménager</th>
              <th>actions sur client</th>
            </tr>
          </thead>
            <tbody>
              {devisAgricole}
            </tbody>
          </Table>
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
        </React.Fragment>
        }
        {!loaded && <React.Fragment>{devisAgricole}</React.Fragment>}
        </div>
        )
    }
}
