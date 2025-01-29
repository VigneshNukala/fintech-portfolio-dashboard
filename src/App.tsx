import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/dashboard";
import Markets from "./components/Markets/markets";
import Settings from "./components/Settings/settings";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";

function App() {

  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
