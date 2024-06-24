import mongoose from "mongoose";


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


const User = mongoose.model("User", userSchema);
export default User;