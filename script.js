const year = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

year.textContent = new Date().getFullYear();

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Thanks! Your message is ready to send.';
    contactForm.reset();
});