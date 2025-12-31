// src/components/shared/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav
            style={{
                padding: 12,
                display: "flex",
                gap: 16,
                borderBottom: "1px solid #ddd",
                alignItems: "center"
            }}
        >
            <Link to="/" style={{ textDecoration: "none" }}>
                Accueil
            </Link>

            <Link to="/posts" style={{ textDecoration: "none" }}>
                Posts
            </Link>

            {/* 🔥 NOUVEAU */}
            <Link
                to="/dashboard"
                style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#2563eb"
                }}
            >
                Dashboard
            </Link>
        </nav>
    );
}
