{/* For Frontend */}
// import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";

{/* For Backend */}
import {  useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import Test from "./testing/test.tsx";
import Home from "./home/Home.tsx";

import { useUser } from "./userContext"; 
import { UserProvider } from "./userContext.tsx";

export default function AppWithRouter() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
}


const App = () => {


  {/* For Backend */}
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const authRoutes = ["/login", "/signup"];
  const isAuthPage = authRoutes.includes(location.pathname);
  const dashboard = [ "/dashboard", "/" ]
  const isDashboard = dashboard.includes(location.pathname);

  useEffect(() => {
    if (!loading) {
      if (user && isAuthPage || isDashboard) {
        navigate("/");
      } else if (!user && !isAuthPage) {
        navigate("/login");
      }
    }
  }, [user, loading, navigate, location.pathname, isAuthPage]);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      
      {/* For Frontend */}
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/test" element={ <Test />} />
        <Route path="/" element={<Dashboard /> } />
      </Routes> */}

      {/* For Backend */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={user ? <Test /> : <Login />} />
        <Route path="/" element={<Dashboard /> } />
      </Routes>
    </div>
  );
};