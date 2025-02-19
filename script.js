document.addEventListener('DOMContentLoaded', function() {
    console.log('El documento está listo.');

    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            responseMessage.textContent = message;
            contactForm.reset();
        })
        .catch(error => {
            responseMessage.textContent = 'Error al enviar el mensaje.';
        });
    });
});