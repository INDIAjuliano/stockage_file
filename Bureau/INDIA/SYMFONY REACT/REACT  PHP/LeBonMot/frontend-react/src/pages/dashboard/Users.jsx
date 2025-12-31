export default function Users() {
    return (
        <div >
            <div className="top-row">
                <div>
                    <h1 className="title">Dashboard Utilisateurs</h1>
                    <p className="subtitle">Filtre, recherche, ajout/modification, suppression et vue responsive.</p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="btn btn-ghost" id="refreshBtn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path stroke-dasharray="32" stroke-dashoffset="32"
                                d="M12 6c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6v-2.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0" />
                            </path>
                            <path stroke-dasharray="6" stroke-dashoffset="6" d="M6 9l-3 3M6 9l3 3">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="6;0" />
                            </path>
                        </g>
                    </svg> Actualiser</button>
                    <button className="btn btn-primary" id="addBtn2">+ Nouvel utilisateur</button>
                </div>
            </div>

            {/* <!-- STATS --> */}
            <section className="stats" id="users">
                <article className="card stat">
                    <div className="stat-head">
                        <div className="stat-label">Total utilisateurs</div>
                        <div className="badge" id="bTotal">—</div>
                    </div>
                    <div className="value" id="sTotal">0</div>
                    <div className="foot"><span className="dot good"></span> Base active</div>
                </article>

                <article className="card stat">
                    <div className="stat-head">
                        <div className="stat-label">Actifs</div>
                        <div className="badge" id="bActive">—</div>
                    </div>
                    <div className="value" id="sActive">0</div>
                    <div className="foot"><span className="dot good"></span> Connectés récemment</div>
                </article>

                <article className="card stat">
                    <div className="stat-head">
                        <div className="stat-label">En attente</div>
                        <div className="badge" id="bPending">—</div>
                    </div>
                    <div className="value" id="sPending">0</div>
                    <div className="foot"><span className="dot warn"></span> Validation requise</div>
                </article>

                <article className="card stat">
                    <div className="stat-head">
                        <div className="stat-label">Bloqués</div>
                        <div className="badge" id="bBlocked">—</div>
                    </div>
                    <div className="value" id="sBlocked">0</div>
                    <div className="foot"><span className="dot bad"></span> Accès restreint</div>
                </article>
            </section>

            {/* <!-- TOOLBAR --> */}
            <div className="toolbar">
                <div className="filters">
                    <select className="select" id="filterRole">
                        <option value="">Tous les rôles</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>
                    </select>

                    <select className="select" id="filterStatus">
                        <option value="">Tous les statuts</option>
                        <option value="Active">Actif</option>
                        <option value="Pending">En attente</option>
                        <option value="Blocked">Bloqué</option>
                    </select>

                    <select className="select" id="filterSort">
                        <option value="name_asc">Tri: Nom (A→Z)</option>
                        <option value="name_desc">Tri: Nom (Z→A)</option>
                        <option value="date_desc">Tri: Dernière connexion (récent)</option>
                        <option value="date_asc">Tri: Dernière connexion (ancien)</option>
                    </select>
                </div>

                <div className="view-switch" aria-label="Changer de vue">
                    <button className="chip active" id="viewTableBtn">Table</button>
                    <button className="chip" id="viewCardsBtn">Cards</button>
                </div>
            </div>

            {/* <!-- LIST PANEL --> */}
            <section className="card panel">
                <div className="panel-head">
                    <h3>Liste des utilisateurs</h3>
                    <span className="muted" id="resultsInfo">—</span>
                </div>

                {/* <!-- Table view --> */}
                <div className="table-wrap" id="tableWrap" style={{ overflow: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Utilisateur</th>
                                <th>Rôle</th>
                                <th>Statut</th>
                                <th>Dernière connexion</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tbody"></tbody>
                    </table>
                </div>

                {/* <!-- Cards view (mobile + toggle) --> */}
                <div className="cards" id="cardsWrap"></div>

                {/* <!-- Pagination --> */}
                <div className="pagination">
                    <span className="muted" id="pageInfo">—</span>
                    <div className="pager">
                        <button className="page" id="prevBtn">←</button>
                        <span className="page active" id="pageNum">1</span>
                        <button className="page" id="nextBtn">→</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
