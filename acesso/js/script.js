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
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    if (!testimonialCards.length) return;
    
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
    }
    
    // Evento para o botão anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        });
    }
    
    // Evento para o botão próximo
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        });
    }
    
    // Adicionar eventos aos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Iniciar o carrossel com o primeiro slide
    showSlide(0);
    
    // Rotação automática dos slides a cada 5 segundos
    setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }, 5000);
} 