import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GestionMenus = ()=> {
    const [menus, setMenus] = useState([]);
    const apiServer = "http://"+ window.location.hostname +":3000";
    
    useEffect(() => {

        const fecthAllMenus = async () => {
            try{
                const url = apiServer+ `/api/menus`;
                console.log("get menus items ", url);
                const res = await axios.get(url);
                setMenus(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }

        };

        fecthAllMenus();

    }, [apiServer]);

    const handleDelete = async (id) => {
        try{
            const url = apiServer+ `/api/menus/${id}`;
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
            {/* insertion Triskell.jpg du fichier src/images*/}
            <img id="triskell" src="images/banner.png" alt="banner" />
        {/* Vous pouvez également ajouter un fond ici */}
        </div>
       
        <div className="bodyList">
            <h1>LISTES DES PRODUITS</h1>

            <div className="buttons">
            <button className="addButton"><Link to="/ajout" id="addBtn">AJOUT AU MENU</Link></button> 
            </div>

            <div className="listMenu">
                {menus.map(menu => (
                    <div className="item" key={menu.id}>
                        <ul>
                            <li>id : {menu.id}</li>
                            <li>nom : {menu.name}</li>
                            <li>catégorie : {menu.category}</li>
                            <li>prix : {menu.price} €</li>
                        </ul>
                        <div className="buttons">
                        <button className="deleteBtn"onClick={()=>handleDelete(menu.id)}>SUPPRIMER</button>
                        <button className="updateBtn"><Link to={`/modif/${menu.id}`} id="btn" >MODIFIER</Link></button>
                        </div>

                    </div>
                    
                ))}
            </div>
                     
        </div>
        </div>
    );
};

export default GestionMenus;