const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    emailId:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        immutable: true,
        unique: true
    },
    age:{
        type: Number,
        min: 6,
        max: 80
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem',
        }],
        default:[]
    },
    photo:{
        type: String,
        default: "This is the default photo"
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

userSchema.post('findOneAndDelete',async function(userInfo){
    if(userInfo){
        await mongoose.model('submission').deleteMany({userId: userInfo._id})
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User;