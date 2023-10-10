import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Administration = ()=> {
    const[administration, setAdministration] = useState([]);
    const apiServer = "http://"+ window.location.hostname +":3000";

    useEffect(() => {

        const fecthAllAdministration = async () => {

            try{
                const url = apiServer+ `/api/administration`;
                console.log("get administration items ", url);
                const res = await axios.get(url);
                setAdministration(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }
        };

        fecthAllAdministration();

    }, [apiServer]);

  

    return (
        <div>
            <div className="banner">
          
            <img id="triskell" src="images/banner.png" alt="banner" />
     
            </div>
       
            <div className="bodyList">
            <h1>PAGE ADMINISTRATION</h1>
            <div className="containerChoix">
            <p className="accueilP">Gestion des menus</p>
            <Link to="/carte">
            <button id="btnAccueil" className="updateBtn">Valider</button>
            </Link>
            </div>
        </div>
            </div>
  );
};

export default Administration;