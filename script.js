document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#formulario-lead form');
    const popup = document.getElementById('lead-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popup-form');

    // Validação e envio do formulário principal
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita o envio do formulário por enquanto

            const nome = form.querySelector('[name="name"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();
            const telefone = form.querySelector('[name="phone"]').value.trim();
            const empresa = form.querySelector('[name="company"]').value.trim();
            const interesse = form.querySelector('[name="interest"]').value;

            if (nome === '' || email === '' || telefone === '' || empresa === '' || interesse === '') {
                alert('Por favor, preencha todos os campos.');
            } else {
                alert('Formulário enviado com sucesso!');
                form.reset(); // Limpa os campos do formulário
            }
        });
    }

    // Mostrar o pop-up após alguns segundos
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 5000); // 5 segundos
    }

    // Fechar o pop-up
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Adicionar funcionalidade ao formulário do pop-up
    if (popupForm) {
        popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = popupForm.querySelector('[name="email"]').value.trim();
            if (email === '') {
                alert('Por favor, insira um e-mail.');
            } else {
                alert('Obrigado! Em breve entraremos em contato.');
                popup.style.display = 'none';
                popupForm.reset();
            }
        });
    }

    // Carrossel de Depoimentos
    const carrosselContainer = document.querySelector('.carrossel-container');
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carrosselContainer && depoimentos.length > 0) {
        let index = 0;
        const totalDepoimentos = depoimentos.length;
    
        function mostrarDepoimento() {
            const largura = depoimentos[0].clientWidth;
            carrosselContainer.style.transform = `translateX(-${largura * index}px)`;
        }
    
        function proximoDepoimento() {
            index = (index + 1) % totalDepoimentos;
            mostrarDepoimento();
        }
    
        function prevDepoimento() {
            index = (index - 1 + totalDepoimentos) % totalDepoimentos;
            mostrarDepoimento();
        }
    
        if (prevBtn) {
            prevBtn.addEventListener('click', prevDepoimento);
        }
    
        if (nextBtn) {
            nextBtn.addEventListener('click', proximoDepoimento);
        }
    
        // Inicializa o carrossel
        mostrarDepoimento();
        setInterval(proximoDepoimento, 8000); // Muda a cada 8 segundos
    
        // Ajuste da largura do carrossel em redimensionamentos
        window.addEventListener('resize', mostrarDepoimento);
    }
});
