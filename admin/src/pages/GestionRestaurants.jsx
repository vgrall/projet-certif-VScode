import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GestionRestaurants = () => {const [restaurants, setRestaurants] = useState([]);
    const apiServer = "http://"+ window.location.hostname +":3000";
    
    useEffect(() => {

        const fecthAllRestaurants = async () => {
            try{
                const url = apiServer+ `/api/restaurants`;
                console.log("get restaurants items ", url);
                const res = await axios.get(url);
                setRestaurants(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }

        };

        fecthAllRestaurants();

    }, [apiServer]);

    const handleDelete = async (id) => {
        console.log("Delete button clicked for ID:", id);
        try{
            const url = apiServer+ `/api/restaurants/${id}`;
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
            <h1>LISTES DES RESTAURANTS</h1>

            <div className="addBtnBackBtn">
                <div className="buttons">
                <button className="addButton"><Link to="/ajoutRestaurant" id="addBtn">AJOUT D'UN RESTAURANT</Link></button> 
                </div>
                <div className="buttons">
                <button className="addButton"><Link to="/accueil" id="addBtn">RETOUR HOME</Link></button> 
                </div>
                </div>

            <div className="listMenu">
                {restaurants.map(restaurant => (
                    <div className="item" key={restaurant.ID}>
                        <ul>
                            <li>id : {restaurant.ID}</li>
                            <li>NOM : {restaurant.NAME}</li>
                            <li>ADRESSE : {restaurant.ADRESSE}</li>
                            <li>CP : {restaurant.CP}</li>
                            <li>VILLE : {restaurant.VILLE}</li>
                            <li>image : {restaurant.IMAGE}</li>
                            <li>TELEPHONE : {restaurant.PHONE}</li>
                           
                        </ul>


                        <div className="buttons">
                        <button className="deleteBtn"onClick={()=>handleDelete(restaurant.ID)}>SUPPRIMER</button>
                        <button className="updateBtn"><Link to={`/modifRestaurant/${restaurant.ID}`} id="btn" >MODIFIER</Link></button>
                    
                        </div>

                    </div>
                    
                ))}
            </div>
                     
        </div>
        </div>
    );
};

export default GestionRestaurants;