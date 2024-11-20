import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./navbar/Navbar.tsx";
import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import Test from "./testing/test.tsx";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const loc = useLocation();

  return (
    <>
      {loc.pathname !== "/login" && loc.pathname !== "/signup" ? <Navbar /> : ""}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
