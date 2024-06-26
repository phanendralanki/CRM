import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    customerName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    issueType:{
        type:String,
        enum:['urgent_request','minor_issue','normal','major_issue'],
        default:'normal'
    },
    status:{
        type:String,
        enum:['open','in_progress','resolved','closed'],
        default:'open'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null,
    },

},{
    timestamps:true,
});

export const Issue = mongoose.model('Issue',issueSchema);  