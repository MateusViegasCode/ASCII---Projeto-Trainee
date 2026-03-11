import React, { useState } from 'react';

function Login({ voltar }) {
  // ✅ Estados para guardar os dados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  // ✅ Função que chama o backend em /login
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("🎉 " + dados.mensagem);
        setEmail('');
        setSenha('');
      } else {
        setMensagem("❌ " + dados.erro);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor. O Back-end está a correr?");
    }
  };

  return (
    <div className="login-page">
      <section className="login-section">
        <div className="login-container container">
          <button onClick={voltar} className="btn-back">
            &larr; Voltar
          </button>
          
          <h2>Entrar no CraftCode</h2>
          <p>Acesse sua conta para continuar evoluindo.</p>
          
          {/* ✅ onSubmit conectado ao handleSubmit */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="input-craftcode"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Sua senha" 
                className="input-craftcode"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary btn-submit">
              Entrar
            </button>
          </form>

          {/* ✅ Exibe mensagem de sucesso ou erro */}
          {mensagem && <p className="mensagem-aviso">{mensagem}</p>}
          
          <p className="signup-text">
            Não tem conta? <a href="#" style={{ color: '#ffae00' }}>Cadastre-se</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
