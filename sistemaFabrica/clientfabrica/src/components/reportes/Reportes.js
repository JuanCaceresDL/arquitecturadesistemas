import React from 'react';
import Navigation from '../publicElements/Navigation'
import {useHistory} from "react-router-dom";


function Reportes() {

    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }
    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Reportes</h1>
        </section>

      </div>
    );
  }
  
  export default Reportes;