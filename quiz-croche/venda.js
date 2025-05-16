document.addEventListener('DOMContentLoaded', function() {
  // Navegação dos depoimentos
  const depoimentos = document.querySelectorAll('.depoimento-destaque');
  const indicadores = document.querySelectorAll('.depoimento-indicador');
  
  // Animação das frases de destaque
  const frasesDestaque = document.querySelectorAll('.frase-destaque');
  
  // Efeito especial ao carregar a página
  setTimeout(() => {
    frasesDestaque.forEach((frase, index) => {
      setTimeout(() => {
        frase.classList.add('frase-visivel');
        
        // Adicionar classe especial para destacar a frase ao carregar
        frase.classList.add('frase-destaque-inicial');
        
        // Remover classe após o efeito inicial
        setTimeout(() => {
          frase.classList.remove('frase-destaque-inicial');
        }, 1500);
        
      }, index * 300); // Efeito cascata, uma frase após a outra
    });
  }, 1000);
  
  // Adicionar elementos decorativos para cada frase
  frasesDestaque.forEach((frase, index) => {
    // Criar elementos decorativos
    const decorElement = document.createElement('div');
    decorElement.className = 'frase-decor';
    
    // Criar elementos de linha decorativa
    const linhaDecor = document.createElement('div');
    linhaDecor.className = 'frase-linha';
    
    // Adicionar uma âncora visual diferente para cada frase
    const iconesDecor = ['✨', '🧶', '💖', '💎', '🌟'];
    const iconeElement = document.createElement('span');
    iconeElement.className = 'frase-icone-mini';
    iconeElement.textContent = iconesDecor[index % iconesDecor.length];
    
    // Adicionar os elementos ao documento
    decorElement.appendChild(iconeElement);
    frase.appendChild(decorElement);
    frase.appendChild(linhaDecor);
    
    // Adicionar efeito de cor de fundo personalizada
    const corFundo = getComputedStyle(frase).background;
    frase.setAttribute('data-bg-original', corFundo);
  });
  
  // Função para verificar se um elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Adiciona classe para animar quando o elemento está visível
  function handleScrollAnimation() {
    frasesDestaque.forEach(frase => {
      if (isElementInViewport(frase)) {
        frase.classList.add('frase-visivel');
        
        // Adicionar efeito de brilho quando a frase ficar visível
        setTimeout(() => {
          frase.querySelector('.frase-decor').classList.add('decor-ativo');
        }, 500);
      }
    });
  }
  
  // Verifica ao carregar e ao rolar a página
  handleScrollAnimation();
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Rotação das cores de fundo das frases
  let colorIndex = 0;
  const colors = [
    'linear-gradient(135deg, #fff8fa 0%, #fff2e8 100%)',
    'linear-gradient(135deg, #f8fcff 0%, #eaf6ff 100%)',
    'linear-gradient(135deg, #f9fff8 0%, #eaffd7 100%)',
    'linear-gradient(135deg, #fff8ff 0%, #f9eaff 100%)'
  ];
  
  setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    frasesDestaque.forEach((frase, i) => {
      setTimeout(() => {
        frase.style.background = colors[(colorIndex + i) % colors.length];
      }, i * 300);
    });
  }, 6000);
  
  // Adicionar interatividade ao passar o mouse pelas frases
  frasesDestaque.forEach(frase => {
    frase.addEventListener('mouseenter', function() {
      // Efeito de destaque ao passar o mouse
      this.classList.add('frase-hover');
      
      // Destacar ícone
      const icon = this.querySelector('.destaque-icon');
      if (icon) {
        icon.classList.add('icon-hover');
      }
    });
    
    frase.addEventListener('mouseleave', function() {
      // Remover efeito ao tirar o mouse
      this.classList.remove('frase-hover');
      
      // Remover destaque do ícone
      const icon = this.querySelector('.destaque-icon');
      if (icon) {
        icon.classList.remove('icon-hover');
      }
    });
  });
  
  if (depoimentos.length > 0 && indicadores.length > 0) {
    // Define o primeiro depoimento como ativo inicialmente
    depoimentos[0].classList.add('active');
    
    indicadores.forEach((indicador, index) => {
      indicador.addEventListener('click', () => {
        // Esconde todos os depoimentos e remove classe active
        depoimentos.forEach(depoimento => {
          depoimento.style.display = 'none';
          depoimento.classList.remove('active');
        });
        
        // Remove classe ativo de todos os indicadores
        indicadores.forEach(ind => {
          ind.classList.remove('ativo');
        });
        
        // Mostra o depoimento selecionado
        depoimentos[index].style.display = 'block';
        
        // Adiciona classe active para animar o depoimento
        setTimeout(() => {
          depoimentos[index].classList.add('active');
        }, 10);
        
        // Adiciona classe ativo ao indicador clicado
        indicador.classList.add('ativo');
      });
    });
    
    // Navegação automática a cada 5 segundos
    let currentIndex = 0;
    let autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % depoimentos.length;
      indicadores[currentIndex].click();
    }, 5000);
    
    // Pausa a rotação automática quando o mouse está sobre o depoimento
    const depoimentosContainer = document.querySelector('.depoimentos-container');
    depoimentosContainer.addEventListener('mouseenter', () => {
      clearInterval(autoRotate);
    });
    
    // Reinicia a rotação automática quando o mouse sai do depoimento
    depoimentosContainer.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % depoimentos.length;
        indicadores[currentIndex].click();
      }, 5000);
    });
  }
  
  // Funcionalidade para todas as imagens de bolsas
  const bolsaLinks = document.querySelectorAll('.bolsa-link');
  
  bolsaLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Cria um modal para mostrar a imagem ampliada
      const modal = document.createElement('div');
      modal.classList.add('bolsa-modal');
      
      const modalContent = document.createElement('div');
      modalContent.classList.add('bolsa-modal-content');
      
      const imgSrc = this.querySelector('img').src;
      const imgAlt = this.querySelector('img').alt;
      
      const modalImg = document.createElement('img');
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;
      
      const closeBtn = document.createElement('span');
      closeBtn.classList.add('bolsa-modal-close');
      closeBtn.innerHTML = '&times;';
      
      const modalTitle = document.createElement('h3');
      
      // Determinar o título com base no alt da imagem
      if (imgAlt.includes('verde')) {
        modalTitle.textContent = 'Bolsa de Crochê Verde';
      } else if (imgAlt.includes('rosa')) {
        modalTitle.textContent = 'Bolsa de Crochê Rosa';
      } else if (imgAlt.includes('terracota')) {
        modalTitle.textContent = 'Bolsa de Crochê Terracota';
      } else if (imgAlt.includes('branca')) {
        modalTitle.textContent = 'Bolsa de Crochê Branca';
      } else {
        modalTitle.textContent = 'Bolsa de Crochê';
      }
      
      const modalDesc = document.createElement('p');
      
      // Personalizar descrição com base no alt da imagem
      if (imgAlt.includes('terracota')) {
        modalDesc.textContent = 'Esta bolsa terracota com alça de corrente dourada e pingentes é um dos modelos mais vendidos pelas nossas alunas. Elegante e versátil, combina com diversos looks.';
      } else if (imgAlt.includes('branca')) {
        modalDesc.textContent = 'A bolsa branca com corrente dourada é perfeita para ocasiões especiais. Seu design moderno e sofisticado é um dos favoritos entre nossas alunas iniciantes.';
      } else {
        modalDesc.textContent = 'Esta bolsa foi feita por uma de nossas alunas utilizando a técnica ensinada no curso. Você também pode aprender a fazer!';
      }
      
      const ctaBtn = document.createElement('a');
      ctaBtn.href = '#';
      ctaBtn.classList.add('cta-btn', 'modal-cta');
      ctaBtn.textContent = 'QUERO APRENDER A FAZER';
      
      modalContent.appendChild(closeBtn);
      modalContent.appendChild(modalImg);
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(modalDesc);
      modalContent.appendChild(ctaBtn);
      modal.appendChild(modalContent);
      
      document.body.appendChild(modal);
      
      // Exibe o modal com animação
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
      
      // Fecha o modal ao clicar no botão de fechar
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      });
      
      // Fecha o modal ao clicar fora do conteúdo
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        }
      });
    });
  });
  
  // Funcionalidade de acordeão para o FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const pergunta = item.querySelector('.faq-pergunta');
    
    pergunta.addEventListener('click', () => {
      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Alterna o estado do item atual
      item.classList.toggle('active');
    });
  });
  
  // Ativa o primeiro item do FAQ por padrão
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }
});