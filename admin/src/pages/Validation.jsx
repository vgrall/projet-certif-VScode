import React, { useState, useEffect } from 'react'; // Importez useEffect depuis 'react'
import Pseudo from './Pseudo';
import Password from './Password';
import { Link } from "react-router-dom";
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
            console.log('envoie du formulaire');
        }
    }

    function ValidationCheck() {
        const areValid = {
            pseudo: false,
            password: false,
        };

        // Check pseudo length
        if (inputStates.pseudo.length < 3 || inputStates.pseudo.length > 64) {
            setShowValidation((state) => ({ ...state, pseudo: true }));
        } else {
            areValid.pseudo = true;
            setShowValidation((state) => ({ ...state, pseudo: false }));
        }

        // Check password length
        if (inputStates.password.length < 6 || !/\d/.test(inputStates.password)) {
            setShowValidation((state) => ({ ...state, password: true }));
        } else {
            areValid.password = true;
            setShowValidation((state) => ({ ...state, password: false }));
        }

        if (Object.values(areValid).every((value) => value)) {
            return true;
        } else {
            return false;
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