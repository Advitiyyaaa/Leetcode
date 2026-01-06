const mongoose = require('mongoose')
const {Schema} = mongoose;

const videoSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required: true,  
    },
    cloudinaryPublicId:{
        type: String,
        required: true,
        unique: true
    },
    secureUrl:{
        type: String,
        required: true,
    },
    thumbnailUrl:{
        type: String,
    },
    duration:{
        type: Number,
        required:true
    },
},{timestamps:true})


const Video = mongoose.model("video",videoSchema)
module.exports = Video;