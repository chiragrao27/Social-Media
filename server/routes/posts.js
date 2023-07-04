import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();


//Getting All the Post
router.get('/', getFeedPosts);

//Getting Users Post using userID
router.get('/:userId/posts',verifyToken , getUserPosts);

//Liking Post using Post ID
router.patch('/:id/like/', verifyToken, likePost);

export default router;