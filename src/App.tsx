import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import Test from "./testing/test.tsx";
import Home from "./home/Home.tsx";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
