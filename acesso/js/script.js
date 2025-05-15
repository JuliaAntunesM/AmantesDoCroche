// Script para gerenciar carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Remover o preloader após o carregamento da página
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // Inicializar navegação responsiva
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Carrossel de depoimentos
    initTestimonialSlider();
});

// Função para inicializar o carrossel de depoimentos
function initTestimonialSlider() {
    // Selecionar todos os cards de depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    // Selecionar todos os indicadores (dots)
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    // Selecionar botões de navegação
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // Elementos do contador
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');
    // Slide atual (começa em 0)
    let currentSlide = 0;
    // Variável para armazenar o intervalo de rotação automática
    let autoSlideInterval;
    
    // Verificar se existem cards de depoimentos
    if (!testimonialCards.length) return;
    
    // Atualizar o número total de slides
    if (totalSlidesElement) {
        totalSlidesElement.textContent = testimonialCards.length;
    }
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        // Esconder todos os slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Desativar todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar o slide atual
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Atualizar o contador de slides (índice + 1 porque os arrays começam em 0)
        if (currentSlideElement) {
            currentSlideElement.textContent = index + 1;
        }
        
        // Adicionar comentário no console (apenas para desenvolvimento)
        console.log('Mostrando depoimento: ' + (index + 1) + ' de ' + testimonialCards.length);
    }
    
    // Função para ir para o slide anterior
    function goToPrevSlide() {
        // Cálculo circular para voltar ao último slide quando estiver no primeiro
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
        // Reiniciar o temporizador automático quando o usuário navegar manualmente
        resetAutoSlide();
    }
    
    // Função para ir para o próximo slide
    function goToNextSlide() {
        // Cálculo circular para voltar ao primeiro slide quando estiver no último
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
        // Reiniciar o temporizador automático quando o usuário navegar manualmente
        resetAutoSlide();
    }
    
    // Função para reiniciar o temporizador automático
    function resetAutoSlide() {
        // Limpar o intervalo existente
        clearInterval(autoSlideInterval);
        // Iniciar um novo intervalo
        startAutoSlide();
    }
    
    // Função para iniciar a rotação automática
    function startAutoSlide() {
        // Definir um intervalo para mudar de slide a cada 5 segundos
        autoSlideInterval = setInterval(goToNextSlide, 5000);
    }
    
    // Evento para o botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrevSlide);
    }
    
    // Evento para o botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextSlide);
    }
    
    // Adicionar eventos aos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            // Reiniciar o temporizador automático quando o usuário navegar manualmente
            resetAutoSlide();
        });
    });
    
    // Iniciar o carrossel com o primeiro slide
    showSlide(0);
    
    // Iniciar a rotação automática dos slides
    startAutoSlide();
} 