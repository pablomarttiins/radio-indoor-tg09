document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Subscription page calculation
    const plano6 = document.getElementById('plano6');
    const plano12 = document.getElementById('plano12');
    const matriz = document.getElementById('matriz');
    const filiais = document.getElementById('filiais');
    const num_filiais = document.getElementById('num_filiais');
    const valor_mensal = document.getElementById('valor_mensal');
    const valor_total = document.getElementById('valor_total');

    function calculateTotal() {
        if (!valor_mensal) {
            return;
        }

        let mensal = 200;
        let numFiliais = 0;

        if (filiais.checked) {
            numFiliais = parseInt(num_filiais.value) || 0;
        }

        mensal += numFiliais * 180;

        let total = mensal;
        if (plano12.checked) {
            total = mensal * 12;
        } else {
            total = mensal * 6;
        }

        valor_mensal.textContent = `R$ ${mensal.toFixed(2)}`;
        valor_total.textContent = `R$ ${total.toFixed(2)}`;
    }

    if (plano6) {
        plano6.addEventListener('change', calculateTotal);
        plano12.addEventListener('change', calculateTotal);
        matriz.addEventListener('change', calculateTotal);
        filiais.addEventListener('change', calculateTotal);
        num_filiais.addEventListener('input', calculateTotal);

        calculateTotal();
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            let message = `Olá, gostaria de configurar minha rádio:\n`;
            message += `Nome da empresa: ${data['empresa']}\n`;
            message += `Filiais: ${data['filiais'] === 'sim' ? data['num_filiais'] : 'Não'}\n`;
            message += `Responsável: ${data['responsavel']}\n`;
            message += `Cidade e estado: ${data['cidade']}\n`;
            message += `Nome desejado para a rádio: ${data['nome_radio']}\n`;
            message += `Segmento da loja: ${data['segmento']}\n`;
            message += `Horário de funcionamento: ${data['horario']}\n`;
            message += `Promoção no teste: ${data['promocao']}\n`;
            message += `Já tem som ambiente: ${data['som']}\n`;
            message += `Como nos conheceu: ${data['conheceu']}`;

            // const whatsappUrl = `https://api.whatsapp.com/send?phone=554233018124&text=${encodeURIComponent(message)}`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=5516991776891&text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // Scroll animations
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Subscription form submission
    const subscribeForm = document.getElementById('subscribeForm');
    const formMessages = document.getElementById('form-messages');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(subscribeForm);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(text => {
                formMessages.textContent = text;
                if (text.includes('Obrigado')) {
                    subscribeForm.reset();
                }
            })
            .catch(err => {
                formMessages.textContent = 'Oops! Ocorreu um erro.';
            });
        });
    }
});