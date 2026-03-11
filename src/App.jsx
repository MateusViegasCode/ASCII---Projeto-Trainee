import React, { useState } from 'react';

function App() {
  // Estados para guardar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

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
        // Limpar o formulário
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setMensagem("❌ Erro: " + dados.erro);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor. O Back-end está rodando?");
    }
  };

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
          <a href="#cadastro" className="btn-primary">Começar Agora</a>
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

      {/* Formulário de Cadastro no final da página */}
      <section id="cadastro" className="cadastro-section">
        <div className="container">
          <h2>Crie sua conta</h2>
          <p>Junte-se ao CraftCode e comece a construir seu futuro.</p>
          
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
              <label>Senha:</label>
              <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn-primary">Cadastrar</button>
          </form>

          {/* Mensagem de sucesso ou erro */}
          {mensagem && <p className="mensagem-aviso">{mensagem}</p>}
        </div>
      </section>
    </div>
  );
}

export default App;