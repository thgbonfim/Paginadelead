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
                    const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47170835/109d455e-5686-4677-a385-cf30a8f20779', {
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

            const depoimentoAnterior = () => {
                index = (index - 1 + totalDepoimentos) % totalDepoimentos;
                mostrarDepoimento();
            };

            // Inicializa o carrossel
            mostrarDepoimento();
            setInterval(proximoDepoimento, 5000); // Muda a cada 5 segundos

            // Adiciona eventos de clique para os botões
            if (prevBtn) {
                prevBtn.addEventListener('click', depoimentoAnterior);
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', proximoDepoimento);
            }

            // Ajuste da largura do carrossel em redimensionamentos
            window.addEventListener('resize', mostrarDepoimento);
        }
    };

    // Função para mostrar o pop-up
    const mostrarPopup = (popup) => {
        if (popup) {
            // Mostrar o pop-up após um tempo ou com base em algum evento
            setTimeout(() => popup.classList.add('show'), 3000);
        }
    };

    // Função para fechar o pop-up
    const fecharPopup = (popup, closeBtn) => {
        if (popup && closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }
    };

    // Função para enviar o formulário no pop-up
    const enviarFormularioPopup = (popupForm, popup) => {
        if (popupForm) {
            popupForm.addEventListener('submit', async (event) => {
                event.preventDefault(); // Evita o envio padrão

                if (validarFormulario(popupForm)) {
                    const nome = popupForm.querySelector('[name="name"]').value.trim();
                    const email = popupForm.querySelector('[name="email"]').value.trim();
                    const telefone = popupForm.querySelector('[name="phone"]').value.trim();
                    const empresa = popupForm.querySelector('[name="company"]').value.trim();
                    const interesse = popupForm.querySelector('[name="interest"]').value;

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
                        const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47170835/109d455e-5686-4677-a385-cf30a8f20779', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(hubspotData)
                        });

                        if (response.ok) {
                            alert('Formulário enviado com sucesso!');
                            popupForm.reset(); // Limpa os campos do formulário
                            popup.classList.remove('show'); // Fecha o pop-up
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
    if (popup && closePopup) fecharPopup(popup, closePopup);
    if (popupForm) enviarFormularioPopup(popupForm, popup);
    if (carrosselContainer && depoimentos.length > 0) inicializarCarrossel(carrosselContainer, depoimentos, prevBtn, nextBtn);
    if (popup) mostrarPopup(popup);
});
