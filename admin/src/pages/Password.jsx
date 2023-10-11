import React from 'react';



export default function Pseudo({inputStates, setInputStates, showValidation}) {


    return (
        <>
            <label htmlFor="password">
                Mot de passe
                </label>

            <input id="password"
            type="password"
            className="adminInput"
            value={inputStates.password}
            onChange={e => setInputStates({...inputStates, 
            password: e.target.value})}>

            </input>

            {showValidation.password && (
                <p className="alertAdmin">Erreur d'Authentification</p>
            
            )}
        </>
    )
};