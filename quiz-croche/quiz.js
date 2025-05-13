const quizData = [
  {
    intro: true,
    question: 'Se você pudesse trabalhar de casa e ganhar uma boa renda... o que isso mudaria na sua vida?',
    answers: [
      'Poderia passar mais tempo com quem eu amo',
      'Aliviaria as dívidas e teria paz na cabeça',
      'Teria algo meu, sem depender de ninguém',
      'Tudo isso e mais um pouco...'
    ],
    points: [15, 20, 15, 25]
  },
  {
    question: 'Nos últimos meses, o que você mais sentiu?',
    answers: [
      'Estresse e cansaço de viver sempre no limite',
      'Vontade de ter algo que me faça bem e ainda gere dinheiro',
      'Medo de envelhecer sem realizar meus sonhos',
      'Todas as anteriores...'
    ],
    points: [15, 20, 15, 25]
  },
  {
    question: 'Você já ouviu falar de pessoas que ganham dinheiro com crochê?',
    answers: [
      'Sim, mas nunca achei que fosse pra mim',
      'Já tentei, mas parei por falta de apoio ou tempo',
      'Não sabia que dava pra ganhar de verdade com isso',
      'Já ouvi e sempre tive curiosidade'
    ],
    points: [15, 20, 15, 25]
  },
  {
    question: 'Imagine vender uma bolsa feita por você por R$180. O que você sentiria?',
    answers: [
      'Orgulho! Saber que sou capaz',
      'Alívio! Uma grana que vem do meu talento',
      'Paz! Trabalhar com algo que me acalma',
      'TUDO ISSO! 🥹'
    ],
    points: [15, 20, 15, 30]
  },
  {
    question: 'Qual dessas frases mais parece com você hoje?',
    answers: [
      '"Não aguento mais depender dos outros"',
      '"Quero encontrar um sentido no meu dia a dia"',
      '"Preciso fazer algo por mim, agora"',
      '"Sinto que ainda posso recomeçar, mesmo depois dos 35"'
    ],
    points: [15, 20, 15, 25]
  },
  {
    question: 'Você estaria disposta a aprender um passo a passo simples, mesmo começando do zero?',
    answers: [
      'Sim, estou pronta!',
      'Sim, mas tenho medo de não conseguir',
      'Quero ver como funciona primeiro'
    ],
    points: [30, 20, 15]
  },
  {
    question: 'Olha isso aqui 👇<br><span style="font-size:1.1em">Mais de 18 mil mulheres já descobriram que dá SIM pra lucrar com crochê, mesmo sem experiência.</span><br><br><button class="answer-btn" id="prova-btn">EU TAMBÉM QUERO APRENDER!</button>',
    answers: [],
    isInfo: true,
    points: [50]
  },
  {
    question: 'Qual dessas frases combina mais com o que você espera de um novo começo?',
    answers: [
      'Trabalhar no meu ritmo, do meu jeito',
      'Sentir orgulho do que faço e ver o dinheiro entrando',
      'Fazer parte de algo que me valorize',
      'Todas! Quero uma vida com mais propósito'
    ],
    points: [15, 20, 15, 30]
  },
  {
    question: 'Só mais uma coisa: qual seu nome? <br><span style="font-size:0.95em">Pra gente montar um plano com base no seu perfil ✨</span>',
    answers: [],
    isName: true,
    points: [20]
  }
];

let current = 0;
let answers = [];
let userName = '';
let totalPoints = 0;
let bonusStreak = 0;

const quizContent = document.getElementById('quiz-content');

function createCoinCounter() {
  const coinCounter = document.createElement('div');
  coinCounter.className = 'coin-counter';
  coinCounter.innerHTML = `
    <div class="coin-icon">💰</div>
    <div class="coin-value">R$ <span id="coin-amount">0</span></div>
  `;
  return coinCounter;
}

function vibrateDevice(duration = 50) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

function getRandomBonus() {
  bonusStreak++;
  
  if (bonusStreak >= 3) {
    bonusStreak = 0;
    
    if (Math.random() < 0.3) {
      const bonusAmount = Math.floor(Math.random() * 30) + 20;
      showBonusMessage(`BÔNUS ESPECIAL! +${bonusAmount}`);
      vibrateDevice(200);
      return bonusAmount;
    }
  }
  
  if (Math.random() < 0.2) {
    const bonusAmount = Math.floor(Math.random() * 10) + 5;
    showBonusMessage(`BÔNUS! +${bonusAmount}`);
    vibrateDevice(100);
    return bonusAmount;
  }
  
  return 0;
}

function showBonusMessage(message) {
  const bonusMsg = document.createElement('div');
  bonusMsg.className = 'bonus-message';
  bonusMsg.textContent = message;
  document.querySelector('.quiz-container').appendChild(bonusMsg);
  
  setTimeout(() => {
    bonusMsg.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    bonusMsg.classList.remove('show');
    setTimeout(() => bonusMsg.remove(), 500);
  }, 2000);
}

