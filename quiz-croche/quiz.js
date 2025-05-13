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
let soundEnabled = true;
let audioUnlocked = false;

// Sistema de áudio usando Web Audio API (sem depender de arquivos externos)
const audioSystem = {
  audioContext: null,
  init: function() {
    try {
      // Cria o contexto de áudio
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      audioUnlocked = true;
      
      // Tenta desbloquear o áudio em dispositivos móveis
      this.unlockAudio();
      
      console.log('Sistema de áudio inicializado com sucesso');
    } catch (e) {
      console.log('Erro ao inicializar sistema de áudio:', e);
    }
  },
  unlockAudio: function() {
    // Função para desbloquear áudio em iOS e outros dispositivos móveis
    const unlockAudio = () => {
      if (!this.audioContext) return;
      
      // Cria um oscilador silencioso
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0;
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      oscillator.start(0);
      oscillator.stop(0.001);
      
      // Resume o contexto de áudio se estiver suspenso
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      audioUnlocked = true;
      
      // Remover os event listeners após o desbloqueio
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('touchend', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
    
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('touchend', unlockAudio);
    document.addEventListener('click', unlockAudio);
  },
  // Som de moeda caindo
  playCoinSound: function(points) {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      // Cria um oscilador para o som metálico
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      
      // Cria um oscilador para o som de impacto
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      
      // Cria um filtro para dar o efeito metálico
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2500;
      filter.Q.value = 5;
      
      // Cria nós de ganho para controlar o volume
      const gainOsc1 = ctx.createGain();
      const gainOsc2 = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Conecta os osciladores aos seus nós de ganho
      osc1.connect(gainOsc1);
      osc2.connect(gainOsc2);
      
      // Conecta os nós de ganho ao filtro
      gainOsc1.connect(filter);
      gainOsc2.connect(filter);
      
      // Conecta o filtro ao ganho master e à saída
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Define as frequências iniciais
      osc1.frequency.value = 2500;
      osc2.frequency.value = 1500;
      
      // Configura o envelope de volume para o som metálico
      gainOsc1.gain.setValueAtTime(0, now);
      gainOsc1.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainOsc1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      // Configura o envelope de volume para o som de impacto
      gainOsc2.gain.setValueAtTime(0, now);
      gainOsc2.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainOsc2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      // Define o volume master com base na quantidade de pontos
      const volume = points >= 30 ? 0.4 : (points >= 20 ? 0.3 : 0.2);
      masterGain.gain.value = volume;
      
      // Inicia os osciladores
      osc1.start(now);
      osc2.start(now);
      
      // Para os osciladores
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
      
      // Para pontuações maiores, adiciona mais moedas
      if (points >= 20) {
        setTimeout(() => {
          this.playSingleCoinSound(0.25);
        }, 150);
      }
      
      if (points >= 30) {
        setTimeout(() => {
          this.playSingleCoinSound(0.3);
        }, 300);
      }
    } catch (e) {
      console.log('Erro ao reproduzir som de moeda:', e);
    }
  },
  // Som de uma única moeda
  playSingleCoinSound: function(volume = 0.2) {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      // Oscilador para o som metálico
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 2000 + Math.random() * 500;
      
      // Filtro para dar o efeito metálico
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      filter.Q.value = 3;
      
      // Nó de ganho para controlar o volume
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      
      // Conecta tudo
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      // Inicia e para o oscilador
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      console.log('Erro ao reproduzir som de moeda única:', e);
    }
  },
  // Som de clique de botão
  playClickSound: function() {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      // Cria um oscilador para o clique
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 800;
      
      // Cria um nó de ganho para controlar o volume
      const gain = ctx.createGain();
      
      // Conecta o oscilador ao nó de ganho e à saída
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Configura o envelope de volume para um clique curto
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      // Inicia e para o oscilador
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.log('Erro ao reproduzir som de clique:', e);
    }
  },
  // Som de bônus (chuva de moedas)
  playBonusSound: function(isSpecial = false) {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      // Reproduz várias moedas em sequência para simular uma chuva de moedas
      const numCoins = isSpecial ? 8 : 4;
      const baseVolume = isSpecial ? 0.3 : 0.2;
      
      for (let i = 0; i < numCoins; i++) {
        setTimeout(() => {
          // Varia um pouco o volume e a frequência para cada moeda
          const randomVolume = baseVolume + Math.random() * 0.1;
          this.playSingleCoinSound(randomVolume);
        }, i * (isSpecial ? 80 : 120));
      }
      
      // Adiciona um som de "jackpot" para bônus especiais
      if (isSpecial) {
        setTimeout(() => {
          const ctx = this.audioContext;
          const now = ctx.currentTime;
          
          // Cria um oscilador para o som de "jackpot"
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          
          // Cria um nó de ganho para controlar o volume
          const gain = ctx.createGain();
          
          // Conecta o oscilador ao nó de ganho e à saída
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          // Configura o envelope de volume
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          
          // Faz a frequência subir para dar sensação de vitória
          osc.frequency.setValueAtTime(500, now);
          osc.frequency.linearRampToValueAtTime(1500, now + 0.3);
          
          // Inicia e para o oscilador
          osc.start(now);
          osc.stop(now + 0.5);
        }, numCoins * 80 + 100);
      }
    } catch (e) {
      console.log('Erro ao reproduzir som de bônus:', e);
    }
  },
  // Som final (chuva de moedas grande)
  playFinalSound: function() {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      // Primeiro toca um acorde de vitória
      const ctx = this.audioContext;
      const now = ctx.currentTime;
      
      // Cria osciladores para o acorde
      const notes = [500, 600, 750, 900];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = freq;
          
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0, now + i * 0.1);
          gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.8);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.8);
        }, i * 100);
      });
      
      // Depois toca uma grande chuva de moedas
      setTimeout(() => {
        // Reproduz muitas moedas em sequência para simular uma chuva de moedas grande
        const numCoins = 15;
        
        for (let i = 0; i < numCoins; i++) {
          setTimeout(() => {
            // Varia o volume e a frequência para cada moeda
            const randomVolume = 0.15 + Math.random() * 0.2;
            this.playSingleCoinSound(randomVolume);
          }, i * 100 + Math.random() * 200);
        }
      }, 500);
    } catch (e) {
      console.log('Erro ao reproduzir som final:', e);
    }
  },
  // Toca um som para teste
  playTestSound: function() {
    if (!soundEnabled || !this.audioContext) return;
    
    try {
      // Toca uma sequência de moedas para demonstração
      this.playSingleCoinSound(0.3);
      
      setTimeout(() => {
        this.playSingleCoinSound(0.25);
      }, 150);
      
      setTimeout(() => {
        this.playSingleCoinSound(0.2);
      }, 300);
    } catch (e) {
      console.log('Erro ao reproduzir som de teste:', e);
    }
  },
  showAudioWarning: function() {
    if (document.querySelector('.audio-warning')) return;
    
    const warning = document.createElement('div');
    warning.className = 'audio-warning';
    warning.innerHTML = `
      <div class="audio-warning-content">
        <span class="audio-warning-icon">🔊</span>
        <span class="audio-warning-text">Clique aqui para ativar os sons</span>
      </div>
    `;
    warning.onclick = () => {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          audioUnlocked = true;
          this.playTestSound();
          warning.classList.add('audio-warning-success');
          warning.querySelector('.audio-warning-text').textContent = 'Sons ativados com sucesso!';
          
          setTimeout(() => {
            warning.remove();
          }, 2000);
        }).catch(e => {
          warning.querySelector('.audio-warning-text').textContent = 'Tente clicar novamente para ativar os sons';
        });
      } else {
        this.playTestSound();
        warning.classList.add('audio-warning-success');
        warning.querySelector('.audio-warning-text').textContent = 'Sons ativados com sucesso!';
        
        setTimeout(() => {
          warning.remove();
        }, 2000);
      }
    };
    
    document.body.appendChild(warning);
  }
};

