import React, { useContext } from 'react'
import { IoMdSearch } from "react-icons/io";
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {

  const navigate = useNavigate();
  const {logout} = useContext(GeneralContext);

  return (
    <div className='Navbar' >

        <h3 onClick={()=> navigate('/')} >SB Local</h3>

        {localStorage.getItem('userId') ?
          <div className="nav_options">
            <p onClick={()=> navigate('/')} >Home</p>
            <p onClick={()=> navigate('/search')}><IoMdSearch className='nav_search_icon' />Search</p>
            <p onClick={()=> navigate('/add-location')}>Add location</p>
            <p onClick={()=> navigate('/contributions')}>Contributions</p>
            <p onClick={()=> logout()} >Logout</p>
          </div>
        :
          <div className="nav_options">
            <p onClick={()=> navigate('/')} >Home</p>
            <p onClick={()=> navigate('/search')}><IoMdSearch className='nav_search_icon' />Search</p>
            <p onClick={()=> navigate('/authenticate')} >Login</p>
          </div>
        }


    </div>
  )
}

export default Navbar