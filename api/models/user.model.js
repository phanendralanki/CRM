import mongoose from "mongoose";
import crypto from "crypto";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, //To enable searching- optimized way
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
    },
    password: {
      type: String,
      required:true,
    },
    role: {
      type: String,
      enum: ["admin", "user","developer"], //Enums in JavaScript are used to represent a fixed set of named values.
      default: "user",
    },
    profilePicture:{
      type:String,
      default:"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
    },
    resetPasswordToken:{
      type:String,
    },
    resetPasswordExpire:{
      type:String,
    }
  },
  { timestamps: true }
);

userSchema.methods.getResetToken = function(){
   //use crypto - default in nodejs
   const resetToken = crypto.randomBytes(20).toString("hex");
   //algorithm to hash Password
   this.resetPasswordToken = crypto 
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");
   //setting expire
   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15 minutes
   return resetToken;
};

//password hashing before saving it into the db
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password,10);
  next();
});

//password decoding - useful during login
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password,this.password); //true or false
}

const User = mongoose.model("User", userSchema);
export default User;