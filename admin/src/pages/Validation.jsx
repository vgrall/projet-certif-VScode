import React, { useState, useEffect } from 'react'; // Importez useEffect depuis 'react'
import Pseudo from './Pseudo';
import Password from './Password';
import axios from 'axios';


const Validation = () => {
   
    const [accueil, setAccueil] = useState([]);
    const apiServer = "http://" + window.location.hostname + ":3000";

    useEffect(() => {
        const fetchAllAccueil = async () => {
            try {
                const url = apiServer + "/api/accueil";
                console.log("get validation items ", url);
                const res = await axios.get(url);
                setAccueil(res.data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllAccueil();
    }, [apiServer]); 

    const [inputStates, setInputStates] = useState({
        pseudo: '',
        password: '',
    });

    const [showValidation, setShowValidation] = useState({
        pseudo: false,
        password: false,
    });

    console.log(inputStates);

    function handleSubmit(e) {
        e.preventDefault();

        if (ValidationCheck()) {
            console.log('demande de connexion validée');
            window.location.href = '/accueil';
        }
    }

    function ValidationCheck() {
        const { pseudo, password } = inputStates; // Obtenez le pseudo et le mot de passe à partir des états React
    
        // Comparez le pseudo et le mot de passe avec les données récupérées du serveur
        const user = accueil.find((user) => user.pseudo === pseudo && user.password === password);
    
        if (user) {
            return true; // Authentification réussie
        } 
        else {
            setShowValidation({
                pseudo: true,
                password: true,
            });
            return false; // Identifiants incorrects
        }
    }
    return (
        <>
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
        </>
    );
};

export default Validation;