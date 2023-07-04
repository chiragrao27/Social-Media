import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Getting User using userId.
router.get("/:id", getUser);

//Getting friends Array using userId.
router.get("/:id/friends",verifyToken, getUserFriends);

//Updating friends Array using userId.
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;