function updateCoinCounter(points) {
  const coinAmount = document.getElementById('coin-amount');
  if (!coinAmount) return;
  
  const currentValue = parseInt(coinAmount.textContent);
  const newValue = currentValue + points;
  
  if (points > 0) {
    vibrateDevice(points > 20 ? 100 : 50);
  }
  
  let displayValue = currentValue;
  const interval = setInterval(() => {
    displayValue += 1;
    coinAmount.textContent = displayValue;
    
    coinAmount.classList.add('coin-increase');
    
    if (displayValue >= newValue) {
      clearInterval(interval);
      setTimeout(() => {
        coinAmount.classList.remove('coin-increase');
      }, 500);
    }
  }, 50);
  
  const coinPopup = document.createElement('div');
  coinPopup.className = 'coin-popup';
  coinPopup.textContent = `+${points}`;
  document.querySelector('.quiz-container').appendChild(coinPopup);
  
  setTimeout(() => {
    coinPopup.remove();
  }, 1000);
  
  playCoinSound();
}

function playCoinSound() {
  const audio = new Audio();
  audio.volume = 0.3;
  audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-coin-win-notification-1992.mp3';
  audio.play().catch(e => console.log('Som não pôde ser reproduzido: autoplay bloqueado pelo navegador'));
}

function createCoinRain() {
  const container = document.querySelector('.quiz-container');
  const coinEmojis = ['💰', '💵', '💸', '🪙'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const coin = document.createElement('div');
      coin.className = 'falling-coin';
      coin.textContent = coinEmojis[Math.floor(Math.random() * coinEmojis.length)];
      coin.style.left = `${Math.random() * 100}%`;
      coin.style.animationDuration = `${Math.random() * 3 + 2}s`;
      coin.style.fontSize = `${Math.random() * 20 + 20}px`;
      container.appendChild(coin);
      
      setTimeout(() => {
        coin.remove();
      }, 5000);
    }, i * 150);
  }
}

function renderQuiz() {
  quizContent.innerHTML = '';
  
  if (!document.querySelector('.coin-counter')) {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.insertBefore(createCoinCounter(), quizContainer.firstChild);
  }

  if (current < quizData.length) {
    const q = quizData[current];
    if (q.isInfo) {
      quizContent.innerHTML = `<div class='question'>${q.question}</div>`;
      const provaBtn = document.getElementById('prova-btn');
      if (provaBtn) {
        provaBtn.onclick = () => {
          const pointsEarned = q.points[0];
          const bonusPoints = getRandomBonus();
          totalPoints += pointsEarned + bonusPoints;
          updateCoinCounter(pointsEarned + bonusPoints);
          current++;
          renderQuiz();
        };
      }
      return;
    }
    if (q.isName) {
      quizContent.innerHTML = `<div class='question'>${q.question}</div><input type='text' id='name-input' placeholder='Digite seu nome...'>`;
      const input = document.getElementById('name-input');
      input.focus();
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && input.value.trim()) {
          userName = input.value.trim();
          const pointsEarned = q.points[0];
          const bonusPoints = getRandomBonus();
          totalPoints += pointsEarned + bonusPoints;
          updateCoinCounter(pointsEarned + bonusPoints);
          current++;
          renderQuiz();
        }
      });
      return;
    }
    if (q.intro) {
      quizContent.innerHTML += `
        <div class="quiz-intro">
          <div class="quiz-intro-title"><span class="emoji">💡</span>QUIZ – Será que você nasceu pra lucrar com crochê?</div>
          <p class="quiz-intro-desc">Responda agora e descubra se o crochê pode ser seu caminho pra ter paz, propósito e renda em casa <span class="emoji">🧶</span><span class="emoji">💰</span></p>
        </div>
      `;
    }
    quizContent.innerHTML += `<div class='question'>${q.question}</div><div class='answers'></div>`;
    const answersDiv = quizContent.querySelector('.answers');
    q.answers.forEach((ans, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.innerText = ans;
      btn.onclick = () => {
        answers[current] = idx;
        const pointsEarned = q.points[idx];
        const bonusPoints = getRandomBonus();
        totalPoints += pointsEarned + bonusPoints;
        updateCoinCounter(pointsEarned + bonusPoints);
        current++;
        renderQuiz();
      };
      answersDiv.appendChild(btn);
    });
  } else {
    userName = document.getElementById('name-input')?.value || userName;
    showResult();
  }
}

function showResult() {
  const finalBonus = 50;
  totalPoints += finalBonus;
  
  let resultMessage = '';
  let resultEmoji = '';
  
  if (totalPoints >= 200) {
    resultMessage = 'Uau! Você tem um potencial INCRÍVEL para o crochê!';
    resultEmoji = '🌟';
  } else if (totalPoints >= 150) {
    resultMessage = 'Você tem um ótimo potencial para o crochê!';
    resultEmoji = '✨';
  } else {
    resultMessage = 'Você tem potencial para o crochê!';
    resultEmoji = '🎯';
  }
  
  quizContent.innerHTML = `
    <div class="result-container">
      <div class="result-coins">
        <div class="big-coin">💰</div>
        <div class="final-amount">R$ ${totalPoints}</div>
        <div class="coin-message">Você acumulou moedas!</div>
      </div>
      <h2>${resultEmoji} <span>${userName || 'Amiga'}</span>, ${resultMessage}</h2>
      <p>Você só precisa de um caminho claro. E é exatamente isso que vou te mostrar no plano gratuito que preparei.</p>
      <a href="venda.html" class="answer-btn" style="margin-top:18px;display:inline-block;">QUERO ACESSAR MEU PLANO GRATUITO AGORA</a>
    </div>
  `;
  
  setTimeout(() => {
    updateCoinCounter(finalBonus);
    document.querySelector('.result-container').classList.add('show');
    createCoinRain();
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, 500);
}

renderQuiz(); 