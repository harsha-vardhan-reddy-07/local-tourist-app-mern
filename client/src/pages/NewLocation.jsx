import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/NewLocation.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewLocation = () => {

  const navigate = useNavigate();

  const [citiesList, setCitiesList] = React.useState([]);

  const fetchCities = async () => {
    await axios.get('http://localhost:6001/fetch-cities').then(
      (res) => {
        setCitiesList(res.data);
      }
    )};

  React.useEffect(()=>{
    fetchCities();
  },[]);

  const [city, setCity] = React.useState('');
  const [newCity, setNewCity] = React.useState(''); 
  const [cityBannerImg, setCityBannerImg] = React.useState('');

  const [title, setTitle] = React.useState('');
  const [bannerImg, setBannerImg] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [otherThings, setOtherThings] = React.useState('');

  const handleSubmit = async () => {
      await axios.post('http://localhost:6001/add-location', {title, bannerImg, description, city, newCity, cityBannerImg, address, otherThings, contributor : localStorage.getItem("username"),  contributorId : localStorage.getItem("userId")}).then(
        (res)=>{
            alert('Location added successfully!!');
            navigate('/');
        }
      ).catch((err)=>{
          alert('failed to add location!!');
      }) 
  }


  return (
    <div className='NewLocationPage GenPagePadding'>
      <h2>Add new local monument</h2>
      <div className="new_location_container">
        <span>
            <FloatingLabel className="mb-3 form_input" controlId="floatingPassword" label="Monument's title">
              <Form.Control type="text" placeholder="Password" onChange={(e)=> setTitle(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel className="mb-3 form_input" controlId="floatingPassword" label="Banner image">
              <Form.Control type="text" placeholder="Password" onChange={(e)=> setBannerImg(e.target.value)} />
            </FloatingLabel>

        </span>

        <FloatingLabel className="mb-3 form_input" controlId="floatingTextarea2" label="Describe the monument">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ minHeight: '100px' }}
            onChange={(e)=> setDescription(e.target.value)}
          />
        </FloatingLabel>

        <span>

          <Form.Select className="mb-3 form_select" aria-label="Default select example" onChange={(e)=> setCity(e.target.value)} >
            <option value='' >Choose the city</option>
            {citiesList.map((city, index)=> 
               <option key={index} value={city.name}>{city.name}</option>
            )}
            <option value="other">Other city</option>
          </Form.Select>
          <FloatingLabel className="mb-3 form_input" controlId="floatingPassword" label="Monument's address">
            <Form.Control type="text" placeholder="Password" onChange={(e)=> setAddress(e.target.value)} />
          </FloatingLabel>

        </span>

      {city === 'other' &&
        <span className='span_3_7' >

          <FloatingLabel className="mb-3 form_input" controlId="floatingPassword" label="City name">
            <Form.Control type="text" placeholder="Password" onChange={(e)=> setNewCity(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel className="mb-3 form_input" controlId="floatingPassword" label="City's banner Image">
            <Form.Control type="text" placeholder="Password" onChange={(e)=> setCityBannerImg(e.target.value)} />
          </FloatingLabel>

        </span>

      }

        <FloatingLabel className="mb-3 form_input" controlId="floatingTextarea2" label="Things one should must know about this location!!">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ minHeight: '100px' }}
            onChange={(e)=> setOtherThings(e.target.value)}
          />
        </FloatingLabel>

        <Button className='form_button' variant="primary" onClick={handleSubmit} >Upload details</Button>

      </div>
      
    </div>
  )
}

export default NewLocation