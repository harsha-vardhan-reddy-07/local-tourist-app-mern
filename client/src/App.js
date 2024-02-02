import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';
import NewLocation from './pages/NewLocation';
import Location from './pages/Location';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './pages/Search';
import Contributions from './pages/Contributions';
import CityLocations from './pages/CityLocations';

function App() {
  return (
    <div className="App">

      <Navbar/>

     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/add-location" element={<NewLocation />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/city/:id" element={<CityLocations />} />
        <Route path="/location/:id" element={<Location />} />

     </Routes>

     <Footer />
    </div>
  );
}

export default App;
