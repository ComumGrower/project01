// Scroll suave para âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Validação simples e envio simulado
const form = document.getElementById('leadForm');
const statusEl = document.getElementById('formStatus');

function setError(input, msg){
  const field = input.closest('.field');
  field.querySelector('.error').textContent = msg || '';
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form__status';

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const tel = form.telefone.value.trim();

  // Reset erros
  setError(form.nome, '');
  setError(form.email, '');
  setError(form.telefone, '');

  let ok = true;
  if (!nome) { setError(form.nome, 'Por favor, informe seu nome.'); ok = false; }
  if (!email || !validateEmail(email)) { setError(form.email, 'Informe um e-mail válido.'); ok = false; }

  if (!ok) return;

  // Simula envio (substitua por fetch para sua API)
  try {
    // Exemplo de integração futura:
    // await fetch('https://sua-api.com/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nome, email, telefone: tel, origem: 'landing' })
    // });

    await new Promise(res => setTimeout(res, 900)); // simula rede

    statusEl.textContent = 'Obrigado! Recebemos seus dados e entraremos em contato.';
    statusEl.classList.add('form__status--ok');
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Ops! Não foi possível enviar agora. Tente novamente em instantes.';
    statusEl.classList.add('form__status--err');
  }
});
``