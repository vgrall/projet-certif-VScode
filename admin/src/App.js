import { BrowserRouter, Routes, Route } from "react-router-dom";
import GestionMenus from "./pages/GestionMenus";
import Ajout from "./pages/Ajout";
import Modif from "./pages/Modif";
import "./App.css";
import Validation from "./pages/Validation";
import Accueil from "./pages/Accueil";
import GestionDuConcours from "./pages/GestionDuConcours";
import GestionDesAvis from "./pages/GestionDesAvis";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
