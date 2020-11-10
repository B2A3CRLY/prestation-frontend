import React, { Component, useRef } from 'react'
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ViewDevis from './ViewDevis';

class PrintDevis extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            idDevis:''
        }
    }
    componentDidMount(){
        const idDevis = this.props.match.params.id;
        this.setState({ idDevis });
    }
    changeUrl(){
      var curURL = window.location.href;
      window.history.replaceState(window.history.state, '', curURL);
      window.print();
      window.history.replaceState(window.history.state, '', '');
    }
    render() {
      const id = this.props.match.params.id;
      return (
        <div>
          <div className="text-center-printer">
            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return <button className="btn btn-primary" href onClick={this.changeUrl}>Print this out!</button>;
              }}
              content={() => this.componentRef}
            />
          </div>
          <ViewDevis valueFromPrint={id}  ref={el => (this.componentRef = el)} /></div>
      );
    }
  }
  
  export default PrintDevis;
  
