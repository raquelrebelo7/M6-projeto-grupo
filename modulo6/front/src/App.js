import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Funcionalidades } from './components/Funcionalidades';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminFuncionalidades from './components/admin/AdminFuncionalidades';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path='/admin/funcionalidades' element={ <AdminFuncionalidades/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
