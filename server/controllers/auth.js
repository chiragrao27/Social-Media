import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register user */

export const register = async (req, res) => {
    
    //Register form
    try {
        
        const { 
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        //Creating a salt for the hashing function
        const salt = await bcrypt.genSalt();

        //hashing password using salt.
        const passwordhash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordhash,
            picturePath,
            friends,
            location,
            occupation,

            //Giving random values.
            viewedProfile: Math.floor(Math.random() *10000),
            impressions: Math.floor(Math.random() *10000)
        });

        //Saving the new User in the database.
        const savedUser = await newUser.save();

        res.status(201).send(savedUser);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
}


// Logging In //
export const login = async (req, res) => {

    
    try {
        //Getting email and password from body
        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        //If user is not found
        if (!user) {
            return res.status(400).json({msg: "User does not exist."});
        }

        //Checking the password from the database hash.
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send({error: "Invalid password"});
        }

        //Creating a token for the user.
        let token =  jwt.sign({id: user._id}, process.env.JWT_SECRET);
        
        //Setting the Header ==> Authorization as (Bearer token).
        res.setHeader('Authorization', `Bearer ${token}`);

        //deleting the user entered credentials from the local storage for security reasons.
        delete user.password;
        res.status(200).send({token, user});
        
    } catch (error) {
       res.status(404).send({error: error.message}); 
    }
}