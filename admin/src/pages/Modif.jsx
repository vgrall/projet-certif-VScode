import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const Modif = () => {
    const apiServer = "http://"+ window.location.hostname +":3000";

    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [item, setItem] = useState({
        id : null,
        name: "",
        categories_id: "",
        price: null
    });

    const [error,setError] = useState(false)

    const navigate = useNavigate(); 
    const location = useLocation();

    const idParam = location.pathname.split("/")[2];


    useEffect(() => {

        // Recuperation des données du menu à modifier
        const fetchMenuItem = async () => {
            try{
                const url = apiServer +"/api/menus/" + idParam;
                console.log("get menu item ", url);
                const res = await axios.get(url);
                const {id, name, categories_id, price} = res.data;
                setItem({id, name, categories_id, price});
                setSelectedCategory(res.data.categories_id);

            }catch(err){
                console.log(err);
            }
        }


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
            }catch(err){
                console.log(err);
            }
        };

        fetchCategories();
        fetchMenuItem();
    }, [idParam, apiServer]);

    const handleChange = (event) => {
        setItem(prev=>({...prev, [event.target.name]: event.target.value}));
    };

     const handleClick = async e=>{
          e.preventDefault();
          item.categories_id = selectedCategory;
          try{
                const url = `${apiServer}/api/modif/${idParam}`;
                console.log("put menu item ", url);            
                await axios.put(url, item);
                navigate("/carte")
            }catch(err){
                console.log(err);
                setError(true);

            };
     }

    return (
    <div>

        <div className="banner">
            <img id="triskell" src="/images/banner.png" alt="banner" />
        </div>
        
        <div className="form">
            <h1>MODIFICATION DANS LE MENU</h1>

            <div className="mainForm">
            <input type="text" placeholder="nom" value={item.name} onChange={handleChange} name="name"/>
            <select 
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                name="type" 
                >
            { // https://react.dev/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable
            options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))
            }
            </select>  
            <input type="number" placeholder="prix" value={item.price} onChange={handleChange} name="price" />

            <button id="sendBtn" onClick={handleClick}>ENVOYER</button>
            </div>
            <div className="buttons">
            <button id="updateBtn" onClick={handleClick}>MODIFIER</button>
            {error && "Something went wrong!"}
            <button id="backBtn" ><Link to="/carte">RETOUR LISTE</Link></button>
            </div>

        </div>
    </div>
       
        
    );
};

export default Modif;