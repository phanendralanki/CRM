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
import UserRoute from "./components/UserRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./components/adminDashboard/Admin";
import DeveloperDashboard from "./components/developerDashboard/DeveloperDashboard";
import UserDashboard from "./components/userDashboard/UserDashboard";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/ResetPassword";
import DeveloperRoute from "./components/DeveloperRoute";
import {useSelector } from "react-redux";
import Footer from "./components/Footer";
const App = () => {
  const {currentUser} = useSelector((state) => state.user);

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
          <Route element={<DeveloperRoute />}>
              <Route path="/developer" element={<DeveloperDashboard user={currentUser} />} />
          </Route>
          <Route element={<UserRoute />}>
              <Route path="/user" element={<UserDashboard user={currentUser} />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
