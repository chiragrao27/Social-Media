import jwt from "jsonwebtoken";

// Creating Token for the user Logged in.

export const verifyToken = async (req, res, next) => {

    try {

        //Getting the token from the header.
        let token = req.header("Authorization");
        
        //If token is not there in header.
        if(!token) {
            return res.status(403).send("Access Denied");
        }

        //All the token in the authorization header has to start with Word "Bearer". 
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        
        //Verifying the token using JWT verify function 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};