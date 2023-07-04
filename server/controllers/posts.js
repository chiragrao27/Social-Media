import Post from "../models/Post.js";
import User from "../models/User.js";


//Create post 
export const createPost = async (req, res) => {

    try {

        //Getting the userId, description and picturePath from client.
        const {userId, description , picturePath} = req.body;
        const user = await User.findById(userId);

        //Creating new post 
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes :{},
            comments :[]
        });

        //Saving the post
        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

//Reading All the Post in the database
export const getFeedPosts = async (req, res) => {
    try {
            //Getting all the posts in the database
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
}

//Getting users posts 
export const getUserPosts = async (req, res) => {

    try {
        const {userId} = req.params;
        const post = await Post.find({ userId});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}


//Like and Dislike endpoint
export const likePost = async (req, res) => {

    try {
        //Getting the postId from the params and userId from body.
        const postId = req.params.id;
        const {userId} = req.body;

        //Getting post from the postId and then getting likes object from the post.
        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        console.log(postId);
        console.log(userId);
        
       //Checking if user has already liked the post if yes then delete the userId from the Object
       //Else Adding the new userId to the object
        if(isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }

        //Updating the post afte the alteration of the like Object.
        const updatedPost = await Post.findByIdAndUpdate (
            postId,
            { likes : post.likes},
            { new : true}
        );

        res.status(200).json(updatedPost);
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}