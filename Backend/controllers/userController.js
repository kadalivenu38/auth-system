import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateOtp, otpSending } from '../utils/otpServices.js';

const Register = async (req, res)=>{
    const {name, email, password} = req.body;
    try{
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(409).json({message: "Email already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "User Registered Successfully"});
    }catch(err){
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
}

const Login = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)) ){
            return res.status(401).json({message: "Invalid email or password!"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const username = user.name;

        return res.status(200).json({message: "User Login Successfully.", token, username})
    }catch(err){
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
}

const forgotPassword = async (req, res)=>{
    const email = req.body.email;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "No user registerd with this Email!"});
        }
        const Otp = generateOtp();
        user.otp = Otp;
        user.otpExpires = Date.now() + 3*60*1000;
        await user.save();
        await otpSending(email, Otp);
        return res.status(200).json({message: "Otp Sent to given Email Id."});
    }catch(err){
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
}

const verifyOtp = async (req, res)=>{
    const {email, otp} = req.body;
    try{
        const user = await User.findOne({email});
        if(otp!==user.otp || Date.now() > user.otpExpires){
            return res.status(404).json({message: "Invalid OTP!"});
        }
        return res.status(200).json({message: "OTP verified successfully."});
    } catch(err) {
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
}

const resetPassword = async (req, res)=>{
    const {email, newPassword, confirmPassword} = req.body;
    try{
        if(newPassword!==confirmPassword){
            return res.status(401).json({message: "New Password and Confirm Password not Matched!."});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(409).json({message: "No user found, with this Email."});
        }
        if(await bcrypt.compare(confirmPassword, user.password)){
            return res.status(409).json({message: "This password was already used!"});
        }
        user.password = await bcrypt.hash(confirmPassword, 10);
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        res.status(200).json({message: "Password reset was successfull."});
    } catch(err) {
        res.status(500).json({error: "Internal Server Error!"})
        console.error(err);
    }
}

export { Register, Login, forgotPassword, verifyOtp, resetPassword};