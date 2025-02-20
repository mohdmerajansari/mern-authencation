import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const user = req.body;

  if(!user.name || !user.email || !user.password){
    res.status(400).json({success: false, message: "Please provide all the fields"})
  }

  const userEmail = await User.findOne({ email: user.email })

  if(userEmail) {
    res.status(409).json({success:false, message:"User already exist!"})
  }

  user.password = await bcrypt.hash(user.password, 10);

  const newUser = User(user);

  try {
  await newUser.save();
  res.status(200).json({success: true, data: newUser})
  } catch (error) {
  res.status(500).json({success: false, message: "Server side server"})
  }
}

export const logIn = async (req, res) => {
  const user = req.body;
  const errMessage = "Authenticaiton failed! Email or password is wrong!"
  if(!user.email || !user.password){
    res.status(400).json({success: false, message: "Please provide all the fields"})
  }

  const userDetail = await User.findOne({ email: user.email })

  if(!userDetail) {
    res.status(403).json({success:false, message:errMessage})
  }

  const isPassEqual = await bcrypt.compare(user.password, userDetail.password)
  if(!isPassEqual){
    res.status(403).json({success:false, message:errMessage})
  }
   const jwtToken = jwt.sign({ email: userDetail.email, id: userDetail._id }, process.env.JWT_SECRET,{expiresIn:'24h'})
 

  try {
 
  res.status(200).json({success: true, message:"Login successful", jwtToken, Email : user.email, Name : userDetail.name })
  } catch (error) {
  res.status(500).json({success: false, message: "Server side server"})
  }
}