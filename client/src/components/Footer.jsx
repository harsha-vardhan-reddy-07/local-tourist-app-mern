import React from 'react'
import '../styles/Footer.css'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='Footer' >
          <div className="footer_body">
            <div className="footer_title">
              <h2>SB Local</h2>
              <p>SB Local is your interactive guide to uncovering the unique wonders near you. Share local monuments, historical sites, and hidden gems, and explore your city with a fresh perspective.</p>
            </div>
            <div className="footer_options">
              <ul>
                <li onClick={()=>navigate('/')} >Home</li>
                <li onClick={()=>navigate('/search')}>Search</li>
                <li onClick={()=>navigate('/city/Jaipur')}>Jaipur</li>
              </ul>
              <ul>
                <li onClick={()=>navigate('/city/Hyderabad')}>Hyderabad</li>
                <li onClick={()=>navigate('/city/Bengaluru')}>Bengaluru</li>
                <li onClick={()=>navigate('/city/Mumbai')}>Mumbai</li>
              </ul>
              <ul>
                <li onClick={()=>navigate('/city/Kolkata')}>Kolkata</li>
                <li onClick={()=>navigate('/city/Chennai')}>Chennai</li>
                <li onClick={()=>navigate('/city/Vizag')}>Vizag</li>
              </ul>
            </div>
          </div>
          <hr />
          <p className='footer_copy' >&copy; All Rights Reserved - 2024 - SB Local </p>
    </div>
  )
}

export default Footer