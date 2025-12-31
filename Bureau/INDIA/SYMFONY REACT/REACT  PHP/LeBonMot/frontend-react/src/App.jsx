import { Routes, Route } from "react-router-dom";

import SiteLayout from "./components/layouts/SiteLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Users from "./pages/dashboard/Users";
import Roles from "./pages/dashboard/Roles";

export default function App() {
  return (
    <Routes>
      {/* 🌍 SITE PUBLIC */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* 🔐 DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
      </Route>

      <Route path="*" element={<h1 style={{ padding: 16 }}>404</h1>} />
    </Routes>
  );
}
