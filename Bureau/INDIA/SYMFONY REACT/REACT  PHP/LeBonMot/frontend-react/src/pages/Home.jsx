import './home.css';

export default function Home() {
    return (
        <main>
            <section className="hero" id="start">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Maîtrise le <span className="accent">français</span><br />
                        avec méthode et rigueur
                    </h1>

                    <p className="hero-subtitle">
                        Dictée, grammaire, orthographe et expression écrite : une plateforme pédagogique
                        conçue pour accompagner élèves, étudiants et enseignants à chaque étape.
                    </p>

                    <div className="hero-cta">
                        <a className="btn-hero" href="#formations">Commencer l’apprentissage</a>
                    </div>
                </div>
            </section>

            <section className="below" id="formations">
                <div className="container">
                    <h2>Une académie numérique dédiée au français</h2>
                    <p>
                        Progresse grâce à des dictées interactives, des règles de grammaire claires,
                        des exercices corrigés et un suivi personnalisé de tes progrès.
                    </p>
                </div>
            </section>
        </main>
    );
}
