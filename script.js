document.addEventListener('DOMContentLoaded', () => {
    const showPopup = () => {
        const popup = document.getElementById('lead-popup');
        if (popup) {
            setTimeout(() => {
                popup.style.display = 'flex';
            }, 5000); // Exibe após 5 segundos
        }
    };

    const closePopup = () => {
        const popup = document.getElementById('lead-popup');
        const closePopupButton = document.querySelector('.close-popup');
        if (popup && closePopupButton) {
            closePopupButton.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }
    };

    const handlePopupForm = () => {
        const popupForm = document.getElementById('popup-form');
        if (popupForm) {
            popupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const email = popupForm.querySelector('[name="email"]').value.trim();
                if (!email) {
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
                        document.getElementById('lead-popup').style.display = 'none';
                    } else {
                        const errorData = await response.json();
                        console.error('Erro ao enviar dados para o HubSpot:', errorData);
                        alert('Ocorreu um erro ao enviar o formulário. Verifique os detalhes no console.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar dados para o HubSpot:', error);
                    alert('Ocorreu um erro ao enviar o formulário. Verifique os detalhes no console.');
                }
            });
        }
    };

    const initCarrossel = () => {
        const carrosselContainer = document.querySelector('.carrossel-container');
        const depoimentos = document.querySelectorAll('.depoimento');

        if (carrosselContainer && depoimentos.length > 0) {
            let index = 0;
            const totalDepoimentos = depoimentos.length;
            const tempoTroca = 7000; // Tempo de troca em milissegundos

            const mostrarDepoimento = () => {
                const largura = depoimentos[0].clientWidth;
                carrosselContainer.style.transform = `translateX(-${largura * index}px)`;
            };

            const proximoDepoimento = () => {
                index = (index + 1) % totalDepoimentos;
                mostrarDepoimento();
            };

            mostrarDepoimento();
            setInterval(proximoDepoimento, tempoTroca); // Muda a cada 7 segundos

            window.addEventListener('resize', mostrarDepoimento);
        }
    };

    showPopup();
    closePopup();
    handlePopupForm();
    initCarrossel();
});
