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

//get issues assigned to a developer
const getDeveloperIssues = async(req,res)=>{
    try{
        const userId = req.query.userId;
        const issues = await Issue.find({assignedTo:userId});
        res.json({issues});
    }catch(error){
        res.status(500).json({success:false,message:error?.message});
    }
}

//Get issues that are created by particular user
const getUserIssues = async(req,res) => {
    try{
        const userId = req.query.userId;
        if(!userId){
            res.status(500).json({success:false,message:"UserID is required"});
        }
        const issues = await Issue.find({createdBy:userId});
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


/* 
    ========================================
                PUT API's
    ========================================
*/

export const updateIssue = async(req,res) => {
    try{
        const {_id,...rest} = req.body;
        // console.log(req.body);
        const data = await Issue.updateOne({_id:_id},rest);
        if(data){
            res.status(200).json({success:true,data,message:"updated successfully"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error?.message || "Error while updating issue"});
    }
}

export {getAllIssues,createIssue,deleteIssue,getDeveloperIssues,getUserIssues};