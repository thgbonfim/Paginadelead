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
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('#formulario-lead form');
        const popup = document.getElementById('lead-popup');
        const closePopup = document.querySelector('.close-popup');
        const popupForm = document.getElementById('popup-form');
    
        // Validação e envio do formulário principal
        if (form) {
            form.addEventListener('submit', async (event) => {
                event.preventDefault(); // Evita o envio do formulário por enquanto
    
                const nome = form.querySelector('[name="name"]').value.trim();
                const email = form.querySelector('[name="email"]').value.trim();
                const telefone = form.querySelector('[name="phone"]').value.trim();
                const empresa = form.querySelector('[name="company"]').value.trim();
                const interesse = form.querySelector('[name="interest"]').value;
    
                if (nome === '' || email === '' || telefone === '' || empresa === '' || interesse === '') {
                    alert('Por favor, preencha todos os campos.');
                } else {
                    // Envio dos dados para o HubSpot
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
                        const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47170835/your-form-guid', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(hubspotData)
                        });
    
                        if (response.ok) {
                            alert('Formulário enviado com sucesso!');
                            form.reset(); // Limpa os campos do formulário
                        } else {
                            alert('Ocorreu um erro ao enviar o formulário.');
                        }
                    } catch (error) {
                        console.error('Erro ao enviar dados para o HubSpot:', error);
                        alert('Ocorreu um erro ao enviar o formulário.');
                    }
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
            popupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = popupForm.querySelector('[name="email"]').value.trim();
                if (email === '') {
                    alert('Por favor, insira um e-mail.');
                } else {
                    // Envio dos dados para o HubSpot
                    const hubspotData = {
                        fields: [
                            { name: 'email', value: email }
                        ],
                        context: {
                            pageUri: window.location.href,
                            pageName: document.title
                        }
                    };
    
                    try {
                        const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/47170835/your-form-guid', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(hubspotData)
                        });
    
                        if (response.ok) {
                            alert('Obrigado! Em breve entraremos em contato.');
                            popup.style.display = 'none';
                            popupForm.reset();
                        } else {
                            alert('Ocorreu um erro ao enviar o formulário.');
                        }
                    } catch (error) {
                        console.error('Erro ao enviar dados para o HubSpot:', error);
                        alert('Ocorreu um erro ao enviar o formulário.');
                    }
                }
            });
        }
    
        // Carrossel de depoimentos
        const carrosselContainer = document.querySelector('.carrossel-container');
        const depoimentos = document.querySelectorAll('.depoimento');
        
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
    
            // Inicializa o carrossel
            mostrarDepoimento();
            setInterval(proximoDepoimento, 5000); // Muda a cada 5 segundos
    
            // Ajuste da largura do carrossel em redimensionamentos
            window.addEventListener('resize', mostrarDepoimento);
        }
    });
    
    

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

