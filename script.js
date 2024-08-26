document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('lead-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupForm = document.getElementById('popup-form');

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
                return;
            }

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
