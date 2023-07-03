import User from "../models/User.js";

//Getting users info using userID
export const getUser = async (req, res) => {

    try {

        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

//Getting users friends from the friends array 
export const getUserFriends = async (req, res) => {
    try {

        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        //mapping friends
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);
 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


//Add & Remove friends 
export const addRemoveFriend = async (req, res) => {
    
    try {

        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        //If frined already present removing it from the array of the both friends
        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }  
        //Else adding both in the array 
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
