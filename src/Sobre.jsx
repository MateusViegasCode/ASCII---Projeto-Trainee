import React from 'react';

function Sobre({ voltar }) {
  return (
    <div className="sobre-page">
      <section className="hero-mini">
        <div className="container">
          <button onClick={voltar} className="btn-back">
            &larr; Voltar para Home
          </button>
          <h1>Nossa Missão</h1>
          <p>Transformar entusiastas em artesãos do código através da prática real.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container about-grid">
          <div className="about-text">
            <h2>Quem somos?</h2>
            <p>
              A <strong>CraftCode</strong> nasceu em 2026 com o objetivo de simplificar o 
              aprendizado de programação. Acreditamos que o código é uma forma de arte e, 
              como toda arte, requer as ferramentas certas e muita prática.
            </p>
            <p>
              Nossa metodologia é focada em projetos reais, fugindo de teorias maçantes 
              e focando no que o mercado realmente exige: resolução de problemas e 
              arquitetura limpa.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3>+10k</h3>
              <p>Alunos Ativos</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Cursos Práticos</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Suporte da Comunidade</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Nossos Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="icon">🚀</span>
              <h4>Evolução Contínua</h4>
              <p>O mundo tech não para, e nós também não.</p>
            </div>
            <div className="value-item">
              <span className="icon">🤝</span>
              <h4>Comunidade</h4>
              <p>Ninguém aprende sozinho. Crescemos juntos.</p>
            </div>
            <div className="value-item">
              <span className="icon">💎</span>
              <h4>Qualidade</h4>
              <p>Código que funciona é bom, código limpo é melhor.</p>
            </div>
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

export default Sobre;
