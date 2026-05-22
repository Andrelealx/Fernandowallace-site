// form.js — envio via WhatsApp

const WA_NUMBER = '5521964373273';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !message) {
      form.querySelectorAll('[required]').forEach(f => {
        f.classList.toggle('error', !f.value.trim());
      });
      return;
    }

    const text = `Olá, Fernando! Meu nome é ${name}.\n\n${message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

    showStatus('Abrindo WhatsApp...', 'success');
    form.reset();
    form.querySelectorAll('.error').forEach(f => f.classList.remove('error'));
  });

  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
});

function showStatus(msg, type) {
  const status = document.getElementById('form-status');
  if (!status) return;
  status.textContent = msg;
  status.className = 'form-status form-status--' + type;
}
