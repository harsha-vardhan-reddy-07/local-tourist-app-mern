import React, { useEffect, useState } from 'react'
import '../styles/Search.css'
import Cities from '../components/Cities'
import Locations from '../components/Locations'
import axios from 'axios'

const Search = () => {

    const [isCity, setIsCity] = useState(true);

    const [allCities, setAllCities] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    const fetchAllData = async () =>{
        await axios.get(`http://localhost:6001/fetch-cities`).then(
            (res)=>{setAllCities(res.data)}
        )
        await axios.get(`http://localhost:6001/fetch-monuments`).then(
            (res)=>{setAllLocations(res.data)}
        )
    }

    useEffect(()=>{
        fetchAllData();
    },[]);

    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);

    const [search, setSearch] = useState('');

    const handleSearch = async () =>{
        let city_list = allCities.filter((city)=> city.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(city.name.toLowerCase()));
        setCities(city_list);

        let location_list = allLocations.filter(
                                    (location)=> location.title.toLowerCase().includes(search.toLowerCase())
                                                 || search.toLowerCase().includes(location.title.toLowerCase()) 
                                                 || location.city.toLowerCase().includes(search.toLowerCase()) 
                                                 || search.toLowerCase().includes(location.city.toLowerCase()) 
                                                 || location.address.toLowerCase().includes(search.toLowerCase()));
        setLocations(location_list);
    }

  return (
    <div className='searchPage GenPagePadding' >
        <div className="search_container">
            <h3>What Interests You Today..?</h3>
            <div className="search_type_toggle">
                <p className={isCity ? 'active' : ''}  onClick={()=> setIsCity(true)} >Cities</p>
                <p className={!isCity ? 'active' : ''}  onClick={()=> setIsCity(false)} >Locations</p>
            </div>
            <div className="search_bar">
                <input type="text" placeholder={isCity ? 'Search cities' : 'Search locations'} onChange={(e)=>setSearch(e.target.value)} />
                <button onClick={handleSearch} >Search</button>
            </div>
        </div>

        {isCity?
            <Cities cities = {cities} />
        :
            <Locations locations={locations} />
        }

    </div>
  )
}

export default Search