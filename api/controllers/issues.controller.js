import {Issue} from "../models/issue.model.js";
import User from "../models/user.model.js";
/* 
    ========================================
                GET API's
    ========================================
*/

//get All issues for admin
const getAllIssues = async(req,res,next)=>{
    try{
        const issues = await Issue.find({});
        return res.json({issues});
    }catch(error){
        res.status(500).json({success:false,message:error?.message});
    }
}

/* 
    ========================================
                POST API's
    ========================================
*/
//create an issue
const createIssue = async(req,res)=>{
    try{
        const userId = req.query.userId;
        const {title,customerName,description,email,mobileNumber,issueType,status,assignedTo} = req.body;
        const issue = new Issue({title,customerName,description,email,mobileNumber,issueType,status,assignedTo,createdBy:userId});
        await issue.save();
        return res.send({success:true,message:"issue created"});

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};


/* 
    ========================================
                DELETE API's
    ========================================
*/
//delete issue
const deleteIssue = async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedIssue = await Issue.deleteOne({_id:id});
        if(deletedIssue){
            res.status(200)
            .json({
                success:true,
                deletedIssue,
                message:"Issue deleted successfully",
            });
        }else{
            res.status(404).json({message:"Issue not found"});
        }

    }catch(error){
        return res.status(500).json({success:false,message:error?.message});
    }
};


export {getAllIssues,createIssue,deleteIssue};