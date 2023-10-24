import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GestionMenus from "./pages/GestionMenus";
import Ajout from "./pages/Ajout";
import Modif from "./pages/Modif";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import Accueil from "./pages/Accueil";
import GestionDuConcours from "./pages/GestionDuConcours";
import GestionDesAvis from "./pages/GestionDesAvis";
import GestionRestaurants from "./pages/GestionRestaurants";
import AjoutRestaurant from "./pages/AjoutRestaurant";
import ModifRestaurant from "./pages/ModifRestaurant";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Vérifiez si le cookie 'token' est présent
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/addUser" element={<AddUser />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/carte" element={<GestionMenus />} />
          <Route path="/concours" element={<GestionDuConcours />} />
          <Route path="/avis" element={<GestionDesAvis />} />
          <Route path="/ajout" element={<Ajout />} />
          <Route path="/modif/:id" element={<Modif />} />
          <Route path="/restaurants" element={<GestionRestaurants />} />
          <Route path="/ajoutRestaurant" element={<AjoutRestaurant />} />
          <Route path="/modifRestaurant/:id" element={<ModifRestaurant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
