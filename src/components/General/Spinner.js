import React from "react";
import '../../css/spinner.css'
import '../../css/index.css'

const Spinner = props => (
  <div className='center'>
    <div className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
