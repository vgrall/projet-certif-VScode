import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AjoutRestaurant = () => {
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const apiServer = "http://"+ window.location.hostname +":3000";

  const [restaurants, setRestaurant] = useState({
    name: "",
    adresse: "",
    cp: "",
    ville: "",
    phone: "",
    image: ""
  });
  const [error,setError] = useState(false);

  useEffect(() => {
    const fetchRestaurants= async () => {
      try{
        const url = apiServer + "/api/restaurants";

        const res = await axios.get(url);
        const options = res.data.map(d => ({
          "value" : d.ID,
          "label" : d.NAME
        }));
        setOptions(options);
        setSelectedCategory(options[0].value); // selectionner la premiere categorie par defaut
      }catch(err){
        console.log(err);
      }
    };

    fetchRestaurants();
  }, [apiServer]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("handleChange", "event.target.name", event.target.name);
    setRestaurant(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    restaurants.categories_id = selectedCategory;
    try{
      const url = apiServer + "/api/restaurants";
      await axios.post(url, restaurants);
      navigate("/restaurants");
    }catch(err){
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <img id="triskell" src="images/banner.png" alt="banner" />
      </div>
      <div className="form">
        <h1>AJOUT D'UN RESTAURANT</h1>

        <div className="inputs">
          <input type="text" placeholder="pseudo restaurant" onChange={handleChange} name="id" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="nom du restaurant" onChange={handleChange} name="name" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="adresse" onChange={handleChange} name="adresse" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="code postal" onChange={handleChange} name="cp" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="ville" onChange={handleChange} name="ville" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="téléphone" onChange={handleChange} name="phone" />
        </div>

        <div className="inputs">
          <input type="text" placeholder="lien image" onChange={handleChange} name="image" />
        </div>


        <div className="buttons">
          <button id="sendBtn" onClick={handleClick}>ENVOYER</button>
          {error && "quelque chose s'est mal passé"}
          <button id="backBtn"><Link to="/restaurants">RETOUR LISTE</Link></button>
        </div>
      </div>
    </div>
  );
};

export default AjoutRestaurant;
