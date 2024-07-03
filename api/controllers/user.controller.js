import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req,res)=>{
    res.json({
        message:'API is working'
    })
}

//update user profile
export const updateProfile = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        // return res.status(401).json("you can update only your account");
        return next(errorHandler(401,'you can update only your account details!'));
    }

    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },
            {new:true}
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }

}

export const getUserNameAndId = async(req,res) => {
    try{
        const users = await User.find({},"username _id role"); //fetching only username,id and role
        res.status(200).json({
            success:true,
            users,
            msg:"Fetched all the users in the DB",
        });
    }catch(error){
        res.status(500).json({message:"Error while fetching all users",error});
    }
}