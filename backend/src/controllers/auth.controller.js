import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All Fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save(); 
    generateToken(newUser._id, res); 

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try{
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });}
catch(error){
  console.log('Logout error:', error.message);
}
};
export const updateProfile=async(req, res) => {
  try{
    const {profilePic}= req.body;
    const userId=req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }catch(error){
      console.error('Update profile error:', error.message);
          res.status(500).json({ message: 'Internal server error' });

    }
};
export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);
  }
  catch(error){
    console.error('Check auth error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
 }