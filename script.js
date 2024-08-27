document.addEventListener('DOMContentLoaded', () => {
    // Função para validar o formulário principal
    const validarFormulario = (form) => {
        const campos = ['name', 'email', 'phone', 'company', 'interest'];
        const todosPreenchidos = campos.every(campo => {
            return form.querySelector(`[name="${campo}"]`).value.trim() !== '';
        });

        if (!todosPreenchidos) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }
        return true;
    };

    // Função para lidar com o envio do formulário principal
    const enviarFormulario = (form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita o envio padrão

            if (validarFormulario(form)) {
                alert('Formulário enviado com sucesso!');
                form.reset(); // Limpa os campos do formulário
            }
        });
    };

    // Função para mostrar o pop-up
    const mostrarPopup = (popup) => {
        if (popup) {
            setTimeout(() => {
                popup.style.display = 'flex';
            }, 5000); // 5 segundos
        }
    };

    // Função para fechar o pop-up
    const fecharPopup = (popup, closePopup) => {
        if (popup && closePopup) {
            closePopup.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }
    };

    // Função para lidar com o envio do formulário do pop-up
    const enviarFormularioPopup = async (popupForm, popup) => {
        if (popupForm) {
            popupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = popupForm.querySelector('[name="email"]').value.trim();
    
                if (email === '') {
                    alert('Por favor, insira um e-mail.');
                    return;
                }
    
                const hubspotData = {
                    fields: [{ name: 'email', value: email }],
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
                        alert('Obrigado! Em breve entraremos em contato.');
                        popupForm.reset();
                        popup.style.display = 'none';
                    } else {
                        const errorData = await response.text(); // Mudamos para text() para lidar com respostas não JSON
                        console.error('Erro ao enviar dados para o HubSpot:', response.status, response.statusText, errorData);
                        alert('Ocorreu um erro ao enviar o formulário. Verifique os detalhes no console.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar dados para o HubSpot:', error);
                    alert('Ocorreu um erro ao enviar o formulário. Verifique os detalhes no console.');
                }
            });
        }
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
            setInterval(proximoDepoimento, 8000); // Muda a cada 8 segundos

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

