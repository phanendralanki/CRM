import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

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


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="mobile Number"
          id="mobileNumber"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="confirm password"
          id="cpassword"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700
          text-white p-3 rounded-lg 
          uppercase hover:opacity-90 
          disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sign Up"}
        </button>
        <OAuth />
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
