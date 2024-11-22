import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login.tsx";
import Signup from "./auth/Signup.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import Test from "./testing/test.tsx";
import Home from "./home/Home.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}
export default App;