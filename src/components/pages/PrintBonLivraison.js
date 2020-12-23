import React, { Component} from 'react'
import ReactToPrint from "react-to-print";
import ViewBonLivraisonVente from './ViewBonLivraisonVente';

class PrintBonLivraisonVente extends Component {
    render() {
      const id = this.props.match.params.id;
      return (
        <div>
          <div className="text-center-printer">
            <ReactToPrint
              trigger={() => {
                return <button className="btn btn-primary" href>Print this out!</button>;
              }}
              content={() => this.componentRef}
            />
          </div>
          <ViewBonLivraisonVente valueFromPrint={id} ref={el => (this.componentRef = el)} />
          </div>
      );
    }
  }
  
  export default PrintBonLivraisonVente;
  
