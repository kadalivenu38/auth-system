import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from './models/User.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

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
    const {name, email, password} = req.body;
    try{
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(400).json({message: "Email already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
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
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)) ){
            return res.status(400).json({message: "Invalid email or password!"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const username = user.name;

        res.status(200).json({message: "User Login Successfully.", token, username})
    }catch(err){
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT: ${process.env.PORT}`);
})