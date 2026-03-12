import React from 'react';

function Login({ voltar }) {
  return (
    <div className="login-page">
      <section className="login-section">
        <div className="login-container container">
          <button onClick={voltar} className="btn-back">
            &larr; Voltar
          </button>
          
          <h2>Entrar no CraftCode</h2>
          <p>Acesse sua conta para continuar evoluindo.</p>
          
          <form className="login-form">
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="input-craftcode"
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Sua senha" 
                className="input-craftcode"
              />
            </div>
            <button type="submit" className="btn-primary btn-submit">
              Entrar
            </button>
          </form>
          
          <p className="signup-text">
            Não tem conta? <a href="#" style={{ color: '#ffae00' }}>Cadastre-se</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
