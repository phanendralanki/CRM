import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error,setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    // username validation
    if (!username.trim()) {
      validationErrors.username = "username is required";
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      validationErrors.username = "username should only contain alphabets";
    }

    if (!email.trim()) {
      validationErrors.email = "email is required";
    }else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      validationErrors.email = "Email is not valid";
    }

    //mobile number validation
    if (!mobileNumber.trim()) {
      validationErrors.mobileNumber = "mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      validationErrors.mobileNumber = "Invalid mobile number";
    }

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

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "confirm password is required";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword =
        "password and confirm password should match";
    }

    setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0){
      try {
        setLoading(true);
        setError("");
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,email,mobileNumber,password}),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
          return;
        }
        navigate('/signin');
      } catch (error) {
        setLoading(false);
        setError("something went wrong");
      }
    }
  };

  const navigate = useNavigate();

  /*
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data.message);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError("something went wrong");
    }
  };
  */

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="username"
          id="username"
          value={username}
          name="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.username}</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.email}</span>
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          type="text"
          placeholder="mobile Number"
          id="mobileNumber"
          name="mobileNumber"
          value={mobileNumber}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.mobileNumber}</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          value={password}
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.password}</span>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="confirm password"
          id="cpassword"
          name="confirmPassword"
          value={confirmPassword}
          className="bg-slate-100 p-3 rounded-lg"
        />
        <span className="error-message">{errors.confirmPassword}</span>
        <button
          disabled={loading}
          className="bg-slate-700
          text-white p-3 rounded-lg 
          uppercase hover:opacity-90 
          disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sign Up"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p>
    </div>
  );
};

export default Signup;
