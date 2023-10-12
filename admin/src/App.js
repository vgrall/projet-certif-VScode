import { BrowserRouter, Routes, Route } from "react-router-dom";
import GestionMenus from "./pages/GestionMenus";
import Ajout from "./pages/Ajout";
import Modif from "./pages/Modif";
import "./App.css";
import Validation from "./pages/Validation";
import Accueil from "./pages/Accueil";
import GestionDuConcours from "./pages/GestionDuConcours";
import GestionDesAvis from "./pages/GestionDesAvis";
import GestionRestaurants from "./pages/GestionRestaurants";
import AjoutRestaurant from "./pages/AjoutRestaurant";
import ModifRestaurant from "./pages/ModifRestaurant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Validation />} />
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
