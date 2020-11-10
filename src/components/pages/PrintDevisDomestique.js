import React, { Component} from 'react'
import ReactToPrint from "react-to-print";
import ViewDevisDomestique from './ViewDevisDomestique';

class PrintDevisDomestique extends Component {
    render() {
      const id = this.props.match.params.id;
      return (
        <div>
          <div className="text-center-printer">
            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return <button className="btn btn-primary" href>Print this out!</button>;
              }}
              content={() => this.componentRef}
            />
          </div>
          <ViewDevisDomestique valueFromPrint={id}  ref={el => (this.componentRef = el)} /></div>
      );
    }
  }
  
  export default PrintDevisDomestique;
  
