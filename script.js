document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#formulario-lead form');
    const popup = document.getElementById('lead-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popup-form');

    // Validação e envio do formulário principal
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio do formulário por enquanto

        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="telefone"]').value.trim();
        const empresa = form.querySelector('[name="empresa"]').value.trim();
        const interesse = form.querySelector('[name="interesse"]').value;

        if (nome === '' || email === '' || telefone === '' || empresa === '' || interesse === '') {
            alert('Por favor, preencha todos os campos.');
        } else {
            alert('Formulário enviado com sucesso!');
            form.reset(); // Limpa os campos do formulário
        }
    });

    // Mostrar o pop-up após alguns segundos
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 5000); // 5 segundos

    // Fechar o pop-up
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Adicionar funcionalidade ao formulário do pop-up
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
});
