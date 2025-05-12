const quizData = [
  {
    intro: true,
    question: 'Se você pudesse trabalhar de casa e ganhar uma boa renda... o que isso mudaria na sua vida?',
    answers: [
      'Poderia passar mais tempo com quem eu amo',
      'Aliviaria as dívidas e teria paz na cabeça',
      'Teria algo meu, sem depender de ninguém',
      'Tudo isso e mais um pouco...'
    ]
  },
  {
    question: 'Nos últimos meses, o que você mais sentiu?',
    answers: [
      'Estresse e cansaço de viver sempre no limite',
      'Vontade de ter algo que me faça bem e ainda gere dinheiro',
      'Medo de envelhecer sem realizar meus sonhos',
      'Todas as anteriores...'
    ]
  },
  {
    question: 'Você já ouviu falar de pessoas que ganham dinheiro com crochê?',
    answers: [
      'Sim, mas nunca achei que fosse pra mim',
      'Já tentei, mas parei por falta de apoio ou tempo',
      'Não sabia que dava pra ganhar de verdade com isso',
      'Já ouvi e sempre tive curiosidade'
    ]
  },
  {
    question: 'Imagine vender uma bolsa feita por você por R$180. O que você sentiria?',
    answers: [
      'Orgulho! Saber que sou capaz',
      'Alívio! Uma grana que vem do meu talento',
      'Paz! Trabalhar com algo que me acalma',
      'TUDO ISSO! 🥹'
    ]
  },
  {
    question: 'Qual dessas frases mais parece com você hoje?',
    answers: [
      '"Não aguento mais depender dos outros"',
      '"Quero encontrar um sentido no meu dia a dia"',
      '"Preciso fazer algo por mim, agora"',
      '"Sinto que ainda posso recomeçar, mesmo depois dos 35"'
    ]
  },
  {
    question: 'Você estaria disposta a aprender um passo a passo simples, mesmo começando do zero?',
    answers: [
      'Sim, estou pronta!',
      'Sim, mas tenho medo de não conseguir',
      'Quero ver como funciona primeiro'
    ]
  },
  {
    question: 'Olha isso aqui 👇<br><span style="font-size:1.1em">Mais de 18 mil mulheres já descobriram que dá SIM pra lucrar com crochê, mesmo sem experiência.</span><br><br><button class="answer-btn" id="prova-btn">EU TAMBÉM QUERO APRENDER!</button>',
    answers: [],
    isInfo: true
  },
  {
    question: 'Qual dessas frases combina mais com o que você espera de um novo começo?',
    answers: [
      'Trabalhar no meu ritmo, do meu jeito',
      'Sentir orgulho do que faço e ver o dinheiro entrando',
      'Fazer parte de algo que me valorize',
      'Todas! Quero uma vida com mais propósito'
    ]
  },
  {
    question: 'Só mais uma coisa: qual seu nome? <br><span style="font-size:0.95em">Pra gente montar um plano com base no seu perfil ✨</span>',
    answers: [],
    isName: true
  }
];

let current = 0;
let answers = [];
let userName = '';

const quizContent = document.getElementById('quiz-content');

function renderQuiz() {
  quizContent.innerHTML = '';

  if (current < quizData.length) {
    const q = quizData[current];
    if (q.isInfo) {
      quizContent.innerHTML = `<div class='question'>${q.question}</div>`;
      const provaBtn = document.getElementById('prova-btn');
      if (provaBtn) {
        provaBtn.onclick = () => {
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
  quizContent.innerHTML = `<h2>🎉 <span>${userName || 'Amiga'}</span>, seu perfil mostra que você TEM tudo pra transformar o crochê em uma renda real!</h2>
  <p>Você só precisa de um caminho claro. E é exatamente isso que vou te mostrar no plano gratuito que preparei.</p>
  <a href="venda.html" class="answer-btn" style="margin-top:18px;display:inline-block;">QUERO ACESSAR MEU PLANO GRATUITO AGORA</a>`;
}

renderQuiz(); 