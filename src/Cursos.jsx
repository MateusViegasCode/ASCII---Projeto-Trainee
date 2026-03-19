import React from 'react';

const LISTA_CURSOS = [
  { id: 1, titulo: "Lógica de Programação", desc: "O início de tudo. Algoritmos e estruturas.", nivel: "Iniciante" },
  { id: 2, titulo: "Frontend Moderno", desc: "Domine React, Vue e ecossistemas atuais.", nivel: "Intermediário" },
  { id: 3, titulo: "Backend com Node.js", desc: "Criando APIs escaláveis com TypeScript.", nivel: "Avançado" },
  { id: 4, titulo: "Banco de Dados SQL", desc: "Modelagem e consultas com PostgreSQL.", nivel: "Intermediário" },
  { id: 5, titulo: "UI/UX para Devs", desc: "Design focado em experiência do usuário.", nivel: "Iniciante" },
];

function Cursos({ voltar, usuarioLogado }) {
  return (
    <div className="cursos-page">
      <header className="main-header">
        <div className="container header-content">
          <div className="logo" onClick={voltar} style={{cursor: 'pointer'}}>CraftCode</div>
          <button onClick={voltar} className="btn-back" style={{margin: 0}}>← Voltar</button>
        </div>
      </header>

      <section className="courses-section">
        <div className="container">
          <h2>{usuarioLogado ? `Catálogo para ${usuarioLogado.nome}` : 'Nossos Cursos'}</h2>
          <p style={{color: 'var(--text-gray)', marginBottom: '30px'}}>
            {usuarioLogado ? 'Continue de onde parou ou comece algo novo.' : 'Faça login para salvar seu progresso.'}
          </p>
          
          <div className="course-grid">
            {LISTA_CURSOS.map(curso => (
              <article key={curso.id} className="course-card">
                <div className="card-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555'}}>
                  {curso.nivel}
                </div>
                <div className="card-content">
                  <h3>{curso.titulo}</h3>
                  <p>{curso.desc}</p>
                  <button className="link-details" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                    {usuarioLogado ? 'Acessar Aulas →' : 'Ver Detalhes →'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cursos;
