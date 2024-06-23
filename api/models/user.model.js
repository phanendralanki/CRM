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
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user","developer"], //Enums in JavaScript are used to represent a fixed set of named values.
      default: "user",
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