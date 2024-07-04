import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import OAuth from "../components/OAuth";
import "../App.css";

const Signin = () => {
  

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errors,setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if(!email.trim()){
      validationErrors.email = "email is required";
    }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      validationErrors.email = "email is not valid";
    }

    if(!password.trim()){
      validationErrors.password = "password is required";
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      //sending data to backend
      try {
        dispatch(signInStart());
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,password})
        });
        const data = await response.json();
        if (data.success === false) {
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        dispatch(signInFailure(error));
      }
    }

  }

  


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="error-message">{errors.email}</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          name="password"
          value={password}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.password}</span>

        <button
          disabled={loading}
          className="bg-slate-700
          text-white p-3 rounded-lg 
          uppercase hover:opacity-90 
          disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sign In"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <div className="flex gap-2 mt-3">
        <p>forgot password?</p>
        <Link to="/forgotPassword">
          <span className="text-blue-500">forgot password</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error? error.message || "Something went wrong" : ""}
      </p>
    </div>
  );
};

export default Signin;
