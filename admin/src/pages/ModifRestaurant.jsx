import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ModifRestaurant = () => {
    const apiServer = "http://" + window.location.hostname + ":3000";

    const [options, setOptions] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState();

    const [restaurant, setRestaurant] = useState({
        id: null,
        name: "",
        adresse: "",
        cp: "",
        ville: "",
        phone: "",
        image: ""
    });
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const idParam = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const url = apiServer + "/api/restaurants/" + idParam;;
                const res = await axios.get(url);
                const { id, name, adresse, cp, ville, phone, image } = res.data;
                setRestaurant({ id, name, adresse, cp, ville, phone, image });
                // setSelectedCategory(res.data.categories_id);
            }catch(err){
                if (err.response.status === 403) {
                    window.location.href = "/login";
                }
                console.log(err);
            }
        };

        const fetchCategories = async () => {
            try {
                const url = `${apiServer}/api/categories`;
                const res = await axios.get(url);
                const options = res.data.map(d => ({
                    "value": d.ID,
                    "label": d.NAME
                }));
                setOptions(options);
            } catch(err){
                if (err.response.status === 403) {
                    window.location.href = "/login";
                }
                console.log(err);
            }
        };

        fetchRestaurant();
        // fetchCategories();
    }, [idParam, apiServer]);

    const handleChange = (event) => {
        setRestaurant(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleClick = async (e) => {
        console.log("idParam", idParam);
        console.log("restaurant", restaurant);
      
        e.preventDefault();
        // restaurant.id = selectedCategory;
        try {
            const url = `${apiServer}/api/modifRestaurant/${idParam}`;
            console.log("Data from API:", { id: restaurant.id, name: restaurant.name, adresse: restaurant.adresse, cp: restaurant.cp, ville: restaurant.ville, phone: restaurant.phone, image: restaurant.image });
            await axios.put(url, restaurant);
            navigate("/restaurants");
        } catch (err) {
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
                <h1>MODIFICATION D'UN RESTAURANT</h1>
                <div className="mainForm">
                 
                    <input type="text" placeholder="nom" value={restaurant.name || ''} onChange={handleChange} name="name" />
                    <input type="text" placeholder="adresse" value={restaurant.adresse || ''} onChange={handleChange} name="adresse" />
                    <input type="text" placeholder="code postal" value={restaurant.cp || ''} onChange={handleChange} name="cp" />
                    <input type="text" placeholder="ville" value={restaurant.ville || ''} onChange={handleChange} name="ville" />
                    <input type="text" placeholder="téléphone" value={restaurant.phone || ''} onChange={handleChange} name="phone" />
                    <input type="text" placeholder="image" value={restaurant.image || ''} onChange={handleChange} name="image" />
                    <button id="sendBtn" onClick={handleClick}>ENVOYER</button>
                </div>
                <div className="buttons">
                    <button id="updateBtn" onClick={handleClick}>MODIFIER</button>
                    {error && "Something went wrong!"}
                    <button id="backBtn"><Link to="/restaurants">RETOUR LISTE</Link></button>
                </div>
            </div>
        </div>
    );
};

export default ModifRestaurant;
