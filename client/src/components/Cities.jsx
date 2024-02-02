import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hyderabad from '../images/hyderabad.jpg'
import Mumbai from '../images/mumbai.jpg'
import Bengaluru from '../images/bengaluru.jpg'
import Chennai from '../images/chennai.jpg'
import Jaipur from '../images/jaipur.jpg'
import Kolkata from '../images/kolkata.jpg'
import Agra from '../images/agra.jpg'
import Tirupati from '../images/tirupati.jpg'
import Ajmer from '../images/ajmerFort.webp'
import Meenakshi from '../images/meenakshiTemple.avif'
import Ellora from '../images/elloraCaves.avif'
import RajaSeat from '../images/rajaSeat.avif'

const Cities = ({cities}) => {
  const navigate = useNavigate();
  return (
    <div className="search_cities">
      <div className="popular_cities_container">
            <h2 className="popular_cities_title">Related Cities</h2>

            {cities.length > 0?
              <div className="popular_cities">
                {cities.map((city, index) => (
                  <div key={index} className="popular_city" onClick={()=> navigate(`/city/${city.name}`)} >
                    <img src={city.bannerImg} alt="" />
                    <h4>{city.name}</h4>
                  </div>
                ))}
              </div>

            :
                <p style={{textAlign: 'center'}}>No cities available...</p>
            }

        </div>
    </div>
  )
}

export default Cities