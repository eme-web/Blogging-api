import { model, Schema} from "mongoose";

const BlogPostSchema = new Schema({
    title:{type: String},
    content:{type: String},
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },   
},
{timestamps: true }
);

export default model('BlogPost', BlogPostSchema)