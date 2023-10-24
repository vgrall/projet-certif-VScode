import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {

  const apiServer = "http://"+ window.location.hostname +":3000";

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [users, setUsers] = useState({
    pseudo: "",
    password: "",
    role: ""
  });
 
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("handleChange", "event.target.name", event.target.name);
    setUsers(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
  
    try {
      const url = apiServer + "/api/addUser";
      await axios.post(url, users);
      setUsers({
        pseudo: "",
        password: "",
        role: ""
      });
      setFormSubmitted(true);
      navigate("/addUser");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <img id="triskell" src="images/banner.png" alt="banner" />
      </div>

      {formSubmitted ? (
       <div className="containerSuccesForm">
       <h1>Le formulaire a été soumis avec succès !</h1>
       <button id="backBtn">
         <Link to="/login">RETOUR LOGIN</Link>
       </button>
     </div>
       

      ) : (
        <div className="form">
          <h1>AJOUT D'UN UTILISATEUR</h1>

          <div className="inputs">
            <input type="text" placeholder="id" onChange={handleChange} name="id" autoComplete="off" />
          </div>

          <div className="inputs">
            <input type="text" placeholder="pseudo" onChange={handleChange} name="pseudo" autoComplete="off" />
          </div>

          <div className="inputs">
            <input type="text" placeholder="password" onChange={handleChange} name="password" autoComplete="new-password" />
          </div>

          <div className="inputs">
            <input type="text" placeholder="role" onChange={handleChange} name="role" autoComplete="new-role" />
          </div>

          <div className="buttons">
            <button id="backBtn"><Link to="/login">RETOUR LOGIN</Link></button>
            <button id="sendBtn" onClick={handleClick}>ENVOYER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
