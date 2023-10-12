import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GestionDuConcours = ()=> {
    const [concours, setConcours] = useState([]);
    const apiServer = "http://"+ window.location.hostname +":3000";
    
    useEffect(() => {

        const fecthAllConcours = async () => {
            try{
                const url = apiServer+ `/api/concours`;
                console.log("get concours items ", url);
                const res = await axios.get(url);
                setConcours(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }

        };

        fecthAllConcours();

    }, [apiServer]);

    const handleDelete = async (id) => {
        try{
            const url = apiServer+ `/api/concours/${id}`;
            console.log("Delete URL", url);
            await axios.delete(url);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
             <div className="banner">
            
            <img id="triskell" src="images/banner.png" alt="banner" />
       
            </div>
       
        <div className="bodyList">
            <h1>LISTES DES MAILS PARTICIPANTS</h1>


            <div className="listMenu">
                {concours.map(concours => (
                    <div className="mailTitle" key={concours.id}>
                        <ul>
                            <li className="mailParticipe">Mail du participant :</li>
                            <li className="mailConcours">
                            <a href={`mailto:${concours.mail}`}>{concours.mail}</a>
                            </li>
                        </ul>

                        <div className="buttons">
                        <button className="deleteBtn"onClick={()=>handleDelete(concours.id)}>SUPPRIMER</button>
                      
                        </div>

                    </div>
                    
                ))}
            </div>
                     
        </div>
        </div>
    );
};

export default GestionDuConcours;