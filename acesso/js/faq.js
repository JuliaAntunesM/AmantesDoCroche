// Script para gerenciar a seção de FAQ (accordion)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Inicialmente, todas as respostas estão fechadas
        answer.style.display = 'none';
        
        question.addEventListener('click', function() {
            // Verifica se esta pergunta já está aberta
            const isOpen = answer.style.display === 'block';
            
            // Fecha todas as outras respostas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-question i').className = 'fas fa-chevron-down';
                }
            });
            
            // Alterna o estado da resposta atual
            answer.style.display = isOpen ? 'none' : 'block';
            icon.className = isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });
    });
}); 