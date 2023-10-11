import React from 'react';



export default function Pseudo({inputStates, setInputStates, showValidation}) {
    return (
        <>
            <label htmlFor="userName">
                Pseudo (3 caractères minimum)
            </label>

            <input
                id="UserName"
                type="texte"
                className="adminInput"
                value={inputStates.pseudo}
                onChange={e =>
                    setInputStates({
                        ...inputStates,
                        pseudo: e.target.value
                    })
                }
            />
            {showValidation.pseudo && (
                <p className="alertAdmin">Votre pseudo est incorrect</p>
            
            )}

        </>
    );
}
