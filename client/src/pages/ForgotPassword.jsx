import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      validationErrors.email = "Email is not valid";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/auth/forgotPassword",
          formData
        );
        toast.success(response.data.message);

        //clearing the input field
        setFormData({email:""});
        
        //Navigating to reset password page after a short delay
        setTimeout(()=>{
          navigate("/");
        },1500); 

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      <style>
        {`
          h3 {
            text-align: center;
            font-family: seogui;
          }
        `}
      </style>
      <div className="p-3 max-w-lg mx-auto">
       
          
            <h1 className="text-3xl text-center font-bold my-7">Forgot Password</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  placeholder="Enter your Email"
                  type="text"
                  className="bg-slate-100 p-3 rounded-lg"
                  name="email"
                  id="exampleInput"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <span className="error-message">{errors.email}</span>
            
              
                <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg 
                uppercase hover:opacity-90 disabled:opacity-80">
                  {loading? "Loading.....": "Send Reset Link"}
                </button>
             
            </form>
         
        
      </div>
    </>
  );
};

export default ForgotPassword;
