document.addEventListener('DOMContentLoaded', () => {
    // Função para validar os campos do formulário
    const validarFormulario = (form) => {
        const campos = ['name', 'email', 'phone', 'company', 'interest'];
        return campos.every(campo => form.querySelector(`[name="${campo}"]`).value.trim() !== '');
    };

    // Função para lidar com o envio do formulário principal
    const enviarFormulario = async (form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o envio padrão

            if (validarFormulario(form)) {
                const nome = form.querySelector('[name="name"]').value.trim();
                const email = form.querySelector('[name="email"]').value.trim();
                const telefone = form.querySelector('[name="phone"]').value.trim();
                const empresa = form.querySelector('[name="company"]').value.trim();
                const interesse = form.querySelector('[name="interest"]').value;

                const hubspotData = {
                    fields: [
                        { name: 'firstname', value: nome },
                        { name: 'email', value: email },
                        { name: 'phone', value: telefone },
                        { name: 'company', value: empresa },
                        { name: 'interesse', value: interesse }
                    ],
                    context: {
                        pageUri: window.location.href,
                        pageName: document.title
                    }
                };

                try {
                    const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47170835/YOUR_FORM_ID', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(hubspotData)
                    });

                    if (response.ok) {
                        alert('Formulário enviado com sucesso!');
                        form.reset(); // Limpa os campos do formulário
                    } else {
                        const errorData = await response.text();
                        console.error('Erro ao enviar dados para o HubSpot:', response.status, response.statusText, errorData);
                        alert('Ocorreu um erro ao enviar o formulário.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar dados para o HubSpot:', error);
                    alert('Ocorreu um erro ao enviar o formulário.');
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    };

    // Função para inicializar o carrossel de depoimentos
    const inicializarCarrossel = (carrosselContainer, depoimentos, prevBtn, nextBtn) => {
        if (carrosselContainer && depoimentos.length > 0) {
            let index = 0;
            const totalDepoimentos = depoimentos.length;

            const mostrarDepoimento = () => {
                const largura = depoimentos[0].clientWidth;
                carrosselContainer.style.transform = `translateX(-${largura * index}px)`;
            };

            const proximoDepoimento = () => {
                index = (index + 1) % totalDepoimentos;
                mostrarDepoimento();
            };

            const prevDepoimento = () => {
                index = (index - 1 + totalDepoimentos) % totalDepoimentos;
                mostrarDepoimento();
            };

            if (prevBtn) {
                prevBtn.addEventListener('click', prevDepoimento);
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', proximoDepoimento);
            }

            // Inicializa o carrossel
            mostrarDepoimento();
            setInterval(proximoDepoimento, 5000); // Muda a cada 5 segundos

            // Ajuste da largura do carrossel em redimensionamentos
            window.addEventListener('resize', mostrarDepoimento);
        }
    };

    // Seleciona os elementos
    const form = document.querySelector('#formulario-lead form');
    const popup = document.getElementById('lead-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popup-form');
    const carrosselContainer = document.querySelector('.carrossel-container');
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Executa as funções
    if (form) enviarFormulario(form);
    mostrarPopup(popup);
    fecharPopup(popup, closePopup);
    enviarFormularioPopup(popupForm, popup);
    inicializarCarrossel(carrosselContainer, depoimentos, prevBtn, nextBtn);
});
