import React from 'react';



export default function Pseudo({inputStates, setInputStates, showValidation}) {
    return (
        <>
            <label htmlFor="userName">
                Pseudo
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
          

        </>
    );
}
