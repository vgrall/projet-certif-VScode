import React, { useState } from 'react';
import Pseudo from './Pseudo';
import Password from './Password';
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const apiServer = 'http://' + window.location.hostname + ':3000';

  const [inputStates, setInputStates] = useState({
    pseudo: '',
    password: '',
  });

  const [showValidation, setShowValidation] = useState({
    pseudo: false,
    password: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const { pseudo, password } = inputStates;

    const url = apiServer + '/login';

    try {
      const res = await axios.post(url, { pseudo, password });
   

      if (res.status === 200) {
        // L'authentification a réussi
        setIsAuthenticated(true); // Mettez à jour l'état d'authentification
        window.location.href = '/accueil';
      }
    } catch (error) {
      console.log(error);
      setShowValidation({
        pseudo: true,
        password: true,
      });
    }
  }

  return (
    <div>
      <div className="banner">
        <img id="triskell" src="images/banner.png" alt="banner" />
      </div>

      <form onSubmit={handleSubmit} className="adminForm">
        <h2>Veuillez vous connecter</h2>
        <Pseudo
          inputStates={inputStates}
          setInputStates={setInputStates}
          showValidation={showValidation}
        />
        <Password
          inputStates={inputStates}
          setInputStates={setInputStates}
          showValidation={showValidation}
        />

    
        <button id="adminBtn" className="updateBtn">
          Valider
        </button>

      
 

      </form>
    </div>
  );
};

export default Login;
