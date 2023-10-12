import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "date-fns";

const GestionDesAvis = ()=> {
    const [avis, setAvis] = useState([]);
    const apiServer = "http://"+ window.location.hostname +":3000";
    
    useEffect(() => {

        const fecthAllAvis = async () => {
            try{
                const url = apiServer+ `/api/avis`;
                console.log("get avis items ", url);
                const res = await axios.get(url);
                setAvis(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }

        };

        fecthAllAvis();

    }, [apiServer]);



    const handleDelete = async (id) => {
        try{
            const url = apiServer+ `/api/avis/${id}`;
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
            <h1>LISTES DES AVIS CLIENTS</h1>


            <div className="listMenu">
                {avis.map(avis => (
                    <div className="mailTitle" key={avis.id}>
                        <ul>
                         
                            <li className="">Prénom : {avis.firstname} Nom : {avis.lastname}</li>
                            <li className="">
                            <a href={`mailto:${avis.email}`}>Mail : {avis.email}</a>
                            </li>
                            <li className=""> Date de l'avis : 
                                {format(new Date(avis.date_creation), " dd/MM/yy")}
                            </li>
                            <li className="">Note : {avis.satisfaction}</li>
                            <li className="">{avis.comment}</li>
                            <li className="">Restaurant visité : {avis.restaurants_id}</li>
                        </ul>

                        <div className="buttons">
                        <button className="deleteBtn"onClick={()=>handleDelete(avis.id)}>SUPPRIMER</button>
                      
                        </div>

                    </div>
                    
                ))}
            </div>
                     
        </div>
        </div>
    );
};

export default GestionDesAvis;