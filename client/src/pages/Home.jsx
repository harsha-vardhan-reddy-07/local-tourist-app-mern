import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios'
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


const Home = () => {

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
            setMonuments(res.data);
        }
      )

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='HomePage GenPagePadding' >
        <div className="home_banner">
          <h1 className="home_banner_title">Together, let's discover all our local wonders with <span>SB Local</span> ...</h1>
        </div>

        <div className="popular_cities_container">
            <h2 className="popular_cities_title">Popular Cities</h2>
            <div className="popular_cities">

              <div className="popular_city" onClick={()=> navigate('/city/Hyderabad')} >
                <img src={Hyderabad} alt="" />
                <h4>Hyderabad</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Mumbai')}>
                <img src={Mumbai} alt="" />
                <h4>Mumbai</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Bengaluru')}>
                <img src={Bengaluru} alt="" />
                <h4>Bengaluru</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Chennai')}>
                <img src={Chennai} alt="" />
                <h4>Chennai</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Jaipur')}>
                <img src={Jaipur} alt="" />
                <h4>Jaipur</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Kolkata')}>
                <img src={Kolkata} alt="" />
                <h4>Kolkata</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Agra')}>
                <img src={Agra} alt="" />
                <h4>Agra</h4>
              </div>

              <div className="popular_city" onClick={()=> navigate('/city/Tirupati')}>
                <img src={Tirupati} alt="" />
                <h4>Tirupati</h4>
              </div>

            </div>
        </div>

        <div className="trending_destinations_container">
          <h2>Trending monuments</h2>
          <div className="trending_destinations">

            {monuments.map((monument, index) => {
              return index < 4 && (
              <div className="trending_destination" key={index} onClick={()=> navigate(`/location/${monument._id}`)} >
                <img src={monument.bannerImg} alt="" />
                <h4>{monument.title}</h4>
              </div>
            )})}

            
    

          </div>
        </div>



    </div>
  )
}

export default Home