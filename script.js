document.addEventListener('DOMContentLoaded', function() {
    // Menu de Navegação Responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('nav ul');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('show-menu'); // Abre e fecha o menu
        });
    }

    // Carrossel Depoimentos
    const carrosselContainer = document.querySelector('.carrossel-container');
    const depoimentos = document.querySelectorAll('.depoimento');
    let currentIndex = 0;
    
    function mostrarDepoimento(index) {
        if (carrosselContainer && depoimentos.length > 0) {
            // Calcula a nova posição para o carrossel
            const offset = index * depoimentos[0].clientWidth;
            carrosselContainer.style.transform = `translateX(-${offset}px)`;
        }
    }

    // Eventos para o carrossel: navegação pelos depoimentos
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : depoimentos.length - 1;
            mostrarDepoimento(currentIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex < depoimentos.length - 1) ? currentIndex + 1 : 0;
            mostrarDepoimento(currentIndex);
        });
    }

    // Suporte ao toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    if (carrosselContainer) {
        carrosselContainer.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        });

        carrosselContainer.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipeGesture();
        });

        function handleSwipeGesture() {
            if (touchEndX < touchStartX) {
                // Swipe para a esquerda
                currentIndex = (currentIndex < depoimentos.length - 1) ? currentIndex + 1 : 0;
            }
            if (touchEndX > touchStartX) {
                // Swipe para a direita
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : depoimentos.length - 1;
            }
            mostrarDepoimento(currentIndex);
        }
    }
});
