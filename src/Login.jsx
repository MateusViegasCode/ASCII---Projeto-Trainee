import React, { useState } from 'react';

// Adicionamos a prop "aoLogarSucesso"
function Login({ voltar, aoLogarSucesso }) {
  const [isLogin, setIsLogin] = useState(true);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    
    const endpoint = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/cadastro';
    const bodyData = isLogin ? { email, senha } : { nome, email, senha };

    try {
      const resposta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("🎉 " + dados.mensagem);
        
        if (!isLogin) {
          setNome('');
          setIsLogin(true);
        } else {
          setSenha('');
          
          // Espera 1 segundo para o utilizador ler a mensagem de sucesso
          setTimeout(() => {
            // Chama a função passando os dados que vieram do backend (nome, email, id)
            aoLogarSucesso(dados.usuario); 
          }, 1000);
        }
      } else {
        setMensagem("❌ " + dados.erro);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor. O Back-end está a correr?");
    }
  };

  const alternarModo = () => {
    setIsLogin(!isLogin);
    setMensagem('');
    setNome('');
    setSenha('');
  };

  return (
    <div className="login-page">
      <section className="login-section">
        <div className="login-container container">
          <button onClick={voltar} className="btn-back">
            &larr; Voltar
          </button>
          
          <h2>{isLogin ? 'Entrar no CraftCode' : 'Crie a sua conta'}</h2>
          <p>{isLogin ? 'Acesse sua conta para continuar evoluindo.' : 'Junte-se ao CraftCode e comece a construir o seu futuro.'}</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Seu nome" 
                  className="input-craftcode"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
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
              {isLogin ? 'Entrar' : 'Registar'}
            </button>
          </form>

          {mensagem && <p className="mensagem-aviso">{mensagem}</p>}
          
          <p className="signup-text">
            {isLogin ? 'Não tem conta? ' : 'Já tem uma conta? '}
            <span onClick={alternarModo} className="link-acao">
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
