import React from 'react';
import { css } from '@emotion/core';
import '../../../src/custom.css';
// First way to import
import {CircleLoader } from 'react-spinners';
// Another way to import. This is recommended to reduce bundle size
//import ClipLoader from 'react-spinners/ClipLoader';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    width:50%;
    border-color: red;
`;
 
class Spinners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
      return (
        <div className="row mb-10">
        <div className="col-md-5"></div>
        <div className="sweet-loading col-md-4">
            <CircleLoader
            css={override}
            sizeUnit={"px"}
            heightUnit={"px"}
            widthUnit={"px"}
            size={90}
            color={'#123abc'}
            loading={this.state.loading}
            />
        </div> 
       
      </div>
       
    )
  }
}
export default Spinners;