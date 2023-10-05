import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Ajout = () => {
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const apiServer = "http://"+ window.location.hostname +":3000";
    
    const [item, setItem] = useState({
        name: "",
        categories_id: "",
        price: null
    });
    const [error,setError] = useState(false);

    useEffect(() => {
        // voir https://stackoverflow.com/questions/72301355/how-to-populate-select-options-from-an-api-call-in-react-js-on-page-load
        const fetchCategories = async () => {
            try{
                const url = apiServer + "/api/categories";
                console.log("get categories items ", url);
                const res = await axios.get(url);
                const options = res.data.map(d => ({
                    "value" : d.ID,
                    "label" : d.NAME
                  }))
                  setOptions(options);
                  setSelectedCategory(options[0].value); // selectionner la premiere categorie par defaut
            }catch(err){
                console.log(err);
            }

        };

        fetchCategories();
    }, [apiServer]);

    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log("handleChange","event.target.name", event.target.name);
        setItem(prev=>({...prev, [event.target.name]: event.target.value}));
    };

    const handleClick = async e=>{
        e.preventDefault();
        item.categories_id = selectedCategory;
        try{
            const url = apiServer + "/api/menus";
            console.log("post menu item ", url);
            await axios.post(url, item);
            navigate("/")
        }catch(err){
            console.log(err);
            setError(true)
        };
    }

    return (
    <div>
        {/* Banner */}
        <div className="banner">
            {/* insertion Triskell.jpg du fichier src/images*/}
            <img id="triskell" src="images/banner.png" alt="banner" />
        {/* Vous pouvez également ajouter un fond ici */}
        </div>
        <div className="form">
            <h1>AJOUT DANS LE MENU</h1>
            <div className="inputs">
            <input type="text" placeholder="nom" onChange={handleChange} name="name"/>
            <select 
                value={selectedCategory}
                onChange={e => {setSelectedCategory(e.target.value)}}                
                name="categories_id" 
                >
            { // https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
            options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))
            }
            </select>                
            <input type="number" placeholder="prix" onChange={handleChange} name="price" />
            </div>

        <div className="buttons">
            <button id="sendBtn"  onClick={handleClick}>ENVOYER</button>
            {error && "Something went wrong!"}
            <button id="backBtn"><Link to="/" >RETOUR LISTE</Link></button>
        </div>
           
        </div>
    </div>
    );
};

export default Ajout;