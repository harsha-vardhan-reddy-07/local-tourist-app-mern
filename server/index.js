import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { City, Contribution, Monument, User } from './schema.js';


const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/SBLocal').then(()=>{


    app.post('/register', async (req, res) => {
        const { username, email, usertype, password, domain, qualification } = req.body;
        try {
          
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username, email, usertype, password: hashedPassword, domain, qualification
            });           

            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);

        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });



    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else{
                return res.json(user);
            }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });




    app.post('/add-location', async (req, res) => {
        try {
          const {title, bannerImg, description, city, newCity, cityBannerImg, address, otherThings, contributor,  contributorId} = req.body;

          if (city === "other"){

            const newCityData = {
              name: newCity,
              bannerImg: cityBannerImg
            }

            const new_City = new City(newCityData);
            await new_City.save();

            const newLocation = new Monument({
                title, bannerImg, description, city: newCity, address, otherThings, contributor, contributorId
            });
            const neww_loc = await newLocation.save();

            const new_contribution = new Contribution({
                monumentId: neww_loc._id,
                contributor, contributorId, title, city: newCity, address, contribution: "Location Added", date: new Date().toISOString()
            });
            await new_contribution.save();
            


          }else{

            const newLocation = new Monument({
                title, bannerImg, description, city, address, otherThings, contributor, contributorId
            });
            const neww_loc = await newLocation.save();

            const new_contribution = new Contribution({
                monumentId: neww_loc._id,
                contributor, contributorId, title, city: newCity, address, contribution: "Location Added", date: new Date().toISOString()
            });
            await new_contribution.save();

          }
      
          res.json({ message: 'new monument added successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error uploading file or saving data' });
        }
      });
      
      app.get('/fetch-cities', async(req, res)=>{
        try{
            const cities = await City.find();
            res.json(cities);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
      })

      app.get('/fetch-monuments', async(req, res)=>{
        try{
            const monuments = await Monument.find();
            res.json(monuments);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
      })

      app.get('/fetch-monument/:id', async(req, res)=>{

        try{
            const monument = await Monument.findById(req.params.id);
            res.json(monument);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    })

    app.post('/upload-monument-img/:id', async(req, res)=>{
      
        try{
            const {newImg, contributor, contributorId} = req.body;
            const monument = await Monument.findById(req.params.id);
            if(monument){
                monument.images.push(newImg);
                await monument.save();

                const new_contribution = new Contribution({
                    monumentId: req.params.id,
                    contributor, contributorId, title: monument.title, city: monument.city, address: monument.address, contribution: "Image Added", date: new Date().toISOString()
                });
                await new_contribution.save();

                res.json(monument);
            }else{
                res.status(404).json({ message: 'Monument not found' });
            }
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    })


    app.get('/fetch-contributions', async(req, res)=>{
      try{
          const contributions = await Contribution.find();
          res.json(contributions);
      }catch(error){
          console.log(error);
          res.status(500).json({ message: 'Server Error' });
      }
    })


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((err)=>{
    console.log(err);
})


