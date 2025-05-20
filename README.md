<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AppCademia | FitnessFlash Impéperior</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <header class="banner">
    <img src="slide1.png" alt="Banner FitnessFlash" />
    <div class="overlay">
      <h1>AppCademia</h1>
      <p>Transforme esforço em resultado!</p>
    </div>
  </header>

  <main class="content">
    <section>
      <h2>Sobre o Projeto</h2>
      <p>
        O AppCademia é um app voltado para orientação das atividades físicas, ajudando os alunos na execução correta dos exercícios. Desenvolvido como projeto acadêmico, ele conta com telas de treino, cálculo de calorias e detalhamento dos exercícios.
      </p>
    </section>

    <section>
      <h2>Equipe do Projeto</h2>
      <ul>
        <li><strong>André Ferreira</strong> – Back-end (Banco de dados)</li>
        <li><strong>Felippe Dezzoti</strong> – Front-end (ICM e Calorias)</li>
        <li><strong>Karini Pina</strong> – Lead Page</li>
        <li><strong>Samuel de Jesus Silva</strong> – Front-end (index, home, exercíciosDB, detalhes)</li>
      </ul>
    </section>

    <section>
      <h2>Repositório do Projeto</h2>
      <a href="https://github.com/seu-usuario/appcademia" target="_blank">Acessar no GitHub</a>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 FitnessFlash Impéperior - Todos os direitos reservados.</p>
  </footer>
</body>
</html>
/* style.css */
body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  background-color: #111;
  color: #fff;
}

.banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner h1 {
  font-size: 48px;
  color: #00ff66;
}

.banner p {
  font-size: 20px;
}

.content {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

.content h2 {
  color: #00ff66;
}

a {
  color: #00ffcc;
  text-decoration: none;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #222;
  color: #aaa;
}