// Inicializa o sistema de áudio
audioSystem.init();

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

function createSoundToggle() {
  const soundToggle = document.createElement('div');
  soundToggle.className = 'sound-toggle';
  soundToggle.innerHTML = soundEnabled ? '🔊' : '🔇';
  soundToggle.title = soundEnabled ? 'Desativar sons' : 'Ativar sons';
  soundToggle.onclick = toggleSound;
  
  return soundToggle;
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const toggle = document.querySelector('.sound-toggle');
  if (toggle) {
    toggle.innerHTML = soundEnabled ? '🔊' : '🔇';
    toggle.title = soundEnabled ? 'Desativar sons' : 'Ativar sons';
  }
  
  // Tocar um som de teste quando ativar
  if (soundEnabled) {
    audioSystem.playClickSound();
  }
}

function vibrateDevice(duration = 50) {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
}

function playBonusSound(isSpecial = false) {
  audioSystem.playBonusSound(isSpecial);
}

function getRandomBonus() {
  bonusStreak++;
  
  if (bonusStreak >= 3) {
    bonusStreak = 0;
    
    if (Math.random() < 0.3) {
      const bonusAmount = Math.floor(Math.random() * 30) + 20;
      showBonusMessage(`BÔNUS ESPECIAL! +${bonusAmount}`);
      vibrateDevice(200);
      playBonusSound(true);
      return bonusAmount;
    }
  }
  
  if (Math.random() < 0.2) {
    const bonusAmount = Math.floor(Math.random() * 10) + 5;
    showBonusMessage(`BÔNUS! +${bonusAmount}`);
    vibrateDevice(100);
    playBonusSound();
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

function playCoinSound(points) {
  audioSystem.playCoinSound(points);
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
  
  playCoinSound(points);
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

function playClickSound() {
  audioSystem.playClickSound();
}

function renderQuiz() {
  quizContent.innerHTML = '';
  
  if (!document.querySelector('.coin-counter')) {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.insertBefore(createCoinCounter(), quizContainer.firstChild);
    
    // Adicionar botão de som
    if (!document.querySelector('.sound-toggle')) {
      quizContainer.insertBefore(createSoundToggle(), quizContainer.firstChild);
    }
  }

  if (current < quizData.length) {
    const q = quizData[current];
    if (q.isInfo) {
      quizContent.innerHTML = `<div class='question'>${q.question}</div>`;
      const provaBtn = document.getElementById('prova-btn');
      if (provaBtn) {
        provaBtn.onclick = () => {
          playClickSound();
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
          playClickSound();
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
        playClickSound();
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
    
    // Som especial para o resultado final
    if (soundEnabled) {
      audioSystem.playFinalSound();
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, 500);
}

renderQuiz(); 