// Variáveis globais
let tigreza = document.querySelector('.tigreza');
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let highscoreList = document.getElementById('highscore-list');
let menuButtons = document.querySelectorAll('.menu-dificuldade button');

let game_state = 'Start';

let gravity, move_speed;
let pipe_separation = 0;
const pipe_gap = 35; // distância entre canos

// Velocidades para os níveis
const levels = {
  easy: {move_speed: 2, gravity: 0.3},
  normal: {move_speed: 3, gravity: 0.5},
  hard: {move_speed: 5, gravity: 0.7},
};

let tigreza_dy = 0;
let score = 0;

// Configura nível inicial
let currentLevel = 'normal';
setLevel(currentLevel);

// Define nível selecionado no menu e atualiza variáveis
menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(game_state === 'Play') return; // não muda durante o jogo
    menuButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentLevel = button.dataset.level;
    setLevel(currentLevel);
  });
});

function setLevel(level) {
  move_speed = levels[level].move_speed;
  gravity = levels[level].gravity;
  message.innerHTML = `Nível: ${level.charAt(0).toUpperCase() + level.slice(1)} - Pressione Enter pra começar`;
}

// Iniciar jogo ao pressionar Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && game_state !== 'Play') {
    startGame();
  }
});

// Função para iniciar ou reiniciar o jogo
function startGame() {
  document.querySelectorAll('.pipe_sprite').forEach(e => e.remove());
  tigreza.style.top = '40vh';
  tigreza_dy = 0;
  score = 0;
  updateScore();
  game_state = 'Play';
  message.innerHTML = '';
  play();
}

// Atualiza texto da pontuação
function updateScore() {
  score_title.textContent = 'Score: ';
  score_val.textContent = score;
}

// Função para aumentar velocidade a cada 10 pontos
function increaseDifficulty() {
  if(score > 0 && score % 10 === 0) {
    move_speed += 0.5;
    gravity += 0.05;
  }
}

function play() {
  // Move os canos
  function movePipes() {
    if (game_state !== 'Play') return;

    let pipes = document.querySelectorAll('.pipe_sprite');
    pipes.forEach(pipe => {
      let rect = pipe.getBoundingClientRect();
      let tigrezaRect = tigreza.getBoundingClientRect();

      // Remove cano que saiu da tela
      if (rect.right <= 0) {
        pipe.remove();
      } else {
        // Detecta colisão
        if (
          tigrezaRect.left < rect.left + rect.width &&
          tigrezaRect.left + tigrezaRect.width > rect.left &&
          tigrezaRect.top < rect.top + rect.height &&
          tigrezaRect.top + tigrezaRect.height > rect.top
        ) {
          endGame();
          return;
        } else {
          // Aumenta pontuação quando passar pelo cano inferior (pipe com increase_score == 1)
          if (
            rect.right < tigrezaRect.left &&
            rect.right + move_speed >= tigrezaRect.left &&
            pipe.increase_score === '1'
          ) {
            score++;
            updateScore();
            increaseDifficulty();
          }
          pipe.style.left = rect.left - move_speed + 'px';
        }
      }
    });
    requestAnimationFrame(movePipes);
  }

  requestAnimationFrame(movePipes);

  // Aplica gravidade e controla voo da tigreza
  function applyGravity() {
    if (game_state !== 'Play') return;

    tigreza_dy += gravity;

    // Limites da tela para a tigreza
    let tigrezaRect = tigreza.getBoundingClientRect();
    let bgRect = background;

    if (tigrezaRect.top <= 0 || tigrezaRect.bottom >= bgRect.bottom) {
      endGame();
      return;
    }

    tigreza.style.top = tigreza.offsetTop + tigreza_dy + 'px';

    requestAnimationFrame(applyGravity);
  }

  requestAnimationFrame(applyGravity);

  // Cria canos
  function createPipe() {
    if (game_state !== 'Play') return;

    pipe_separation++;

    if (pipe_separation > 115) {
      pipe_separation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;

      // Cano superior
      let pipe_top = document.createElement('div');
      pipe_top.className = 'pipe_sprite pipe_top';
      pipe_top.style.top = (pipe_posi - 70) + 'vh';
      pipe_top.style.left = '100vw';

      // Cano inferior
      let pipe_bottom = document.createElement('div');
      pipe_bottom.className = 'pipe_sprite pipe_bottom';
      pipe_bottom.style.top = (pipe_posi + pipe_gap) + 'vh';
      pipe_bottom.style.left = '100vw';
      pipe_bottom.increase_score = '1'; // só o cano inferior dá ponto

      document.body.appendChild(pipe_top);
      document.body.appendChild(pipe_bottom);
    }
    requestAnimationFrame(createPipe);
  }

  requestAnimationFrame(createPipe);
}

function endGame() {
  game_state = 'End';
  message.innerHTML = 'Fim de jogo! Pressione Enter para reiniciar';
  message.style.left = '28vw';
  saveScore(score);
  showHighScores();
}

// Controla o voo da tigreza
document.addEventListener('keydown', (e) => {
  if (game_state !== 'Play') return;
  if (e.key === 'ArrowUp' || e.key === ' ') {
    tigreza_dy = -7.6;
  }
});

// Salva pontuação no localStorage
function saveScore(newScore) {
  let scores = JSON.parse(localStorage.getItem('flappyScores')) || [];
  scores.push(newScore);
  scores.sort((a,b) => b - a);
  if(scores.length > 5) scores.length = 5;
  localStorage.setItem('flappyScores', JSON.stringify(scores));
}

// Exibe top 5 pontuações
function showHighScores() {
  let scores = JSON.parse(localStorage.getItem('flappyScores')) || [];
  highscoreList.innerHTML = '';

  if(scores.length === 0) {
    highscoreList.innerHTML = '<li>Nenhuma pontuação ainda</li>';
    return;
  }

  scores.forEach((score, i) => {
    let li = document.createElement('li');
    li.textContent = score;
    highscoreList.appendChild(li);
  });
}

// Mostra a lista ao carregar a página
showHighScores();
