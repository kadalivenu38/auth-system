import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConn from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Registering middlewares
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// db Connection
await dbConn();

// routes
// app.get('/', (req, res)=>{
//     res.status(200).json({message: "Welcome to Auth-System Home Page."})
// })
app.use('/user', userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on PORT: ${process.env.PORT}`);
})