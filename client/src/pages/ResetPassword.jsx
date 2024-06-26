import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    //password validation
    if (!password.trim()) {
      validationErrors.password = "password is required";
    } else if (password.length < 8) {
      validationErrors.password = "password should be atleast 8 characters";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(
        password
      )
    ) {
      validationErrors.password =
        "password must contain one special symbol,number and capital letter";
    }

    //confirm password validation
    if (!cpassword.trim()) {
      validationErrors.cpassword = "confirm password is required";
    } else if (cpassword !== password) {
      validationErrors.cpassword = "password and confirm password should match";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // sending to backend
      try {
        setLoading(true);
        const response = await axios.put(
          `/api/auth/resetPassword/${token}`,
          { password }
        );
        toast.success(response.data.message);
        navigate("/signin");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-bold my-7">Reset Password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         
            <input
              placeholder="Enter your password"
              type="password"
              className="bg-slate-100 p-3 rounded-lg"
              name="password"
              id="exampleInput"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="error-message">{errors.password}</span>
         
          
            <input
              placeholder="Confirm Password"
              type="password"
              className="bg-slate-100 p-3 rounded-lg"
              name="cpassword"
              id="exampleInput"
              autoComplete="off"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <span className="error-message">{errors.cpassword}</span>
          
          
            <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
             {loading? "Loading....": "Reset Password"}
            </button>
       
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
