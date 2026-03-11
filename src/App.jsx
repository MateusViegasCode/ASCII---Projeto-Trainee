import React from 'react';

function App() {
  return (
    <div>
      {/* Header */}
      <header className="main-header">
        <div className="container header-content">
          <div className="logo">CraftCode</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Cursos</a></li>
              <li><a href="#">Trilhas</a></li>
              <li><a href="#">Sobre</a></li>
              <li><a href="#" className="btn-login">Entrar</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Domine a arte do código</h1>
          <p>Aprenda programação com projetos práticos e evolua sua carreira tech.</p>
          <a href="#" className="btn-primary">Começar Agora</a>
        </div>
      </section>

      {/* Cards (Exemplo simplificado) */}
      <section className="courses-section">
        <div className="container">
          <h2>Cursos Populares</h2>
          <div className="course-grid">
             <article className="course-card">
                <div className="card-content">
                    <h3>Lógica de Programação</h3>
                    <p>Fundamentos essenciais.</p>
                </div>
             </article>
             {/* Você pode adicionar os outros cards aqui depois */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
