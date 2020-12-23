import React, { Component} from 'react'
import ReactToPrint from "react-to-print";
import ViewDevisVente from './ViewDevisVente';

class PrintDevisVente extends Component {
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
          <ViewDevisVente valueFromPrint={id} ref={el => (this.componentRef = el)} />
          </div>
      );
    }
  }
  
  export default PrintDevisVente;
  
