import React, { Component } from 'react';



export default function Pseudo({inputStates, setInputStates, showValidation}) {


    return (
        <>
            <label htmlFor="password" className="text-slate-50 inline-block mt-5">
                Mot de passe (1 chiffre minimum et 6 caractères)
                </label>

            <input id="password"
            type="password"
            className="adminInput"
            value={inputStates.password}
            onChange={e => setInputStates({...inputStates, 
            password: e.target.value})}>

            </input>

            {showValidation.password && (
                <p className="alertAdmin">Votre mot de passe est incorrect</p>
            
            )}
        </>
    )
};