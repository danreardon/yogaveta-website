// Staging stub: the newsletter form stores nothing until the phase 2 Worker exists.
document.getElementById('notes-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('thanks').hidden = false;
});
