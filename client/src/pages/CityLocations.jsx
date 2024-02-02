import React, { useEffect, useState } from 'react'
import '../styles/CityLocations.css'
import { useNavigate, useParams } from 'react-router-dom'
import Ajmer from '../images/ajmerFort.webp'
import Meenakshi from '../images/meenakshiTemple.avif'
import Ellora from '../images/elloraCaves.avif'
import RajaSeat from '../images/rajaSeat.avif'
import axios from 'axios'

const CityLocations = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [monuments, setMonuments] = useState([]);

    useEffect(() => {
            
        fetchMonuments();
    
     }, []);

    const fetchMonuments = async () => {
        try {
          await axios.get('http://localhost:6001/fetch-monuments').then(
            (res)=>{
                console.log(res.data);
                const monus = res.data.filter((monu) => monu.city === id);
                setMonuments(monus);
            }
          )
    
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className='CityLocations GenPagePadding' >
        <h3>Popular monuments in <span>{id}</span>...</h3>

        {monuments.length === 0 ?
            <p>No monuments available</p>
        :
            <div className='CityLocations__container'>
                    {monuments.map((monu) => (
                        <div className="city_location" key={monu._id} onClick={()=> navigate(`/location/${monu._id}`)} >
                            <img src={monu.bannerImg} alt=''/>
                            <h4>{monu.title}</h4>
                            <p>{monu.address}</p>
                        </div>
                    ))}
            </div>
        }


    </div>
  )
}

export default CityLocations