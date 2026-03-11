import React, { useState } from 'react';
import Login from './Login.jsx';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  // Todos os hooks declarados no topo, antes de qualquer return
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  if (paginaAtual === 'login') {
    return <Login voltar={() => setPaginaAtual('home')} />;
  }

  // Função para enviar os dados para o Back-end
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("🎉 " + dados.mensagem);
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setMensagem("❌ Erro: " + dados.erro);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor. O Back-end está a correr?");
    }
  };

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
            <p>Aprenda programação com projetos práticos e evolua a sua carreira tech.</p>
            <a href="#cadastro" className="btn-primary">Começar Agora</a>
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

        <section id="cadastro" className="cadastro-section">
          <div className="container">
            <h2>Crie a sua conta</h2>
            <p>Junte-se ao CraftCode e comece a construir o seu futuro.</p>
            
            <form onSubmit={handleSubmit} className="form-cadastro">
              <div className="input-group">
                <label>Nome:</label>
                <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group">
                <label>E-mail:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group">
                <label>Palavra-passe:</label>
                <input 
                  type="password" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn-primary">Registar</button>
            </form>

            {mensagem && <p className="mensagem-aviso">{mensagem}</p>}
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
