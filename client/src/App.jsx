import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./components/adminDashboard/Admin";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";

import {useSelector } from "react-redux";

const App = () => {
  const {currentUser} = useSelector((state) => state.user);
  // console.log(currentUser);

  




  return (
    <>
      <BrowserRouter>
        {/* Header */}
        <Header user = {currentUser} />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signin" element={<Signin />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin user={currentUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
