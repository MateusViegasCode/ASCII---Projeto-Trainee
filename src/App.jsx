import React, { useState } from 'react';
import Login from './Login.jsx';
import Sobre from './Sobre.jsx';
import Cursos from './Cursos.jsx';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const fazerLogout = () => setUsuarioLogado(null);
  const irPara = (p) => setPaginaAtual(p);

  // Renderização Condicional de Telas Inteiras
  if (paginaAtual === 'login') {
    return (
      <Login 
        voltar={() => irPara('home')} 
        aoLogarSucesso={(dados) => { setUsuarioLogado(dados); irPara('home'); }} 
      />
    );
  }

  if (paginaAtual === 'sobre') {
    return <Sobre voltar={() => irPara('home')} />;
  }

  if (paginaAtual === 'cursos') {
    return <Cursos voltar={() => irPara('home')} usuarioLogado={usuarioLogado} />;
  }

  // Tela Home (Padrão)
  return (
    <div>
      <header className="main-header">
        <div className="container header-content">
          <div className="logo">CraftCode</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#" onClick={() => irPara('cursos')}>Cursos</a></li>
              <li><a href="#" onClick={() => irPara('sobre')}>Sobre</a></li>
              <li>
                {usuarioLogado ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Olá, {usuarioLogado.nome}!</span>
                    <button onClick={fazerLogout} className="btn-entrar-header" style={{ borderColor: '#FF8C00', color: '#FF8C00' }}>Sair</button>
                  </div>
                ) : (
                  <button onClick={() => irPara('login')} className="btn-entrar-header">Entrar</button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Domine a arte do código</h1>
          <p>Aprenda programação com projetos práticos e evolua sua carreira tech.</p>
          <button 
            onClick={() => usuarioLogado ? irPara('cursos') : irPara('login')} 
            className="btn-primary" 
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {usuarioLogado ? 'Ver Meus Cursos' : 'Começar Agora'}
          </button>
        </div>
      </section>

      <section className="courses-section">
        <div className="container">
            <h2>Destaques</h2>
            <div className="course-grid">
                <article className="course-card">
                    <div className="card-image"></div>
                    <div className="card-content">
                        <h3>Lógica de Programação</h3>
                        <p>Fundamentos essenciais para iniciantes.</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); irPara('cursos'); }} className="link-details">Saber mais &rarr;</a>
                    </div>
                </article>
            </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2026 CraftCode. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
