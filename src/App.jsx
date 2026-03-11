import React, { useState } from 'react'
import Login from './Login.jsx'

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  if (paginaAtual === 'login') {
    return <Login voltar={() => setPaginaAtual('home')} />;
  }

  return (
    <>
      <header className="main-header">
        <div className="container header-content">
          <div className="logo" onClick={() => setPaginaAtual('home')} style={{cursor: 'pointer'}}>
            CraftCode
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Cursos</a></li>
              <li><a href="#">Trilhas</a></li>
              <li><a href="#">Sobre</a></li>
              <li>
                <button onClick={() => setPaginaAtual('login')} className="btn-entrar-header">
                  Entrar
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Domine a arte do código</h1>
            <p>Aprenda programação com projetos práticos e evolua sua carreira tech.</p>
            <a href="#" className="btn-primary">Começar Agora</a>
          </div>
        </section>
        
        <section className="courses-section">
            <div className="container">
                <h2>Cursos Populares</h2>
                <div className="course-grid">
                    <div className="course-card">
                        <h3>Lógica de Programação</h3>
                        <p>Fundamentos essenciais para iniciantes.</p>
                    </div>
                    <div className="course-card">
                        <h3>Frontend Moderno</h3>
                        <p>HTML, CSS e JS avançado.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 CraftCode. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
