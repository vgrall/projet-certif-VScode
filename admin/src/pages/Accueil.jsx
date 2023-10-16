import React from 'react';
import { Link } from "react-router-dom";

const Administration = ()=> {
    return (
        <div>
        <div className="banner">
          <img id="triskell" src="images/banner.png" alt="banner" />
        </div>
      
        <div className="bodyList">
          <h1>PAGE ADMINISTRATION</h1>
      
          <div className="containerChoix">
            <div className="grid-item1">
              <p className="accueilP">MENUS</p>
              <div className="lienBtn">
              <Link  to="/carte">
                <button id="btnAccueil" className="updateBtn">Valider</button>
              </Link>
              </div>
            </div>
      
            <div className="grid-item2">
              <p className="accueilP">CONCOURS</p>
              <div className="lienBtn">
              <Link  to="/concours">
                <button id="btnAccueil" className="updateBtn">Valider</button>
              </Link>
              </div>
            </div>
      
            <div className="grid-item3">
              <p className="accueilP">AVIS</p>
              <div className="lienBtn">
              <Link to="/avis">
                <button id="btnAccueil" className="updateBtn">Valider</button>
              </Link>
              </div>
            </div>
      
            <div className="grid-item4">
              <p className="accueilP">RESTAURANTS</p>
              <div className="lienBtn">
              <Link to="/restaurants">
                <button id="btnAccueil" className="updateBtn">Valider</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  );
};

export default Administration;