const mongoose = require('mongoose')
const {Schema} = mongoose;

const submissionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    problemId:{
        type: Schema.Types.ObjectId,
        ref: 'problems',
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['cpp','java','javascript']
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'wrong', 'error'],
        default:'pending'
    },
    runTime:{
        type:Number,
        default:0

    },
    memory:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default: ''
    },
    testCasesPassed:{
        type:Number,
        default:0
    },
    testCasesTotal:{
        type:Number,
        default:0
    }

},{timestamps:true})

submissionSchema.index({userId:1 , problemId:1})

const Submission = mongoose.model('submission',submissionSchema)
module.exports = Submission;