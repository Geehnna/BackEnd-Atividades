document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("titulo");
  const descricao = document.getElementById("descricao");
  const imagem = document.getElementById("imagem");

  document.getElementById("btn1").addEventListener("click", () => {
    titulo.textContent = "Conteúdo da Opção 1";
    descricao.textContent = "O gatinho ama musica!";
    imagem.src = "img1.jpeg";
    imagem.alt = "Imagem da opção 1";
  });

  document.getElementById("btn2").addEventListener("click", () => {
    titulo.textContent = "Conteúdo da Opção 2";
    descricao.textContent = "Agora estamos juntos!";
    imagem.src = "img2.jpeg";
    imagem.alt = "Imagem da opção 2";
  });

  document.getElementById("btn3").addEventListener("click", () => {
    titulo.textContent = "Conteúdo da Opção 3";
    descricao.textContent = "o doguinho ama musica!";
    imagem.src = "img3.jpeg";
    imagem.alt = "Imagem da opção 3";
  });
});
