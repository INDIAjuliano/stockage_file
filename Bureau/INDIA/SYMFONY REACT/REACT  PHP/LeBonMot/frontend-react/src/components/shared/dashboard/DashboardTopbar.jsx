// import "../";
import { Link } from "react-router-dom";

export default function DashboardTopbar() {
  return (
    <header >
      <div className="container">
        <nav className="nav">
          <Link to="/" className="brand">
            <span>MonApp</span>
          </Link>


          <div className="nav-right">
            <div className="search" role="search">
              <span style={{opacity:".65"}}><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path stroke-dasharray="40" stroke-dashoffset="40"
                    d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0" />
                  </path>
                  <path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5">
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                  </path>
                </g>
              </svg>
              </span>
              <input id="q" type="text" placeholder="Rechercher un utilisateur..." />
              <span className="kbd">Ctrl K</span>
            </div>

            <button className="burger" id="toggleSidebarBtn" title="Menu">
              <span></span>
            </button>

            <button className="btn btn-ghost" id="exportBtn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
              viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21l18 0">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                </path>
                <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3l0 13.5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="16;0" />
                </path>
                <path stroke-dasharray="12" stroke-dashoffset="12" d="M12 17l7 -7M12 17l-7 -7">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                </path>
              </g>
            </svg> Export</button>
            <button className="btn btn-primary" id="addBtn">+ Ajouter</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
