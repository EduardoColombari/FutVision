import { Link } from "react-router-dom";
import "./About.css";

const TECHS = [
  { name: "React",           desc: "Biblioteca para interfaces reativas",       icon: "⚛️" },
  { name: "Vite",            desc: "Build tool ultrarrápida",                   icon: "⚡" },
  { name: "React Router",    desc: "Navegação e rotas dinâmicas",               icon: "🔀" },
  { name: "Axios",           desc: "Cliente HTTP para consumo de APIs",         icon: "🌐" },
  { name: "Space Grotesk",   desc: "Tipografia moderna e tecnológica",          icon: "🔤" },
  { name: "CSS Modular",     desc: "Estilização por componente sem conflitos",  icon: "🎨" },
];

const APIS = [
  {
    name: "TheSportsDB",
    url:  "https://www.thesportsdb.com",
    desc: "Base de dados esportiva com times, jogadores, ligas, jogos e imagens de todo o mundo.",
    endpoints: ["all_leagues", "searchteams", "lookupteam", "searchplayers", "lookupplayer", "eventsnextleague", "lookuptable"],
  },
];

const FEATURES = [
  { icon: "🏆", text: "Classificações por liga e temporada" },
  { icon: "⚽", text: "Próximos jogos com data e estádio" },
  { icon: "👤", text: "Busca de jogadores com dados completos" },
  { icon: "🏟️", text: "Detalhes de times com elenco e galeria" },
  { icon: "🌍", text: "Detalhes de ligas com troféu e história" },
  { icon: "⚖️", text: "Comparação lado a lado entre times" },
  { icon: "🌐", text: "Tradução automática para português" },
  { icon: "📱", text: "Interface responsiva para mobile" },
];

export default function About() {
  return (
    <div className="about">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-glow" aria-hidden />
        <div className="about-hero-inner">
          <span className="hero-eyebrow" style={{ marginBottom: 0 }}>Sobre o projeto</span>
          <h1 className="about-hero-title">
            FutVision — <span className="hero-accent">futebol</span><br />em dados
          </h1>
          <p className="about-hero-sub">
            Uma plataforma web moderna para explorar o universo do futebol mundial.
            Desenvolvida como projeto acadêmico aplicando conceitos de React, consumo
            de APIs REST e design de interfaces.
          </p>
          <div className="hero-actions">
            <Link to="/" className="btn-primary">Explorar agora</Link>
            <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer" className="btn-ghost">
              Ver API
            </a>
          </div>
        </div>
        <div className="glow-line" />
      </section>

      <div className="about-page">

        {/* O que é */}
        <section className="about-section">
          <p className="section-label">O projeto</p>
          <div className="about-what">
            <div className="about-what-text">
              <h2>O que é o FutVision?</h2>
              <p>
                FutVision é uma aplicação web desenvolvida em <strong>React</strong> que consome
                dados em tempo real da <strong>TheSportsDB API</strong> para oferecer uma
                experiência completa de exploração do futebol mundial.
              </p>
              <p>
                O projeto nasceu como atividade acadêmica com o objetivo de aplicar na prática
                conceitos modernos de desenvolvimento frontend: componentização, rotas dinâmicas,
                consumo de APIs REST, gerenciamento de estado e design responsivo.
              </p>
              <p>
                Toda a interface foi construída do zero com CSS puro, sem frameworks de UI,
                priorizando performance, acessibilidade e uma estética tecnológica e imersiva.
              </p>
            </div>
            <div className="about-features-list">
              {FEATURES.map((f) => (
                <div key={f.text} className="about-feature-item">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tecnologias */}
        <section className="about-section">
          <p className="section-label">Stack</p>
          <h2 className="about-section-title">Tecnologias utilizadas</h2>
          <div className="tech-grid">
            {TECHS.map((t) => (
              <div key={t.name} className="tech-card">
                <span className="tech-icon">{t.icon}</span>
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* APIs */}
        <section className="about-section">
          <p className="section-label">Dados</p>
          <h2 className="about-section-title">APIs utilizadas</h2>
          {APIS.map((api) => (
            <div key={api.name} className="api-card">
              <div className="api-card-header">
                <h3>{api.name}</h3>
                <a href={api.url} target="_blank" rel="noreferrer" className="api-link">
                  {api.url.replace("https://", "")} ↗
                </a>
              </div>
              <p>{api.desc}</p>
              <div className="api-endpoints">
                {api.endpoints.map((ep) => (
                  <code key={ep}>{ep}</code>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Arquitetura */}
        <section className="about-section">
          <p className="section-label">Estrutura</p>
          <h2 className="about-section-title">Arquitetura do projeto</h2>
          <div className="arch-grid">
            {[
              { dir: "src/pages/",      desc: "Páginas principais (Home, Standings, Matches, Players, Compare, About, detalhes)" },
              { dir: "src/components/", desc: "Componentes reutilizáveis (TeamCard, LeagueCard)" },
              { dir: "src/services/",   desc: "Configuração e funções de consumo da API" },
              { dir: "src/utils/",      desc: "Utilitários de tradução (ligas, posições, países)" },
            ].map((a) => (
              <div key={a.dir} className="arch-card">
                <code className="arch-dir">{a.dir}</code>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Autor */}
        <section className="about-section">
          <p className="section-label">Autor</p>
          <div className="author-card">
            <div className="author-avatar">EE</div>
            <div className="author-info">
              <h2>Eduardo Colombari Elias</h2>
              <p>
                Estudante de Engenharia de Software na <strong>Uni-FACEF</strong>.
                Apaixonado por desenvolvimento web, design de interfaces e tecnologia.
                Este projeto foi desenvolvido como atividade acadêmica aplicando
                conceitos modernos de frontend com React.
              </p>
              <div className="author-tags">
                <span>React</span>
                <span>JavaScript</span>
                <span>CSS</span>
                <span>APIs REST</span>
                <span>Uni-FACEF</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
