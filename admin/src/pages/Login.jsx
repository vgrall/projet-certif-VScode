import React, { useState, useEffect } from 'react'; 
import Pseudo from './Pseudo';
import Password from './Password';
import axios from 'axios';

const Login = () => {
    const apiServer = "http://" + window.location.hostname + ":3000";

    const [inputStates, setInputStates] = useState({
        pseudo: '',
        password: '',
    });

    const [showValidation, setShowValidation] = useState({
        pseudo: false,
        password: false,
    });

    console.log(inputStates);

    async function handleSubmit(e) {
        e.preventDefault();

        const { pseudo, password } = inputStates; // Obtenez le pseudo et le mot de passe à partir des états React

        const url = apiServer + "/login";

        try {
            const res = await axios.post(url, { pseudo, password });
            console.log(res);
            window.location.href = '/accueil';
        } catch (error) {
            console.log(error);
            setShowValidation({
                pseudo: true,
                password: true,
            });
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

export default Login;