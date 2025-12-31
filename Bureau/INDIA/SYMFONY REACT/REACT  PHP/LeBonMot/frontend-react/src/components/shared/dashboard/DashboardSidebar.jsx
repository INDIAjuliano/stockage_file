import { NavLink } from "react-router-dom";
// import "../../../styles/dashboard.css";

const linkStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  background: isActive ? "rgba(37,99,235,.12)" : "transparent",
  color: isActive ? "#2563eb" : "#0f172a",
  fontWeight: 700,
});

export default function DashboardSidebar() {
  return (
    <>
      <aside className="sidebar" id="sidebar" data-collapsed="false">
      <div className="side-title">Gestion</div>
        <div className="menu">
          <NavLink to="/dashboard/users" style={linkStyle}>
            <span>Users</span>
            <span className="pill" id="pillCount">0</span>
          </NavLink>

          <NavLink to="/dashboard/roles" style={linkStyle}>
            <span>Roles</span>
            <span className="pill">3</span>
          </NavLink>
          <a href="#logs">Logs <span className="pill">OK</span></a>
      </div>

      <div className="side-title">Paramètres</div>
      <div className="menu">
          <a href="#security">Sécurité <span className="pill">⚙️</span></a>
          <a href="#profile">Profil <span className="pill">👤</span></a>
      </div>
  </aside>
    </>
  );
}
