import React, { useEffect } from 'react'
import '../styles/Location.css'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Meenakshi from '../images/meenakshiTemple.avif'
import Ellora from '../images/elloraCaves.avif'
import RajaSeat from '../images/rajaSeat.avif'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Location = () => {

  const {id} = useParams();

  const [monument, setMonument] = React.useState();

  useEffect(() => {
              
      fetchMonument();
  
    }, []);

  const fetchMonument = async () => {
    try {
      await axios.get(`http://localhost:6001/fetch-monument/${id}`).then(
        (res)=>{
            console.log(res.data);
            setMonument(res.data);
        }
      )

    } catch (error) {
      console.error(error);
    }
  }

  const [isUploadImg, setIsUploadImg] = React.useState(false);

  const [newImg, setNewImg] = React.useState('');

  const uploadNewImg = async () => {
    try {
      await axios.post(`http://localhost:6001/upload-monument-img/${id}`, {newImg, contributor: localStorage.getItem('username'), contributorId: localStorage.getItem('userId')}).then(
        (res)=>{
            alert("Image uploaded successfully")
            setMonument(res.data);
            setIsUploadImg(false);
            setNewImg('');
        }
      )

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    {monument?
        <div  className='LocationPage GenPagePadding'>
          <h3>{monument.title}</h3>
          <img className='location_banner_img' src={monument.bannerImg} alt="" />
          <p className='location_description'>{monument.description}</p>
          <div className='address_span_2' >
              <span>
                <b>City</b>
                <p>{monument.city}</p>
              </span>
              <span>
                <b>Address</b>
                <p>{monument.address}</p>
              </span>
          </div>
          <span>
            <b>Things you should know!!</b>
            <p>{monument.otherThings}</p>
          </span>
          <span>
            <b>Main Contributor</b>
            <p>{monument.contributor}</p>
          </span>
          <h4>More images of this monuments...</h4>
          {localStorage.getItem("userId") && isUploadImg ?
              <div className="add_new_image_container">
                <FloatingLabel className='new_img_input mb-3' controlId="floatingPassword" label="Image url">
                  <Form.Control type="text" placeholder="Password" onChange={(e)=> setNewImg(e.target.value)} />
                </FloatingLabel>
                <span>
                  <Button variant="success" onClick={uploadNewImg} >Upload</Button>
                  <Button variant="danger"  onClick={()=> setIsUploadImg(false)} >Cancel</Button>
                </span>
              </div>
          
          :
          <Button variant="primary" onClick={()=> setIsUploadImg(true)} >Add new image</Button>
          
          }
          {monument.images.length > 0 ?
            
            <div className="location_more_images">
                {monument.images.map((img, index) => {
                  return <img key={index} src={img} alt="" />
                })}
            </div>
          
          :
          
          <p>No images available</p>}
        </div>
    
    :
    "Loading..."}
    </>
  )
}

export default Location