import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
<<<<<<< HEAD
=======
const PORT = 4000;
>>>>>>> cb19cae2b98bcd1fc84cadea8cb568bc955cfb1e

// db connnection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected Succesfully...");
})
.catch((err)=>{
    console.log(err);
})

// Registering middlewares
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.get('/', (req, res)=>{
    res.status(200).json({message: "Welcome to Auth-System Home Page."})
})
app.post('/register', async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(400).json({message: "Email already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User Registered Successfully"});
        console.log("User Registered");
    }catch(err){
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT: ${process.env.PORT}`);
})