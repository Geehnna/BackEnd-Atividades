let jogador = '';
let pontuacao = 0;
let dificuldade = 'facil';
let totalCartas = 16;
let cartasSelecionadas = [];
let bloqueado = false;
let imagens = [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('iniciarBtn').addEventListener('click', iniciarJogo);
});

function iniciarJogo() {
  jogador = document.getElementById('nomeJogador').value.trim();
  if (!jogador) return alert('Digite seu nome');

  dificuldade = document.getElementById('dificuldade').value;
  totalCartas = dificuldade === 'medio' ? 36 : dificuldade === 'dificil' ? 64 : 16;

  document.getElementById('telaInicio').style.display = 'none';
  document.getElementById('jogo').style.display = 'block';
  document.getElementById('jogadorNome').textContent = jogador;

  carregarImagens().then(initGame);
}

async function carregarImagens() {
  const quantidadePares = totalCartas / 2;
  const urlBase = `https://picsum.photos/80?random=`;
  const usados = new Set();

  imagens = [];
  while (imagens.length < quantidadePares) {
    let id = Math.floor(Math.random() * 1000);
    if (!usados.has(id)) {
      usados.add(id);
      imagens.push(`${urlBase}${id}`);
    }
  }
}

function initGame() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  cartasSelecionadas = [];
  pontuacao = 0;
  document.getElementById('pontuacao').textContent = pontuacao;

  const todasImagens = [...imagens, ...imagens];
  embaralhar(todasImagens);

  definirGrade(gameBoard);

  todasImagens.forEach((src, index) => {
    const card = createCard(src, index);
    gameBoard.appendChild(card);
  });
}

function definirGrade(board) {
  const tamanho = Math.sqrt(totalCartas);
  board.style.gridTemplateColumns = `repeat(${tamanho}, 1fr)`;
}

function createCard(imagem, id) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.img = imagem;
  card.dataset.id = id;

  const img = document.createElement('img');
  img.src = imagem;
  img.style.display = 'none';
  card.appendChild(img);

  card.addEventListener('click', () => onCardClick(card));
  return card;
}

function onCardClick(card) {
  if (bloqueado || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.querySelector('img').style.display = 'block';
  cartasSelecionadas.push(card);

  if (cartasSelecionadas.length === 2) {
    bloqueado = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [c1, c2] = cartasSelecionadas;

  if (c1.dataset.img === c2.dataset.img && c1.dataset.id !== c2.dataset.id) {
    c1.classList.add('matched');
    c2.classList.add('matched');
    pontuacao += 5;
  } else {
    c1.classList.remove('flipped');
    c2.classList.remove('flipped');
    c1.querySelector('img').style.display = 'none';
    c2.querySelector('img').style.display = 'none';
    pontuacao = Math.max(0, pontuacao - 3);
  }

  document.getElementById('pontuacao').textContent = pontuacao;
  cartasSelecionadas = [];
  bloqueado = false;

  verificarFimDeJogo();
}

function verificarFimDeJogo() {
  const todas = document.querySelectorAll('.card');
  const todasCorrespondidas = [...todas].every(c => c.classList.contains('matched'));

  if (todasCorrespondidas) {
    document.getElementById('jogo').style.display = 'none';
    document.getElementById('vitoria').style.display = 'block';
    document.getElementById('vencedor').textContent = jogador;
    document.getElementById('pontuacaoFinal').textContent = pontuacao;

    salvarPontuacao(jogador, pontuacao);
    exibirRanking();
  }
}

function salvarPontuacao(nome, pontos) {
  const dados = JSON.parse(localStorage.getItem('rankingMemoria') || '[]');
  dados.push({ nome, pontos });
  dados.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem('rankingMemoria', JSON.stringify(dados.slice(0, 5)));
}

function exibirRanking() {
  const ranking = JSON.parse(localStorage.getItem('rankingMemoria') || '[]');
  const lista = document.getElementById('ranking');
  lista.innerHTML = '';

  ranking.forEach(j => {
    const li = document.createElement('li');
    li.textContent = `${j.nome} - ${j.pontos} pts`;
    lista.appendChild(li);
  });
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
