import { Link } from "react-router-dom";
import "./siteNavBar.css";

export default function SiteNavbar() {
    return (
   <>
    <header id="siteHeader">
        <div className="container">
            <nav className="nav">
                <a className="brand" href="#">
                    <span>Le Bon Mot</span>
                </a>

                <nav className="nav-links" aria-label="Navigation principale">
                    <a href="#formations">Formations</a>
                    <a href="#entreprises">Entreprises</a>
                    <a href="#prix">Prix</a>
                    <Link to="/dashboard/users">Dashboard</Link>
                    <a href="#recherche">🔎</a>
                </nav>

                <div className="nav-actions">
                    <Link to="/login">Connexion</Link>
                    <a className="btn-primary" href="#start">Commencer</a>

                    <button className="burger" id="burgerBtn" aria-label="Ouvrir le menu">
                        <span></span>
                    </button>
                </div>
            </nav>

            <div className="mobile-menu" id="mobileMenu">
                <a href="#formations">Formations</a>
                <a href="#entreprises">Entreprises</a>
                <a href="#prix">Prix</a>
                <a href="#enseigner">Enseigner</a>
                <a href="#recherche">Recherche</a>
            </div>
        </div>
    </header>
        </>

    );
}
