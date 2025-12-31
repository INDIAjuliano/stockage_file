// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/authService";
import './Login.css';

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // await loginUser(formData);
            // ✅ après login → dashboard
            navigate("/dashboard/users");
        } catch (err) {
            setError(err.message || "Erreur de connexion");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            

            <div className="g-wrap">
                <div className="g-card">
                    <div className="g-logo" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray="28"
                                strokeDashoffset="28"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            >
                                <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0" />
                                </path>
                                <path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="28;0" />
                                </path>
                            </g>
                        </svg>
                    </div>

                    <h1 className="g-title">Connexion</h1>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <p className="g-subtitle">Accédez à votre espace d’apprentissage</p>

                    <form onSubmit={handleSubmit} className="g-form" autoComplete="on">
                        <div className="g-field">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="email">Adresse e-mail</label>
                        </div>

                        <div className="g-field">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder=" "
                            />
                            <label htmlFor="password">Mot de passe</label>
                        </div>

                        <div className="g-row">
                            <label className="g-check">
                                <input type="checkbox" name="remember" />
                                <span>Rester connecté</span>
                            </label>

                            <a className="g-link" href="/forgot">Mot de passe oublié ?</a>
                        </div>

                        <div className="g-actions">
                            <a className="g-link" href="/register">Créer un compte</a>

                            <button disabled={loading} className="g-btn" type="submit">
                                {loading ? "Connexion..." : "Se connecter"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
}
