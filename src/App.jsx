import React, { useState } from 'react';
import Login from './Login.jsx';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  // Novo estado para guardar as informações do utilizador
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Função para limpar o utilizador e voltar ao estado deslogado
  const fazerLogout = () => {
    setUsuarioLogado(null);
  };

  if (paginaAtual === 'login') {
    return (
      <Login 
        voltar={() => setPaginaAtual('home')} 
        // Esta função recebe os dados do Login.jsx e guarda no App.jsx
        aoLogarSucesso={(dadosDoUsuario) => {
          setUsuarioLogado(dadosDoUsuario);
          setPaginaAtual('home'); // Volta para a home automaticamente
        }}
      />
    );
  }

  return (
    <div>
      <header className="main-header">
        <div className="container header-content">
          <div className="logo">CraftCode</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Cursos</a></li>
              <li><a href="#">Trilhas</a></li>
              <li><a href="#">Sobre</a></li>
              
              {/* Renderização Condicional: Muda o que aparece no cabeçalho */}
              <li>
                {usuarioLogado ? (
                  // Se ESTIVER logado, mostra o nome e o botão de Sair
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                      Olá, {usuarioLogado.nome}!
                    </span>
                    <button onClick={fazerLogout} className="btn-entrar-header" style={{ borderColor: '#FF8C00', color: '#FF8C00' }}>
                      Sair
                    </button>
                  </div>
                ) : (
                  // Se NÃO estiver logado, mostra o botão original de Entrar
                  <button onClick={() => setPaginaAtual('login')} className="btn-entrar-header">
                    Entrar
                  </button>
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
          
          {/* Se o utilizador já estiver logado, podemos mudar o texto do botão principal também */}
          {usuarioLogado ? (
             <button className="btn-primary" style={{ border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
               Ver meus cursos
             </button>
          ) : (
            <button onClick={() => setPaginaAtual('login')} className="btn-primary" style={{ border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
              Começar Agora
            </button>
          )}
        </div>
      </section>

      <section className="courses-section">
        <div className="container">
            <h2>Cursos Populares</h2>
            <div className="course-grid">
                <article className="course-card">
                    <div className="card-image"></div>
                    <div className="card-content">
                        <h3>Lógica de Programação</h3>
                        <p>Fundamentos essenciais para iniciantes.</p>
                        <a href="#" className="link-details">Ver detalhes &rarr;</a>
                    </div>
                </article>

                <article className="course-card">
                    <div className="card-image"></div>
                    <div className="card-content">
                        <h3>Frontend Moderno</h3>
                        <p>HTML, CSS e JavaScript avançado.</p>
                        <a href="#" className="link-details">Ver detalhes &rarr;</a>
                    </div>
                </article>

                <article className="course-card">
                    <div className="card-image"></div>
                    <div className="card-content">
                        <h3>Backend com Node.js</h3>
                        <p>Construa APIs robustas e escaláveis.</p>
                        <a href="#" className="link-details">Ver detalhes &rarr;</a>
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
