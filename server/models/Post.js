import mongoose, {Schema} from 'mongoose';

const postSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        location: String,
        description : String,
        picturePath : String,
        userPicturePath : String,
        
        //An like object with type of map and boolean properties.
        likes : {
            type : Map,
            of : Boolean,
        },

        //Comments array 
        comments : {
            type : Array,
            default :[]
        },

    },
    { timestamps: true }

);

const Post = mongoose.model('Post', postSchema);

export default Post;