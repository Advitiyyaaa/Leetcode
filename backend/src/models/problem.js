const mongoose = require('mongoose')
const {Schema} = mongoose;

const problemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    difficulty:{
        type:String,
        enum: ['easy','medium','hard'],
        required:true
    },
    tags:[
        {
            type:String,
            enum: ['Array','LinkedList','String','Graph','DP'],
            required:true
        }
    ],
    visibleCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],
    hiddenCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type:String,
                enum:['javascript','cpp','java','python'],
                required:true
            },
            completedCode:{
                type:String,
                required:true
            }
        }
    ],
    starterCode:[
        {
            language:{
                type:String,
                enum:['javascript','cpp','java','python'],
                required:true
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type: Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
},{ timestamps: true });

const Problem = mongoose.model('problem',problemSchema)
module.exports = Problem;